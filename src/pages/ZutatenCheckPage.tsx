import { useState, useMemo } from 'react'
import Header from '../components/Header'
import RecipeCard from '../components/RecipeCard'
import { recipes } from '../data/recipes'

// Extract all unique ingredient names and normalize them for matching
function normalizeIngredient(name: string): string {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function getAllIngredients(): string[] {
  const all = new Set<string>()
  recipes.forEach(r => {
    r.ingredients.forEach(i => {
      const name = i.name
      // Split compound ingredients like "Gemüse: Oliven, Paprika, Mais"
      if (name.includes(':')) {
        const parts = name.split(':').slice(1).join(':').split(',')
        parts.forEach(p => {
          const normalized = normalizeIngredient(p)
          if (normalized.length > 1) all.add(normalized)
        })
      } else if (name.includes(',')) {
        const parts = name.split(',')
        parts.forEach(p => {
          const normalized = normalizeIngredient(p)
          if (normalized.length > 1) all.add(normalized)
        })
      } else {
        const normalized = normalizeIngredient(i.name)
        if (normalized.length > 0) all.add(normalized)
      }
    })
  })
  return [...all].sort()
}

// Common ingredient categories for quick-add
const quickCategories = [
  { label: '🥚 Basics', items: ['eier', 'mehl', 'zucker', 'butter', 'milch', 'salz', 'olivenöl'] },
  { label: '🍌 Obst', items: ['banane', 'apfel', 'beeren', 'erdbeeren', 'blaubeeren', 'zitrone', 'mandarine'] },
  { label: '🥕 Gemüse', items: ['karotte', 'zucchini', 'gurke', 'paprika', 'tomate', 'mais', 'erbsen'] },
  { label: '🧀 Milchprodukte', items: ['joghurt', 'frischkäse', 'mozzarella', 'käse'] },
  { label: '🌾 Vorrat', items: ['haferflocken', 'reis', 'nudeln', 'kokosraspeln', 'kakaopulver', 'backpulver'] },
]

export default function ZutatenCheckPage() {
  const [searchInput, setSearchInput] = useState('')
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const allIngredients = useMemo(() => getAllIngredients(), [])

  // Filter suggestions based on input
  const suggestions = searchInput.length >= 2
    ? allIngredients.filter(i =>
        i.includes(searchInput.toLowerCase()) &&
        !selectedIngredients.includes(i)
      ).slice(0, 6)
    : []

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    )
    setSearchInput('')
  }

  // Quick-add: check if any quick category item partially matches an actual ingredient
  const addQuickItem = (item: string) => {
    const matches = allIngredients.filter(i => i.includes(item)); const match = matches.sort((a, b) => a.length - b.length)[0]
    if (match && !selectedIngredients.includes(match)) {
      setSelectedIngredients(prev => [...prev, match])
    }
  }

  // Calculate recipe matches
  const recipeMatches = useMemo(() => {
    if (selectedIngredients.length === 0) return []

    return recipes.map(recipe => {
      const recipeIngredients = recipe.ingredients.map(i => normalizeIngredient(i.name))
      const matched = recipeIngredients.filter(ri =>
        selectedIngredients.some(si => ri.includes(si) || si.includes(ri))
      )
      const missing = recipeIngredients.length - matched.length
      const percentage = Math.round((matched.length / recipeIngredients.length) * 100)
      return { recipe, matched: matched.length, missing, total: recipeIngredients.length, percentage }
    })
    .filter(m => m.matched > 0)
    .sort((a, b) => b.percentage - a.percentage || a.missing - b.missing)
  }, [selectedIngredients])

  const perfectMatches = recipeMatches.filter(m => m.missing === 0)
  const almostMatches = recipeMatches.filter(m => m.missing > 0 && m.missing <= 2)
  const otherMatches = recipeMatches.filter(m => m.missing > 2)

  return (
    <div className="pb-24">
      <Header title="Kühlschrank-Check" />

      {/* Intro */}
      <div className="px-4 mb-4">
        <p className="text-sm text-gray-500">
          Wähle die Zutaten aus, die du zuhause hast — wir zeigen dir passende Rezepte!
        </p>
      </div>

      {/* Search Input */}
      <div className="px-4 mb-3">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Zutat eingeben..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-tuki-mint focus:ring-2 focus:ring-tuki-mint/30"
          />
        </div>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div className="mt-1 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => toggleIngredient(s)}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-tuki-mint/20 transition-colors border-b border-gray-50 last:border-0 capitalize"
              >
                + {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Ingredients */}
      {selectedIngredients.length > 0 && (
        <div className="px-4 mb-4">
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map(ing => (
              <button
                key={ing}
                onClick={() => toggleIngredient(ing)}
                className="flex items-center gap-1 px-3 py-1.5 bg-tuki-mint/30 text-tuki-rot-dark rounded-full text-xs font-medium capitalize"
              >
                {ing}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            ))}
            <button
              onClick={() => setSelectedIngredients([])}
              className="px-3 py-1.5 text-xs text-gray-400 hover:text-gray-600"
            >
              Alle löschen
            </button>
          </div>
        </div>
      )}

      {/* Quick Add Categories */}
      {selectedIngredients.length === 0 && (
        <div className="px-4 mb-6">
          <p className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Schnell hinzufügen</p>
          {quickCategories.map(cat => (
            <div key={cat.label} className="mb-3">
              <p className="text-xs font-semibold text-gray-600 mb-1.5">{cat.label}</p>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map(item => {
                  const match = allIngredients.find(i => i.includes(item))
                  if (!match) return null
                  const isSelected = selectedIngredients.includes(match)
                  return (
                    <button
                      key={item}
                      onClick={() => isSelected ? toggleIngredient(match) : addQuickItem(item)}
                      className={`px-2.5 py-1 rounded-full text-xs transition-colors capitalize ${
                        isSelected
                          ? 'bg-tuki-rot text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {match}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      {selectedIngredients.length > 0 && (
        <div className="px-4">
          {/* Perfect Matches */}
          {perfectMatches.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                ✅ Alles da! ({perfectMatches.length})
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {perfectMatches.map(m => (
                  <div key={m.recipe.id} className="relative">
                    <RecipeCard recipe={m.recipe} />
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      100%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Almost There */}
          {almostMatches.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                🛒 Fast komplett ({almostMatches.length})
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {almostMatches.map(m => (
                  <div key={m.recipe.id} className="relative">
                    <RecipeCard recipe={m.recipe} />
                    <div className="absolute top-2 right-2 bg-orange-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {m.missing === 1 ? '1 fehlt' : m.missing + ' fehlen'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other */}
          {otherMatches.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                💡 Weitere Ideen ({otherMatches.length})
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {otherMatches.map(m => (
                  <div key={m.recipe.id} className="relative">
                    <RecipeCard recipe={m.recipe} />
                    <div className="absolute top-2 right-2 bg-gray-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {m.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {recipeMatches.length === 0 && (
            <div className="text-center py-12">
              <span className="text-4xl block mb-3">🤔</span>
              <p className="text-gray-500 text-sm">Noch keine passenden Rezepte.</p>
              <p className="text-gray-400 text-xs mt-1">Füge mehr Zutaten hinzu!</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
