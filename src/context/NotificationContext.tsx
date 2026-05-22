import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

// ─── Types ───────────────────────────────────────────────
export type NotificationType = 'comment' | 'like' | 'tip' | 'milestone' | 'welcome' | 'system'

export interface AppNotification {
  id: string
  type: NotificationType
  icon: string
  message: string
  read: boolean
  createdAt: string // ISO timestamp
  // Future Supabase fields (ready but not yet used):
  // userId?: string
  // relatedItemId?: string
  // relatedItemType?: 'recipe' | 'activity' | 'comment' | 'post'
}

interface NotificationContextType {
  notifications: AppNotification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  addNotification: (notification: Omit<AppNotification, 'id' | 'createdAt'>) => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

// ─── Default Notifications (Seed data for new users) ─────
const createSeedNotifications = (): AppNotification[] => [
  {
    id: 'seed-welcome',
    type: 'welcome',
    icon: '👋',
    message: 'Willkommen bei Tuki Family! Entdecke Rezepte und Aktivitäten.',
    read: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'seed-tip',
    type: 'tip',
    icon: '💡',
    message: 'Tuki-Tipp: Lass dein Kind heute die Zutaten aussuchen!',
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'seed-milestone',
    type: 'milestone',
    icon: '🌟',
    message: 'Starte dein erstes Rezept und verdiene Tuki-Sterne!',
    read: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
]

// ─── Storage ─────────────────────────────────────────────
const STORAGE_KEY = 'tuki-notifications'

function loadNotifications(): AppNotification[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.warn('Failed to load notifications from localStorage', e)
  }
  return createSeedNotifications()
}

function saveNotifications(notifications: AppNotification[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
  } catch (e) {
    console.warn('Failed to save notifications to localStorage', e)
  }
}

// ─── Context ─────────────────────────────────────────────
const NotificationContext = createContext<NotificationContextType | null>(null)

export function useNotifications() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider')
  return ctx
}

// ─── Provider ────────────────────────────────────────────
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>(loadNotifications)

  // Persist to localStorage on change
  useEffect(() => {
    saveNotifications(notifications)
  }, [notifications])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
    // TODO: Supabase — update notification read status
    // await supabase.from('notifications').update({ read: true }).eq('id', id)
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    // TODO: Supabase — bulk update
    // await supabase.from('notifications').update({ read: true }).eq('user_id', userId)
  }, [])

  const addNotification = useCallback((notif: Omit<AppNotification, 'id' | 'createdAt'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
    }
    setNotifications(prev => [newNotif, ...prev])
    // TODO: Supabase — insert notification
    // await supabase.from('notifications').insert(newNotif)
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
    // TODO: Supabase — delete notification
    // await supabase.from('notifications').delete().eq('id', id)
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
    // TODO: Supabase — delete all for user
    // await supabase.from('notifications').delete().eq('user_id', userId)
  }, [])

  // TODO: Supabase Realtime subscription
  // useEffect(() => {
  //   const channel = supabase
  //     .channel('notifications')
  //     .on('postgres_changes', {
  //       event: 'INSERT',
  //       schema: 'public',
  //       table: 'notifications',
  //       filter: `user_id=eq.${userId}`,
  //     }, (payload) => {
  //       setNotifications(prev => [payload.new as AppNotification, ...prev])
  //     })
  //     .subscribe()
  //
  //   return () => { supabase.removeChannel(channel) }
  // }, [userId])

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      addNotification,
      removeNotification,
      clearAll,
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

// ─── Supabase Schema Reference ───────────────────────────
// When connecting to Supabase, create this table:
//
// CREATE TABLE public.notifications (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
//   type TEXT NOT NULL CHECK (type IN ('comment','like','tip','milestone','welcome','system')),
//   icon TEXT NOT NULL DEFAULT '💬',
//   message TEXT NOT NULL,
//   read BOOLEAN NOT NULL DEFAULT false,
//   related_item_id TEXT,
//   related_item_type TEXT CHECK (related_item_type IN ('recipe','activity','comment','post')),
//   created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
//   updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
// );
//
// -- RLS Policies
// ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
//
// CREATE POLICY "Users can read own notifications"
//   ON public.notifications FOR SELECT
//   USING (auth.uid() = user_id);
//
// CREATE POLICY "Users can update own notifications"
//   ON public.notifications FOR UPDATE
//   USING (auth.uid() = user_id);
//
// CREATE POLICY "Users can delete own notifications"
//   ON public.notifications FOR DELETE
//   USING (auth.uid() = user_id);
//
// -- Only server/service role can insert notifications
// CREATE POLICY "Service can insert notifications"
//   ON public.notifications FOR INSERT
//   WITH CHECK (true);
//
// -- Realtime
// ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
