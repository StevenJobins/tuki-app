import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

interface ChildProfile {
  id: string
  name: string
  birthDate: string
  avatarEmoji: string
}

interface TukiStars {
  total: number
  level: number
  levelName: string
}

interface AppState {
  favorites: string[]
  completedActivities: string[]
  completedRecipes: string[]
  weekPlan: Record<string, string[]>
  children: ChildProfile[]
  tukiStars: TukiStars
  language: 'de' | 'en' | 'fr'
  isOnboarded: boolean
  error: string | null
  dataLoading: boolean
}

interface AppContextType extends AppState {
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  completeActivity: (id: string) => void
  completeRecipe: (id: string) => void
  addToWeekPlan: (day: string, id: string) => void
  removeFromWeekPlan: (day: string, id: string) => void
  addChild: (child: ChildProfile) => void
  removeChild: (id: string) => void
  setOnboarded: () => void
  clearError: () => void
}

const LEVELS = [
  { min: 0, name: 'Kleiner Entdecker' },
  { min: 10, name: 'Kuechenhelfer' },
  { min: 25, name: 'Nachwuchskoch' },
  { min: 50, name: 'Familien-Star' },
  { min: 100, name: 'Kuechenchef' },
]

function calculateStars(completed: number): TukiStars {
  let level = 0
  let levelName = LEVELS[0].name
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (completed >= LEVELS[i].min) {
      level = i
      levelName = LEVELS[i].name
      break
    }
  }
  return { total: completed, level, levelName }
}

const defaultState: AppState = {
  favorites: [],
  completedActivities: [],
  completedRecipes: [],
  weekPlan: {},
  children: [],
  tukiStars: { total: 0, level: 0, levelName: 'Kleiner Entdecker' },
  language: 'de',
  isOnboarded: false,
  error: null,
  dataLoading: true,
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children: childNodes }: { children: ReactNode }) {
  const { user } = useAuth()
  const [state, setState] = useState<AppState>(defaultState)

  const loadFromSupabase = useCallback(async (userId: string) => {
    try {
      const [completedRes, favRes, childrenRes] = await Promise.all([
        supabase.from('completed_items').select('item_id, item_type').eq('profile_id', userId),
        supabase.from('favorites').select('item_id').eq('profile_id', userId),
        supabase.from('children').select('*').eq('profile_id', userId),
      ])

      if (completedRes.error) throw completedRes.error
      if (favRes.error) throw favRes.error
      if (childrenRes.error) throw childrenRes.error

      const completedActivities = (completedRes.data || [])
        .filter(i => i.item_type === 'activity').map(i => i.item_id)
      const completedRecipes = (completedRes.data || [])
        .filter(i => i.item_type === 'recipe').map(i => i.item_id)
      const favorites = (favRes.data || []).map(f => f.item_id)
      const children: ChildProfile[] = (childrenRes.data || []).map(c => ({
        id: c.id, name: c.name, birthDate: c.birth_date || '', avatarEmoji: c.avatar_emoji || '\uD83D\uDC76',
      }))

      const total = completedActivities.length + completedRecipes.length

      setState(s => ({
        ...s, completedActivities, completedRecipes, favorites, children,
        tukiStars: calculateStars(total), isOnboarded: true, dataLoading: false, error: null,
      }))
    } catch (err) {
      console.warn('Failed to load data from Supabase:', err)
      setState(s => ({ ...s, dataLoading: false, error: 'Daten konnten nicht geladen werden.' }))
    }
  }, [])

  useEffect(() => {
    if (user) {
      setState(s => ({ ...s, dataLoading: true }))
      loadFromSupabase(user.id)
    } else {
      setState({ ...defaultState, dataLoading: false })
    }
  }, [user, loadFromSupabase])

  // Load week plan from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('tuki_weekplan')
      if (stored) setState(s => ({ ...s, weekPlan: JSON.parse(stored) }))
    } catch { /* ignore */ }
  }, [])

  const toggleFavorite = async (id: string) => {
    const isFav = state.favorites.includes(id)
    setState(s => ({
      ...s, favorites: isFav ? s.favorites.filter(f => f !== id) : [...s.favorites, id],
    }))
    if (user) {
      try {
        if (isFav) {
          await supabase.from('favorites').delete().eq('profile_id', user.id).eq('item_id', id)
        } else {
          await supabase.from('favorites').insert({ profile_id: user.id, item_id: id })
        }
      } catch (err) {
        console.warn('Favorite sync failed:', err)
        setState(s => ({
          ...s, favorites: isFav ? [...s.favorites, id] : s.favorites.filter(f => f !== id),
        }))
      }
    }
  }

  const isFavorite = (id: string) => state.favorites.includes(id)

  const completeActivity = async (id: string) => {
    if (state.completedActivities.includes(id)) return
    setState(s => {
      const completed = [...s.completedActivities, id]
      const total = completed.length + s.completedRecipes.length
      return { ...s, completedActivities: completed, tukiStars: calculateStars(total) }
    })
    if (user) {
      try {
        await supabase.from('completed_items').insert({
          profile_id: user.id, item_id: id, item_type: 'activity',
        })
      } catch (err) {
        console.warn('Complete activity sync failed:', err)
      }
    }
  }

  const completeRecipe = async (id: string) => {
    if (state.completedRecipes.includes(id)) return
    setState(s => {
      const completed = [...s.completedRecipes, id]
      const total = s.completedActivities.length + completed.length
      return { ...s, completedRecipes: completed, tukiStars: calculateStars(total) }
    })
    if (user) {
      try {
        await supabase.from('completed_items').insert({
          profile_id: user.id, item_id: id, item_type: 'recipe',
        })
      } catch (err) {
        console.warn('Complete recipe sync failed:', err)
      }
    }
  }

  const addToWeekPlan = (day: string, id: string) => {
    setState(s => {
      const newPlan = { ...s.weekPlan, [day]: [...(s.weekPlan[day] || []), id] }
      try { localStorage.setItem('tuki_weekplan', JSON.stringify(newPlan)) } catch { /* */ }
      return { ...s, weekPlan: newPlan }
    })
  }

  const removeFromWeekPlan = (day: string, id: string) => {
    setState(s => {
      const newPlan = { ...s.weekPlan, [day]: (s.weekPlan[day] || []).filter(i => i !== id) }
      try { localStorage.setItem('tuki_weekplan', JSON.stringify(newPlan)) } catch { /* */ }
      return { ...s, weekPlan: newPlan }
    })
  }

  const addChild = async (child: ChildProfile) => {
    setState(s => ({ ...s, children: [...s.children, child] }))
    if (user) {
      try {
        await supabase.from('children').insert({
          id: child.id, profile_id: user.id, name: child.name,
          birth_date: child.birthDate, avatar_emoji: child.avatarEmoji,
        })
      } catch (err) {
        console.warn('Add child failed:', err)
        setState(s => ({ ...s, children: s.children.filter(c => c.id !== child.id), error: 'Kind konnte nicht hinzugefuegt werden.' }))
      }
    }
  }

  const removeChild = async (id: string) => {
    const removed = state.children.find(c => c.id === id)
    setState(s => ({ ...s, children: s.children.filter(c => c.id !== id) }))
    if (user) {
      try {
        await supabase.from('children').delete().eq('id', id).eq('profile_id', user.id)
      } catch (err) {
        console.warn('Remove child failed:', err)
        if (removed) setState(s => ({ ...s, children: [...s.children, removed] }))
      }
    }
  }

  const setOnboarded = () => setState(s => ({ ...s, isOnboarded: true }))
  const clearError = () => setState(s => ({ ...s, error: null }))

  return (
    <AppContext.Provider
      value={{
        ...state, toggleFavorite, isFavorite, completeActivity, completeRecipe,
        addToWeekPlan, removeFromWeekPlan, addChild, removeChild, setOnboarded, clearError,
      }}
    >
      {childNodes}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
