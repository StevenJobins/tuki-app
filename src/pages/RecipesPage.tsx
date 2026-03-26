import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import AgeFilter from '../components/AgeFilter'
import RecipeCard from '../components/RecipeCard'
import { recipes } from '../data/recipes'
import { useApp } from '../context/AppContext'

const difficultyFilter = [
  { value: 'all', label: 'Alle' },
  { value: 'leicht', label: '⚡ Leicht' },
  { value: 'mittel', label: '🔥 Mittel' },
  { value: 'fortgeschritten', label: '🌟 Pro' },
]

export default function RecipesPage() {
  const { getChildAge, getActiveChild, children, activeChildId, setActiveChild } = useApp()
  const childAge = getChildAge()
  const activeChild = getActiveChild()

  // Auto-set age filter based on active child
  const autoAgeFilter = childAge !== null ? getAgeRange(childAge) : 'all'
  const [ageFilter, setAgeFilter] = useState(autoAgeFilter)
  const [diffFilter, setDiffFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = recipes.filter(r => {
    if (ageFilter !== 'all') {
      const [min, max] = ageFilter.split('-').map(Number)
      if (r.ageRange[0] > max || r.ageRange[1] < min) return false
    }
    if (diffFilter !== 'all' && r.difficulty !== diffFilter) return false
    if (search) {
      const s = search.toLowerCase()
      return r.title.toLowerCase().includes(s) || r.tags.some(t => t.toLowerCase().includes(s))
    }
    return true
  })

  return (
    <div className="pb-24">
      <Header title="Rezepte" />

      {/* Child Switcher (if multiple children) */}
      {children.length > 1 && (
        <div className="flex gap-2 px-4 mb-3 overflow-x-auto no-scrollbar py-1">
          {children.map(child => {
            const isActive = child.id === activeChildId
            return (
              <button
                key={child.id}
                onClick={() => {
                  setActiveChild(child.id)
                  const age = getChildAge(child.id)
                  if (age !== null) setAgeFilter(getAgeRange(age))
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-tuki-rot text-white'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                <span>{child.avatarEmoji}</span>
                {child.name}
              </button>
            )
          })}
        </div>
      )}

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
        <p className="text-xs text-gray-400">
          {filtered.length} Rezepte {activeChild ? `für ${activeChild.name} ` : ''}gefunden
        </p>
      </div>

      {/* Recipe Grid */}
      <motion.div
        className="grid grid-cols-2 gap-3 px-4"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.05 } },
        }}
      >
        {filtered.map(recipe => (
          <motion.div
            key={recipe.id}
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          >
            <RecipeCard recipe={recipe} />
          </motion.div>
        ))}
      </motion.div>

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

function getAgeRange(age: number): string {
  if (age <= 1) return '1-2'
  if (age <= 2) return '1-2'
  if (age <= 3) return '2-3'
  if (age <= 5) return '3-5'
  return '5-8'
}
