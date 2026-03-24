import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

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
    if (completed >= LEVELS[i].min) { level = i; levelName = LEVELS[i].name; break }
  }
  return { total: completed, level, levelName }
}

const defaultState: AppState = { favorites: [], completedActivities: [], completedRecipes: [], weekPlan: {}, children: [], tukiStars: { total: 0, level: 0, levelName: 'Kleiner Entdecker' }, language: 'de', isOnboarded: false }

function loadState(): AppState {
  try { const s = localStorage.getItem('tuki-family-state'); if (s) return { ...defaultState, ...JSON.parse(s) } } catch {}
  return defaultState
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children: childNodes }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState)
  useEffect(() => { localStorage.setItem('tuki-family-state', JSON.stringify(state)) }, [state])
  const toggleFavorite = (id: string) => setState(s => ({ ...s, favorites: s.favorites.includes(id) ? s.favorites.filter(f => f !== id) : [...s.favorites, id] }))
  const isFavorite = (id: string) => state.favorites.includes(id)
  const completeActivity = (id: string) => setState(s => { if (s.completedActivities.includes(id)) return s; const c = [...s.completedActivities, id]; return { ...s, completedActivities: c, tukiStars: calculateStars(c.length + s.completedRecipes.length) } })
  const completeRecipe = (id: string) => setState(s => { if (s.completedRecipes.includes(id)) return s; const c = [...s.completedRecipes, id]; return { ...s, completedRecipes: c, tukiStars: calculateStars(s.completedActivities.length + c.length) } })
  const addToWeekPlan = (day: string, id: string) => setState(s => ({ ...s, weekPlan: { ...s.weekPlan, [day]: [...(s.weekPlan[day] || []), id] } }))
  const removeFromWeekPlan = (day: string, id: string) => setState(s => ({ ...s, weekPlan: { ...s.weekPlan, [day]: (s.weekPlan[day] || []).filter(i => i !== id) } }))
  const addChild = (child: ChildProfile) => setState(s => ({ ...s, children: [...s.children, child] }))
  const setOnboarded = () => setState(s => ({ ...s, isOnboarded: true }))
  return (<AppContext.Provider value={{ ...state, toggleFavorite, isFavorite, completeActivity, completeRecipe, addToWeekPlan, removeFromWeekPlan, addChild, setOnboarded }}>{childNodes}</AppContext.Provider>)
}

export function useApp() { const ctx = useContext(AppContext); if (!ctx) throw new Error('useApp must be used within AppProvider'); return ctx }
