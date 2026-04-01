import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

interface Profile {
  id: string
  display_name: string
  avatar_emoji: string
  created_at: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, displayName: string) => Promise<{ error: string | null }>
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  async function fetchProfile(userId: string) {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      if (data) {
        setProfile(data)
      } else {
        // Profile doesn't exist yet - create it (first login after email confirmation)
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const displayName = user.user_metadata?.display_name || 'Familie'
          const { data: newProfile } = await supabase.from('profiles').upsert({
            id: userId,
            display_name: displayName,
            avatar_emoji: '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67',
          }).select().single()
          if (newProfile) setProfile(newProfile)
        }
      }
    } catch (e) {
      // Profile might not exist yet - try to create it
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const displayName = user.user_metadata?.display_name || 'Familie'
          const { data: newProfile } = await supabase.from('profiles').upsert({
            id: userId,
            display_name: displayName,
            avatar_emoji: '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67',
          }).select().single()
          if (newProfile) setProfile(newProfile)
        }
      } catch (e2) {
        console.warn('Failed to create profile:', e2)
      }
    }
  }

  useEffect(() => {
    let mounted = true

    // Safety timeout: never stay loading for more than 5 seconds
    const timeout = setTimeout(() => {
      if (mounted) setLoading(false)
    }, 5000)

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      }
      setLoading(false)
      clearTimeout(timeout)
    }).catch(() => {
      if (mounted) setLoading(false)
      clearTimeout(timeout)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => {
      mounted = false
      clearTimeout(timeout)
      subscription.unsubscribe()
    }
  }, [])

  const signUp = async (email: string, password: string, displayName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'https://stevenjobins.github.io/tuki-app/',
        data: { display_name: displayName }
      }
    })
    if (error) return { error: error.message }
    return { error: null }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      if (error.message.includes('Email not confirmed')) {
        return { error: 'EMAIL_NOT_CONFIRMED' }
      }
      return { error: error.message }
    }
    return { error: null }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setProfile(null)
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
    if (!error && profile) {
      setProfile({ ...profile, ...updates })
    }
  }

  return (
    <AuthContext.Provider value={{ user, profile, session, loading, signUp, signIn, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
