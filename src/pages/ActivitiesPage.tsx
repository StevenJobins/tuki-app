import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import AgeFilter from '../components/AgeFilter'
import ActivityCard from '../components/ActivityCard'
import { activities, categoryInfo, getActivityById } from '../data/activities'

export default function ActivitiesPage() {
  const navigate = useNavigate()
  const [ageFilter, setAgeFilter] = useState('all')
  const [catFilter, setCatFilter] = useState('all')
  const [search, setSearch] = useState('')

  const categories = [
    { value: 'all', label: 'Alle', emoji: '🎯' },
    ...Object.entries(categoryInfo).map(([key, val]) => ({
      value: key,
      label: val.label,
      emoji: val.emoji,
    })),
  ]

  const filtered = activities.filter(a => {
    if (ageFilter !== 'all') {
      const [min, max] = ageFilter.split('-').map(Number)
      if (a.ageRange[0] > max || a.ageRange[1] < min) return false
    }
    if (catFilter !== 'all' && a.category !== catFilter) return false
    if (search) {
      const s = search.toLowerCase()
      return (
        a.title.toLowerCase().includes(s) ||
        a.subtitle.toLowerCase().includes(s) ||
        a.materials.some(m => m.toLowerCase().includes(s)) ||
        a.learningGoals.some(g => g.toLowerCase().includes(s))
      )
    }
    return true
  })

  // Featured: yoga-tiere
  const yogaActivity = getActivityById('yoga-tiere')
  const showFeatured = catFilter === 'all' && ageFilter === 'all' && !search

  return (
    <div className="pb-24">
      <Header title="Aktivitäten" />

      {/* Search */}
      <div className="px-4 mb-3">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Aktivität suchen..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-tuki-mint focus:ring-2 focus:ring-tuki-mint/30"
          />
        </div>
      </div>

      {/* Category chips */}
      <div className="flex gap-2 px-4 mb-3 overflow-x-auto no-scrollbar py-1">
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setCatFilter(cat.value)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              catFilter === cat.value
                ? 'bg-tuki-rot text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-100'
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Age Filter */}
      <div className="mb-4">
        <AgeFilter selected={ageFilter} onChange={setAgeFilter} />
      </div>

      {/* Featured: Tier-Yoga */}
      {showFeatured && yogaActivity && (
        <div className="px-4 mb-5">
          <button
            onClick={() => navigate('/aktivitaet/yoga-tiere')}
            className="w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-2xl overflow-hidden shadow-lg shadow-purple-500/20 text-left active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center">
              <div className="flex-1 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
                    Highlight
                  </span>
                  <span className="bg-white/20 text-white text-[10px] font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
                    🤸 Motorik
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg mb-0.5">🧘 Tier-Yoga</h3>
                <p className="text-white/80 text-xs mb-2">8 Tierposen zum Nachmachen — Bewegung trifft Fantasie!</p>
                <div className="flex items-center gap-3">
                  <span className="text-white/70 text-[10px]">⏱️ 20 Min.</span>
                  <span className="text-white/70 text-[10px]">👶 2-7 J.</span>
                  <span className="text-white/70 text-[10px]">⭐ 2 Sterne</span>
                </div>
              </div>
              <div className="w-28 h-28 shrink-0 mr-3">
                <div className="w-full h-full rounded-xl bg-white/10 flex items-center justify-center text-5xl">
                  🧘
                </div>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Results */}
      <div className="px-4 mb-3">
        <p className="text-xs text-gray-400">{filtered.length} Aktivitäten gefunden</p>
      </div>

      {/* Activity Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4">
        {filtered.map(activity => (
          <div key={activity.id}>
            <ActivityCard activity={activity} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 px-4">
          <span className="text-4xl block mb-3">🔍</span>
          <p className="text-gray-500 text-sm">Keine Aktivitäten gefunden.</p>
          <p className="text-gray-400 text-xs mt-1">Versuch einen anderen Suchbegriff oder Filter!</p>
        </div>
      )}
    </div>
  )
}
