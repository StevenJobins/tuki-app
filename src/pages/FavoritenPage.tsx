import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Header from '../components/Header'
import RecipeCard from '../components/RecipeCard'
import ActivityCard from '../components/ActivityCard'
import { recipes } from '../data/recipes'
import { activities } from '../data/activities'

type TabType = 'alle' | 'rezepte' | 'aktivitaeten'

export default function FavoritenPage() {
  const { favorites } = useApp()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('alle')

  const favRecipes = recipes.filter(r => favorites.includes(r.id))
  const favActivities = activities.filter(a => favorites.includes(a.id))

  const tabs: { key: TabType; label: string; count: number }[] = [
    { key: 'alle', label: 'Alle', count: favRecipes.length + favActivities.length },
    { key: 'rezepte', label: 'Rezepte', count: favRecipes.length },
    { key: 'aktivitaeten', label: 'Aktivitäten', count: favActivities.length },
  ]

  const showRecipes = activeTab === 'alle' || activeTab === 'rezepte'
  const showActivities = activeTab === 'alle' || activeTab === 'aktivitaeten'

  return (
    <div className="min-h-screen bg-tuki-cream pb-24 md:pb-8">
      <Header title="Meine Favoriten" showBack />

      {/* Tabs */}
      <div className="px-4 pt-4">
        <div className="flex gap-2 bg-white rounded-xl p-1 shadow-sm">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-tuki-brown text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              <span className={`ml-1 text-xs ${
                activeTab === tab.key ? 'text-white/80' : 'text-gray-400'
              }`}>
                ({tab.count})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {favorites.length === 0 && (
        <div className="px-4 pt-16 text-center">
          <div className="text-6xl mb-4">{'\u2764\uFE0F'}</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Noch keine Favoriten
          </h2>
          <p className="text-gray-500 mb-6 max-w-xs mx-auto">
            Tippe auf das Herz-Icon bei Rezepten und Aktivitäten, um sie hier zu speichern.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate('/rezepte')}
              className="px-4 py-2 bg-tuki-brown text-white rounded-xl text-sm font-medium shadow-sm active:scale-95 transition-transform"
            >
              Rezepte entdecken
            </button>
            <button
              onClick={() => navigate('/aktivitaeten')}
              className="px-4 py-2 bg-white text-tuki-brown border border-tuki-brown/20 rounded-xl text-sm font-medium shadow-sm active:scale-95 transition-transform"
            >
              Aktivitäten entdecken
            </button>
          </div>
        </div>
      )}

      {/* Favorite Recipes */}
      {showRecipes && favRecipes.length > 0 && (
        <div className="px-4 pt-6">
          {activeTab === 'alle' && (
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-800">
                {'\uD83C\uDF73'} Rezepte
              </h2>
              <span className="text-sm text-gray-400">{favRecipes.length} gespeichert</span>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            {favRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}

      {/* Favorite Activities */}
      {showActivities && favActivities.length > 0 && (
        <div className="px-4 pt-6">
          {activeTab === 'alle' && (
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-800">
                {'🎮'} Aktivitäten
              </h2>
              <span className="text-sm text-gray-400">{favActivities.length} gespeichert</span>
            </div>
          )}
          <div className="grid grid-cols-1 gap-3">
            {favActivities.map(activity => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      )}

      {/* Filtered empty state */}
      {favorites.length > 0 && (
        (activeTab === 'rezepte' && favRecipes.length === 0) ||
        (activeTab === 'aktivitaeten' && favActivities.length === 0)
      ) && (
        <div className="px-4 pt-12 text-center">
          <p className="text-gray-400 text-sm">
            {activeTab === 'rezepte'
              ? 'Noch keine Rezepte als Favorit markiert.'
              : 'Noch keine Aktivitäten als Favorit markiert.'}
          </p>
        </div>
      )}
    </div>
  )
}
