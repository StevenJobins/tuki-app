import { motion } from 'framer-motion'
import Header from '../components/Header'
import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { recipes } from '../data/recipes'
import { activities } from '../data/activities'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { tukiStars, completedActivities, completedRecipes, favorites, children } = useApp()

  const favoriteRecipes = recipes.filter(r => favorites.includes(r.id))
  const favoriteActivities = activities.filter(a => favorites.includes(a.id))
  const totalFavorites = favoriteRecipes.length + favoriteActivities.length

  const LEVELS = [
    { min: 0, name: 'Kleiner Entdecker', emoji: '🌱' },
    { min: 10, name: 'Küchenhelfer', emoji: '👩‍🍳' },
    { min: 25, name: 'Nachwuchskoch', emoji: '🍳' },
    { min: 50, name: 'Familien-Star', emoji: '⭐' },
    { min: 100, name: 'Küchenchef', emoji: '🏆' },
  ]

  return (
    <div className="pb-24">
      <Header title="Profil" />

      {/* Profile Card */}
      <div className="mx-4 mt-2 mb-6">
        <div className="bg-white rounded-3xl p-6 border border-gray-100 text-center">
          <div className="w-20 h-20 rounded-full gradient-mint flex items-center justify-center text-3xl mx-auto mb-3">
            👨‍👩‍👧
          </div>
          <h2 className="font-bold text-lg text-gray-800">Unsere Tuki-Familie</h2>
          <p className="text-gray-500 text-sm mt-1">Mitglied seit März 2026</p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mt-5">
            <div className="bg-yellow-50 rounded-xl p-3">
              <p className="text-xl font-bold text-yellow-600">{tukiStars.total}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Tuki-Sterne</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3">
              <p className="text-xl font-bold text-green-600">{completedActivities.length + completedRecipes.length}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Abgeschlossen</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-3">
              <p className="text-xl font-bold text-pink-600">{totalFavorites}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Favoriten</p>
            </div>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="mx-4 mb-6">
        <h3 className="font-semibold text-sm text-gray-800 mb-3">🏆 Entdecker-Level</h3>
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="space-y-3">
            {LEVELS.map((level, i) => {
              const isActive = tukiStars.level === i
              const isDone = tukiStars.level > i
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                    isDone ? 'bg-green-100' : isActive ? 'bg-yellow-100' : 'bg-gray-50'
                  }`}>
                    {isDone ? '✅' : level.emoji}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isActive ? 'text-tuki-rot' : isDone ? 'text-green-700' : 'text-gray-400'}`}>
                      {level.name}
                    </p>
                    <p className="text-[10px] text-gray-400">{level.min} Sterne</p>
                  </div>
                  {isActive && (
                    <span className="text-[10px] bg-tuki-rot text-white px-2 py-0.5 rounded-full font-medium">
                      Aktuell
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Favorites */}
      {totalFavorites > 0 && (
        <div className="mx-4 mb-6">
          <h3 className="font-semibold text-sm text-gray-800 mb-3">❤️ Meine Favoriten</h3>
          <div className="space-y-2">
            {favoriteRecipes.map(r => (
              <motion.div
                key={r.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/rezept/${r.id}`)}
                className="bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-3 cursor-pointer"
              >
                <span className="text-xl">{r.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{r.title}</p>
                  <p className="text-[10px] text-gray-400">Rezept · {r.duration} Min.</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
              </motion.div>
            ))}
            {favoriteActivities.map(a => (
              <motion.div
                key={a.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/aktivitaet/${a.id}`)}
                className="bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-3 cursor-pointer"
              >
                <span className="text-xl">{a.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{a.title}</p>
                  <p className="text-[10px] text-gray-400">Aktivität · {a.duration} Min.</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className="mx-4">
        <h3 className="font-semibold text-sm text-gray-800 mb-3">Einstellungen</h3>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {[
            { emoji: '🌐', label: 'Sprache', value: 'Deutsch' },
            { emoji: '🔔', label: 'Benachrichtigungen', value: 'An' },
            { emoji: '🎨', label: 'Erscheinungsbild', value: 'Hell' },
            { emoji: '📱', label: 'App-Version', value: '2.0.0' },
            { emoji: '🔗', label: 'tuki.ch besuchen', value: '' },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3.5 ${i < 4 ? 'border-b border-gray-50' : ''}`}
            >
              <span className="text-lg">{item.emoji}</span>
              <span className="text-sm text-gray-700 flex-1">{item.label}</span>
              <span className="text-xs text-gray-400">{item.value}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 mb-4">
        <div className="w-8 h-8 rounded-lg gradient-rot flex items-center justify-center mx-auto mb-2">
          <span className="text-white font-bold text-sm">T</span>
        </div>
        <p className="text-[10px] text-gray-400">Tuki Family App v2.0</p>
        <p className="text-[10px] text-gray-300">mimodo AG · Schweiz</p>
      </div>
    </div>
  )
}
