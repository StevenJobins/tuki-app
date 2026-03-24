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
}

interface AppContextType extends AppState {
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  completeActivity: (id: string) => void
  completeRecipe: (id: string) => void
  addToWeekPlan: (day: string, id: string) => void
  removeFromWeekPlan: (day: string, id: string) => void
  addChild: (child: ChildProfile) => void
  setOnboarded: () => void
}

const LEVELS = [
  { min: 0, name: 'Kleiner Entdecker' },
  { min: 10, name: 'Küchenhelfer' },
  { min: 25, name: 'Nachwuchskoch' },
  { min: 50, name: 'Familien-Star' },
  { min: 100, name: 'Küchenchef' },
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
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children: childNodes }: { children: ReactNode }) {
  const { user } = useAuth()
  const [state, setState] = useState<AppState>(defaultState)

  // Load data from Supabase when user logs in
  const loadFromSupabase = useCallback(async (userId: string) => {
    // Load completed items
    const { data: completedItems } = await supabase
      .from('completed_items')
      .select('item_id, item_type')
      .eq('profile_id', userId)

    // Load favorites
    const { data: favItems } = await supabase
      .from('favorites')
      .select('item_id')
      .eq('profile_id', userId)

    // Load children
    const { data: childrenData } = await supabase
      .from('children')
      .select('*')
      .eq('profile_id', userId)

    const completedActivities = (completedItems || [])
      .filter(i => i.item_type === 'activity')
      .map(i => i.item_id)
    const completedRecipes = (completedItems || [])
      .filter(i => i.item_type === 'recipe')
      .map(i => i.item_id)
    const favorites = (favItems || []).map(f => f.item_id)
    const children: ChildProfile[] = (childrenData || []).map(c => ({
      id: c.id,
      name: c.name,
      birthDate: c.birth_date || '',
      avatarEmoji: c.avatar_emoji || '👶',
    }))

    const total = completedActivities.length + completedRecipes.length

    setState(s => ({
      ...s,
      completedActivities,
      completedRecipes,
      favorites,
      children,
      tukiStars: calculateStars(total),
      isOnboarded: true,
    }))
  }, [])

  useEffect(() => {
    if (user) {
      loadFromSupabase(user.id)
    } else {
      setState(defaultState)
    }
  }, [user, loadFromSupabase])

  const toggleFavorite = async (id: string) => {
    const isFav = state.favorites.includes(id)
    // Optimistic update
    setState(s => ({
      ...s,
      favorites: isFav ? s.favorites.filter(f => f !== id) : [...s.favorites, id],
    }))
    // Sync with Supabase
    if (user) {
      if (isFav) {
        await supabase.from('favorites').delete().eq('profile_id', user.id).eq('item_id', id)
      } else {
        await supabase.from('favorites').insert({ profile_id: user.id, item_id: id })
      }
    }
  }

  const isFavorite = (id: string) => state.favorites.includes(id)

  const completeActivity = async (id: string) => {
    if (state.completedActivities.includes(id)) return
    // Optimistic update
    setState(s => {
      const completed = [...s.completedActivities, id]
      const total = completed.length + s.completedRecipes.length
      return { ...s, completedActivities: completed, tukiStars: calculateStars(total) }
    })
    // Sync with Supabase
    if (user) {
      await supabase.from('completed_items').insert({
        profile_id: user.id,
        item_id: id,
        item_type: 'activity',
      })
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
      await supabase.from('completed_items').insert({
        profile_id: user.id,
        item_id: id,
        item_type: 'recipe',
      })
    }
  }

  const addToWeekPlan = (day: string, id: string) => {
    setState(s => ({
      ...s,
      weekPlan: { ...s.weekPlan, [day]: [...(s.weekPlan[day] || []), id] },
    }))
  }

  const removeFromWeekPlan = (day: string, id: string) => {
    setState(s => ({
      ...s,
      weekPlan: { ...s.weekPlan, [day]: (s.weekPlan[day] || []).filter(i => i !== id) },
    }))
  }

  const addChild = async (child: ChildProfile) => {
    setState(s => ({ ...s, children: [...s.children, child] }))
    if (user) {
      await supabase.from('children').insert({
        id: child.id,
        profile_id: user.id,
        name: child.name,
        birth_date: child.birthDate,
        avatar_emoji: child.avatarEmoji,
      })
    }
  }

  const setOnboarded = () => {
    setState(s => ({ ...s, isOnboarded: true }))
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        toggleFavorite,
        isFavorite,
        completeActivity,
        completeRecipe,
        addToWeekPlan,
        removeFromWeekPlan,
        addChild,
        setOnboarded,
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
