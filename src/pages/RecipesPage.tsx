import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import AgeFilter from '../components/AgeFilter'
import RecipeCard from '../components/RecipeCard'
import { recipes } from '../data/recipes'

const difficultyFilter = [
  { value: 'all', label: 'Alle' },
  { value: 'leicht', label: '⚡ Leicht' },
  { value: 'mittel', label: '🔥 Mittel' },
  { value: 'fortgeschritten', label: '🌟 Pro' },
]

function getCurrentSeason(): string {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return 'Fruehling'
  if (month >= 5 && month <= 7) return 'Sommer'
  if (month >= 8 && month <= 10) return 'Herbst'
  return 'Winter'
}

function getSeasonLabel(season: string): string {
  const labels: Record<string, string> = {
    'Fruehling': '🌸 Frühling',
    'Sommer': '☀️ Sommer',
    'Herbst': '🍂 Herbst',
    'Winter': '❄️ Winter',
  }
  return labels[season] || season
}

export default function RecipesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [ageFilter, setAgeFilter] = useState('all')
  const [diffFilter, setDiffFilter] = useState('all')
  const [seasonFilter, setSeasonFilter] = useState(searchParams.get('season') || 'all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const s = searchParams.get('season')
    if (s) setSeasonFilter(s)
  }, [searchParams])

  const handleSeasonChange = (val: string) => {
    setSeasonFilter(val)
    if (val === 'all') {
      searchParams.delete('season')
    } else {
      searchParams.set('season', val)
    }
    setSearchParams(searchParams, { replace: true })
  }

  const filtered = recipes.filter(r => {
    // Age filter
    if (ageFilter !== 'all') {
      const [min, max] = ageFilter.split('-').map(Number)
      if (r.ageRange[0] > max || r.ageRange[1] < min) return false
    }
    // Difficulty
    if (diffFilter !== 'all' && r.difficulty !== diffFilter) return false
    // Season
    if (seasonFilter !== 'all') {
      if (!r.season.includes(seasonFilter as any) && !r.season.includes('ganzjaehrig' as any)) return false
    }
    // Search
    if (search) {
      const s = search.toLowerCase()
      return r.title.toLowerCase().includes(s) || r.tags.some(t => t.toLowerCase().includes(s))
    }
    return true
  })

  return (
    <div className="pb-24">
      <Header title="Rezepte" />

      {/* Kühlschrank-Check Banner */}
      <div className="px-4 mb-4">
        <button
          onClick={() => navigate('/zutaten-check')}
          className="w-full bg-gradient-to-r from-cyan-50 to-tuki-mint/30 rounded-2xl p-3.5 border border-cyan-200/50 text-left active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧊</span>
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-gray-800">Kühlschrank-Check</h3>
              <p className="text-xs text-gray-500">Zutaten eingeben → passende Rezepte finden</p>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5E6578" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </button>
      </div>

      {/* Search */}
      <div className="px-4 mb-3">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Rezept suchen..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-tuki-mint focus:ring-2 focus:ring-tuki-mint/30"
          />
        </div>
      </div>

      {/* Age Filter */}
      <div className="mb-2">
        <AgeFilter selected={ageFilter} onChange={setAgeFilter} />
      </div>

      {/* Season Filter */}
      <div className="flex gap-2 px-4 mb-2 overflow-x-auto no-scrollbar">
        {[
          { value: 'all', label: 'Alle Saisons' },
          { value: getCurrentSeason(), label: getSeasonLabel(getCurrentSeason()) + ' (jetzt)' },
          ...['Fruehling', 'Sommer', 'Herbst', 'Winter']
            .filter(s => s !== getCurrentSeason())
            .map(s => ({ value: s, label: getSeasonLabel(s) }))
        ].map(s => (
          <button
            key={s.value}
            onClick={() => handleSeasonChange(s.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              seasonFilter === s.value
                ? 'bg-tuki-rot text-white'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Difficulty Filter */}
      <div className="flex gap-2 px-4 mb-4 overflow-x-auto no-scrollbar">
        {difficultyFilter.map(d => (
          <button
            key={d.value}
            onClick={() => setDiffFilter(d.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              diffFilter === d.value
                ? 'bg-tuki-mint text-tuki-rot-dark'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="px-4 mb-3">
        <p className="text-xs text-gray-400">{filtered.length} Rezepte gefunden</p>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4">
        {filtered.map(recipe => (
          <div key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 px-4">
          <span className="text-4xl block mb-3">🔍</span>
          <p className="text-gray-500 text-sm">Keine Rezepte gefunden.</p>
          <p className="text-gray-400 text-xs mt-1">Versuch einen anderen Filter!</p>
        </div>
      )}
    </div>
  )
}
