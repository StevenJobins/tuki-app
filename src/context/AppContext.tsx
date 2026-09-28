import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react'
import { recipes } from '../data/recipes'
import { activities } from '../data/activities'
import { useAuth } from './AuthContext'
import {
  ladeServerZustand, speichereServerZustand, vereineZustaende,
  spiegleKinder, spiegleFavoriten, spiegleErledigte,
  alleFavoriten, alleErledigten,
} from '../lib/sync'
import { supabase } from '../lib/supabase'
import { pushNachAnmeldungErneuern } from '../lib/native'

export interface ChildProfile {
  id: string
  name: string
  birthDate: string
  avatarEmoji: string
}

interface TukiStars {
  total: number
  spent: number
  level: number
  levelName: string
}

interface PerChildData {
  favorites: string[]
  completedActivities: string[]
  completedRecipes: string[]
  weekPlan: Record<string, string[]>
  tukiStars: TukiStars
}

interface AppState {
  favorites: string[]
  completedActivities: string[]
  completedRecipes: string[]
  weekPlan: Record<string, string[]>
  tukiStars: TukiStars
  children: ChildProfile[]
  activeChildId: string | null
  childData: Record<string, PerChildData>
  redeemedRewards: string[]
  language: 'de' | 'en' | 'fr'
  darkMode: boolean
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
  updateChild: (child: ChildProfile) => void
  removeChild: (childId: string) => void
  setActiveChild: (childId: string) => void
  setOnboarded: () => void
  setLanguage: (lang: 'de' | 'en' | 'fr') => void
  toggleDarkMode: () => void
  starBalance: () => number
  spendStars: (amount: number, rewardId: string) => boolean
  getActiveChild: () => ChildProfile | null
  getChildAge: (childId?: string) => number | null
  /** Kein Konto: die App laeuft rein lokal auf diesem Geraet. */
  istGast: boolean
  /** Konto vorhanden und Erstabgleich mit dem Server erledigt. */
  wirdGesichert: boolean
  /**
   * Abmelden ohne Datenleck: offene Aenderungen sichern, Push-Anmeldung des
   * Geraets loesen, abmelden. Den lokalen Zustand raeumt danach der
   * Abmelde-Effekt weg.
   */
  abmelden: () => Promise<void>
}

const LEVELS = [
  { min: 0, name: 'Kleiner Entdecker' },
  { min: 10, name: 'Küchenhelfer' },
  { min: 25, name: 'Nachwuchskoch' },
  { min: 50, name: 'Familien-Star' },
  { min: 100, name: 'Küchenchef' },
]

function sumStars(completedRecipeIds: string[], completedActivityIds: string[]): number {
  let total = 0
  for (const id of completedRecipeIds) {
    const recipe = recipes.find(r => r.id === id)
    total += recipe ? recipe.stars : 1
  }
  for (const id of completedActivityIds) {
    const activity = activities.find(a => a.id === id)
    total += activity ? activity.stars : 1
  }
  return total
}

function calculateStars(starTotal: number, currentSpent: number = 0): TukiStars {
  let level = 0
  let levelName = LEVELS[0].name
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (starTotal >= LEVELS[i].min) {
      level = i
      levelName = LEVELS[i].name
      break
    }
  }
  return { total: starTotal, spent: currentSpent, level, levelName }
}

const defaultPerChild: PerChildData = {
  favorites: [],
  completedActivities: [],
  completedRecipes: [],
  weekPlan: {},
  tukiStars: { total: 0, spent: 0, level: 0, levelName: 'Kleiner Entdecker' },
}

const defaultState: AppState = {
  favorites: [],
  completedActivities: [],
  completedRecipes: [],
  weekPlan: {},
  tukiStars: { total: 0, spent: 0, level: 0, levelName: 'Kleiner Entdecker' },
  children: [],
  activeChildId: null,
  childData: {},
  redeemedRewards: [],
  language: 'de',
  darkMode: false,
  isOnboarded: false,
}

function loadState(): AppState {
  try {
    const saved = localStorage.getItem('tuki-family-state')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed && !parsed.childData) {
        parsed.childData = {}
        parsed.activeChildId = parsed.activeChildId || null
      }
      if (parsed.children?.length > 0 && !parsed.activeChildId) {
        parsed.activeChildId = parsed.children[0].id
      }
      return { ...defaultState, ...parsed }
    }
  } catch {}
  return defaultState
}

async function sichereAufServer(id: string, state: AppState): Promise<void> {
  await speichereServerZustand(id, state)
  await spiegleKinder(id, state.children)
  const { rezepte, aktivitaeten } = alleErledigten(state)
  await spiegleFavoriten(id, alleFavoriten(state))
  await spiegleErledigte(id, rezepte, aktivitaeten)
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children: childNodes }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState)
  const { user, signOut } = useAuth()
  const [wirdGesichert, setWirdGesichert] = useState(false)
  const geladenFuer = useRef<string | null>(null)
  const abgleichTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const stateRef = useRef(state)
  stateRef.current = state
  const vorherigerUser = useRef<string | null>(null)

  useEffect(() => {
    localStorage.setItem('tuki-family-state', JSON.stringify(state))
  }, [state])

  // Beim Wechsel von "angemeldet" zu "abgemeldet" alles Kontobezogene vom
  // Geraet nehmen. Sonst bleiben Kinder, Favoriten und Sterne im Speicher,
  // und der naechste Login vereint sie mit einem fremden Konto.
  // Greift auch, wenn Supabase die Sitzung selbst beendet (abgelaufenes Token)
  // und nach dem Loeschen des Kontos. Reine Gaeste (nie angemeldet) bleiben
  // unberuehrt, ihre Daten existieren nur hier.
  useEffect(() => {
    const vorher = vorherigerUser.current
    vorherigerUser.current = user?.id ?? null
    if (!vorher || user) return
    if (abgleichTimer.current) clearTimeout(abgleichTimer.current)
    setState(s => ({
      ...defaultState,
      // Geraete-Einstellungen, keine Kontodaten
      language: s.language,
      darkMode: s.darkMode,
      isOnboarded: s.isOnboarded,
    }))
    try {
      localStorage.removeItem('tuki-klaviyo-sync')
      localStorage.removeItem('tuki-notifications')
    } catch { /* egal */ }
  }, [user?.id])

  // Beim Anmelden einmal den Serverzustand holen und mit dem Geraet vereinen.
  // Genau hier landen die Daten, die jemand vorher ohne Konto gesammelt hat.
  useEffect(() => {
    if (!user) {
      geladenFuer.current = null
      setWirdGesichert(false)
      return
    }
    if (geladenFuer.current === user.id) return
    geladenFuer.current = user.id
    let aktiv = true
    ;(async () => {
      const server = await ladeServerZustand(user.id)
      if (!aktiv) return
      if (server) setState(s => vereineZustaende(server, s))
      setWirdGesichert(true)
      pushNachAnmeldungErneuern()
    })()
    return () => { aktiv = false }
  }, [user?.id])

  // Danach jede Aenderung sichern, gebuendelt statt bei jedem Tastendruck.
  useEffect(() => {
    if (!user || !wirdGesichert) return
    if (abgleichTimer.current) clearTimeout(abgleichTimer.current)
    abgleichTimer.current = setTimeout(() => {
      abgleichTimer.current = null
      sichereAufServer(user.id, state)
    }, 1500)
    return () => { if (abgleichTimer.current) clearTimeout(abgleichTimer.current) }
  }, [user?.id, wirdGesichert, state])

  const abmelden = async () => {
    const id = user?.id
    if (id) {
      // Was in den letzten 1.5 s geaendert wurde, liegt noch nicht auf dem Server
      if (abgleichTimer.current && wirdGesichert) {
        clearTimeout(abgleichTimer.current)
        abgleichTimer.current = null
        try { await sichereAufServer(id, stateRef.current) } catch { /* Abmelden trotzdem */ }
      }
      // Geraet nicht mehr fuer dieses Konto anpingen
      try { await supabase.from('push_subscriptions').delete().eq('profile_id', id) } catch { /* egal */ }
    }
    await signOut()
  }

  // Apply dark-mode class whenever state changes
  useEffect(() => {
    document.body.classList.toggle('dark-mode', state.darkMode)
  }, [state.darkMode])

  const saveCurrentChildData = useCallback((s: AppState): AppState => {
    if (!s.activeChildId) return s
    return {
      ...s,
      childData: {
        ...s.childData,
        [s.activeChildId]: {
          favorites: s.favorites,
          completedActivities: s.completedActivities,
          completedRecipes: s.completedRecipes,
          weekPlan: s.weekPlan,
          tukiStars: s.tukiStars,
        },
      },
    }
  }, [])

  const toggleFavorite = (id: string) => {
    setState(s => ({
      ...s,
      favorites: s.favorites.includes(id)
        ? s.favorites.filter(f => f !== id)
        : [...s.favorites, id],
    }))
  }

  const isFavorite = (id: string) => state.favorites.includes(id)

  const completeActivity = (id: string) => {
    setState(s => {
      if (s.completedActivities.includes(id)) return s
      const completed = [...s.completedActivities, id]
      const total = sumStars(s.completedRecipes, completed)
      return { ...s, completedActivities: completed, tukiStars: calculateStars(total, s.tukiStars.spent) }
    })
  }

  const completeRecipe = (id: string) => {
    setState(s => {
      if (s.completedRecipes.includes(id)) return s
      const completed = [...s.completedRecipes, id]
      const total = sumStars(completed, s.completedActivities)
      return { ...s, completedRecipes: completed, tukiStars: calculateStars(total, s.tukiStars.spent) }
    })
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

  const addChild = (child: ChildProfile) => {
    setState(s => {
      const isFirst = s.children.length === 0
      let newState = { ...s, children: [...s.children, child] }
      if (isFirst) {
        newState.childData = { ...newState.childData, [child.id]: { favorites: s.favorites, completedActivities: s.completedActivities, completedRecipes: s.completedRecipes, weekPlan: s.weekPlan, tukiStars: s.tukiStars } }
        newState.activeChildId = child.id
      } else {
        newState = saveCurrentChildData(newState)
        newState.childData = { ...newState.childData, [child.id]: { ...defaultPerChild } }
      }
      return newState
    })
  }

  const updateChild = (child: ChildProfile) => {
    setState(s => ({ ...s, children: s.children.map(c => (c.id === child.id ? child : c)) }))
  }

  const removeChild = (childId: string) => {
    setState(s => {
      const newChildren = s.children.filter(c => c.id !== childId)
      const { [childId]: _, ...restChildData } = s.childData
      let newActiveId = s.activeChildId
      let newFavorites = s.favorites
      let newCompletedAct = s.completedActivities
      let newCompletedRec = s.completedRecipes
      let newWeekPlan = s.weekPlan
      let newStars = s.tukiStars
      if (s.activeChildId === childId) {
        if (newChildren.length > 0) {
          newActiveId = newChildren[0].id
          const data = restChildData[newActiveId] || defaultPerChild
          newFavorites = data.favorites
          newCompletedAct = data.completedActivities
          newCompletedRec = data.completedRecipes
          newWeekPlan = data.weekPlan
          newStars = data.tukiStars
        } else {
          newActiveId = null
          newFavorites = []
          newCompletedAct = []
          newCompletedRec = []
          newWeekPlan = {}
          newStars = { total: 0, spent: 0, level: 0, levelName: 'Kleiner Entdecker' }
        }
      }
      return { ...s, children: newChildren, childData: restChildData, activeChildId: newActiveId, favorites: newFavorites, completedActivities: newCompletedAct, completedRecipes: newCompletedRec, weekPlan: newWeekPlan, tukiStars: newStars }
    })
  }

  const setActiveChild = (childId: string) => {
    setState(s => {
      if (s.activeChildId === childId) return s
      const saved = saveCurrentChildData(s)
      const data = saved.childData[childId] || defaultPerChild
      return { ...saved, activeChildId: childId, favorites: data.favorites, completedActivities: data.completedActivities, completedRecipes: data.completedRecipes, weekPlan: data.weekPlan, tukiStars: data.tukiStars }
    })
  }

  const setOnboarded = () => {
    setState(s => ({ ...s, isOnboarded: true }))
  }

  const setLanguage = (lang: 'de' | 'en' | 'fr') => {
    setState(s => ({ ...s, language: lang }))
  }

  const toggleDarkMode = () => {
    setState(s => {
      const newDark = !s.darkMode
      document.body.classList.toggle('dark-mode', newDark)
      return { ...s, darkMode: newDark }
    })
  }

  const starBalance = (): number => {
    return state.tukiStars.total - state.tukiStars.spent
  }

  const spendStars = (amount: number, rewardId: string): boolean => {
    if (starBalance() < amount) return false
    setState(s => ({
      ...s,
      tukiStars: { ...s.tukiStars, spent: s.tukiStars.spent + amount },
      redeemedRewards: [...s.redeemedRewards, rewardId],
    }))
    return true
  }

  const getActiveChild = (): ChildProfile | null => {
    if (!state.activeChildId) return null
    return state.children.find(c => c.id === state.activeChildId) || null
  }

  const getChildAge = (childId?: string): number | null => {
    const id = childId || state.activeChildId
    if (!id) return null
    const child = state.children.find(c => c.id === id)
    if (!child) return null
    const birth = new Date(child.birthDate)
    const now = new Date()
    let years = now.getFullYear() - birth.getFullYear()
    const m = now.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) years--
    return Math.max(0, years)
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        toggleFavorite, isFavorite, completeActivity, completeRecipe,
        addToWeekPlan, removeFromWeekPlan, addChild, updateChild,
        removeChild, setActiveChild, setOnboarded, setLanguage, toggleDarkMode,
        starBalance, spendStars, getActiveChild, getChildAge,
        istGast: !user, wirdGesichert, abmelden,
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
