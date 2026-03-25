export interface Milestone {
  id: string
  title: string
  emoji: string
  ageMonths: [number, number]
  category: 'motorik' | 'feinmotorik' | 'sprache' | 'kognition' | 'sozial' | 'selbststaendigkeit'
  description: string
  expertTip: string
  expertName: string
  expertTitle: string
  linkedRecipes: string[]   // recipe IDs
  linkedActivities: string[] // activity IDs
  suggestedProducts: string[] // product suggestion descriptions — only when truly relevant
}

export interface AgePhase {
  id: string
  label: string
  range: [number, number] // months
  title: string
  description: string
  focusAreas: string[]
  boxName: string
  boxDescription: string
  boxItems: string[]
}

export const categoryInfo: Record<string, { label: string; emoji: string; color: string }> = {
  motorik: { label: 'Motorik', emoji: '🏃', color: 'bg-orange-100 text-orange-700' },
  feinmotorik: { label: 'Feinmotorik', emoji: '✋', color: 'bg-pink-100 text-pink-700' },
  sprache: { label: 'Sprache', emoji: '💬', color: 'bg-blue-100 text-blue-700' },
  kognition: { label: 'Kognition', emoji: '🧠', color: 'bg-purple-100 text-purple-700' },
  sozial: { label: 'Sozial', emoji: '🤝', color: 'bg-green-100 text-green-700' },
  selbststaendigkeit: { label: 'Selbstständigkeit', emoji: '⭐', color: 'bg-yellow-100 text-yellow-700' },
}

export const agePhases: AgePhase[] = [
  {
    id: 'baby',
    label: '12–18 Mon.',
    range: [12, 18],
    title: 'Kleine Entdecker',
    description: 'Dein K