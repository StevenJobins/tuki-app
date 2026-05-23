import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { supabase } from '../lib/supabaseClient'

// âââ Types âââââââââââââââââââââââââââââââââââââââââââââââ
export type NotificationType = 'comment' | 'like' | 'tip' | 'milestone' | 'welcome' | 'system'

export interface AppNotification {
  id: string
  type: NotificationType
  icon: string
  message: string
  read: boolean
  createdAt: string // ISO timestamp
  userId?: string
  relatedItemId?: string
  relatedItemType?: 'recipe' | 'activity' | 'comment' | 'post'
}

interface NotificationContextType {
  notifications: AppNotification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  addNotification: (notification: Omit<AppNotification, 'id' | 'createdAt'>) => void
  removeNotification: (id: string) => void
  clearAll: () => void
  isSupabaseConnected: boolean
}

// âââ Default Notifications (Seed data for new users) âââââ
const createSeedNotifications = (): AppNotification[] => [
  {
    id: 'seed-welcome',
    type: 'welcome',
    icon: '\u{1F44B}',
    message: 'Willkommen bei Tuki Family! Entdecke Rezepte und AktivitÃ¤ten.',
    read: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'seed-tip',
    type: 'tip',
    icon: '\u{1F4A1}',
    message: 'Tuki-Tipp: Lass dein Kind heute die Zutaten aussuchen!',
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'seed-milestone',
    type: 'milestone',
    icon: '\u{1F31F}',
    message: 'Starte dein erstes Rezept und verdiene Tuki-Sterne!',
    read: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
]

// âââ LocalStorage Fallback ââââââââââââââââââââââââââââââ
const STORAGE_KEY = 'tuki-notifications'

function loadFromLocalStorage(): AppNotification[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) {
    console.warn('Failed to load notifications from localStorage', e)
  }
  return createSeedNotifications()
}

function saveToLocalStorage(notifications: AppNotification[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
  } catch (e) {
    console.warn('Failed to save notifications to localStorage', e)
  }
}

// âââ Supabase Helpers âââââââââââââââââââââââââââââââââââ
function mapFromSupabase(row: Record<string, unknown>): AppNotification {
  return {
    id: row.id as string,
    type: row.type as NotificationType,
    icon: row.icon as string,
    message: row.message as string,
    read: row.read as boolean,
    createdAt: row.created_at as string,
    userId: row.user_id as string,
    relatedItemId: row.related_item_id as string | undefined,
    relatedItemType: row.related_item_type as AppNotification['relatedItemType'],
  }
}

// âââ Context âââââââââââââââââââââââââââââââââââââââââââââ
const NotificationContext = createContext<NotificationContextType | null>(null)

export function useNotifications() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider')
  return ctx
}

// âââ Provider ââââââââââââââââââââââââââââââââââââââââââââ
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false)
  const [initialized, setInitialized] = useState(false)

  // âââ Auth: detect logged-in user âââââââââââââââââââââ
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserId(data.user.id)
        setIsSupabaseConnected(true)
      } else {
        // No auth: use localStorage fallback
        setNotifications(loadFromLocalStorage())
        setInitialized(true)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserId(session.user.id)
        setIsSupabaseConnected(true)
      } else {
        setUserId(null)
        setIsSupabaseConnected(false)
        setNotifications(loadFromLocalStorage())
        setInitialized(true)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // âââ Load from Supabase when userId is available âââââ
  useEffect(() => {
    if (!userId) return

    async function fetchNotifications() {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) {
        console.warn('Supabase fetch failed, falling back to localStorage:', error.message)
        setNotifications(loadFromLocalStorage())
        setIsSupabaseConnected(false)
      } else if (data.length === 0) {
        // New user: seed notifications in Supabase
        const seeds = createSeedNotifications()
        const seedRows = seeds.map(s => ({
          user_id: userId,
          type: s.type,
          icon: s.icon,
          message: s.message,
          read: false,
        }))
        const { data: inserted, error: insertError } = await supabase
          .from('notifications')
          .insert(seedRows)
          .select()

        if (insertError) {
          console.warn('Failed to seed notifications:', insertError.message)
          setNotifications(seeds)
        } else {
          setNotifications((inserted || []).map(mapFromSupabase))
        }
      } else {
        setNotifications(data.map(mapFromSupabase))
      }
      setInitialized(true)
    }

    fetchNotifications()
  }, [userId])

  // âââ Realtime subscription âââââââââââââââââââââââââââ
  useEffect(() => {
    if (!userId || !isSupabaseConnected) return

    const channel = supabase
      .channel(`notifications-${userId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      }, (payload) => {
        const newNotif = mapFromSupabase(payload.new as Record<string, unknown>)
        setNotifications(prev => {
          // Avoid duplicates
          if (prev.some(n => n.id === newNotif.id)) return prev
          return [newNotif, ...prev]
        })
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      }, (payload) => {
        const updated = mapFromSupabase(payload.new as Record<string, unknown>)
        setNotifications(prev =>
          prev.map(n => n.id === updated.id ? updated : n)
        )
      })
      .on('postgres_changes', {
        event: 'DELETE',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      }, (payload) => {
        const deletedId = (payload.old as Record<string, unknown>).id as string
        setNotifications(prev => prev.filter(n => n.id !== deletedId))
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, isSupabaseConnected])

  // âââ Persist to localStorage when NOT connected ââââââ
  useEffect(() => {
    if (!isSupabaseConnected && initialized) {
      saveToLocalStorage(notifications)
    }
  }, [notifications, isSupabaseConnected, initialized])

  // âââ Computed ââââââââââââââââââââââââââââââââââââââââ
  const unreadCount = notifications.filter(n => !n.read).length

  // âââ Actions âââââââââââââââââââââââââââââââââââââââââ
  const markAsRead = useCallback(async (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )

    if (isSupabaseConnected) {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id)

      if (error) console.warn('Failed to mark as read in Supabase:', error.message)
    }
  }, [isSupabaseConnected])

  const markAllAsRead = useCallback(async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))

    if (isSupabaseConnected && userId) {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', userId)
        .eq('read', false)

      if (error) console.warn('Failed to mark all as read in Supabase:', error.message)
    }
  }, [isSupabaseConnected, userId])

  const addNotification = useCallback(async (notif: Omit<AppNotification, 'id' | 'createdAt'>) => {
    if (isSupabaseConnected && userId) {
      // Insert into Supabase (realtime will update local state)
      const { data, error } = await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          type: notif.type,
          icon: notif.icon,
          message: notif.message,
          read: notif.read,
          related_item_id: notif.relatedItemId || null,
          related_item_type: notif.relatedItemType || null,
        })
        .select()
        .single()

      if (error) {
        console.warn('Failed to insert notification in Supabase:', error.message)
        // Fallback: add locally
        const localNotif: AppNotification = {
          ...notif,
          id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          createdAt: new Date().toISOString(),
        }
        setNotifications(prev => [localNotif, ...prev])
      } else if (data) {
        // Realtime might not have fired yet, add optimistically
        const mapped = mapFromSupabase(data as Record<string, unknown>)
        setNotifications(prev => {
          if (prev.some(n => n.id === mapped.id)) return prev
          return [mapped, ...prev]
        })
      }
    } else {
      // localStorage mode
      const newNotif: AppNotification = {
        ...notif,
        id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        createdAt: new Date().toISOString(),
      }
      setNotifications(prev => [newNotif, ...prev])
    }
  }, [isSupabaseConnected, userId])

  const removeNotification = useCallback(async (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))

    if (isSupabaseConnected) {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id)

      if (error) console.warn('Failed to delete notification in Supabase:', error.message)
    }
  }, [isSupabaseConnected])

  const clearAll = useCallback(async () => {
    setNotifications([])

    if (isSupabaseConnected && userId) {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('user_id', userId)

      if (error) console.warn('Failed to clear notifications in Supabase:', error.message)
    }
  }, [isSupabaseConnected, userId])

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      addNotification,
      removeNotification,
      clearAll,
      isSupabaseConnected,
    }}>
      {children}
    </NotificationContext.Provider>
  )
}
