import { useState } from 'react'
import Header from '../components/Header'
import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const avatarOptions = ['👶', '🙋', '🧑‍🍳', '🧒', '👧', '👦', '🧑', '🌟']

export default function ProfilePage() {
  const navigate = useNavigate()
  const { tukiStars, completedActivities, completedRecipes, favorites, children, addChild, removeChild } = useApp()
  const [showAddChild, setShowAddChild] = useState(false)
  const [childName, setChildName] = useState('')
  const [childBirth, setChildBirth] = useState('')
  const [childEmoji, setChildEmoji] = useState('👶')

  const handleAddChild = () => {
    if (!childName.trim() || !childBirth) return
    addChild({
      id: Date.now().toString(),
      name: childName.trim(),
      birthDate: childBirth,
      avatarEmoji: childEmoji
    })
    setChildName('')
    setChildBirth('')
    setChildEmoji('👶')
    setShowAddChild(false)
  }

  const getAge = (birthDate: string) => {
    const birth = new Date(birthDate)
    const now = new Date()
    const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth())
    if (months < 24) return months + ' Monate'
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    return remainingMonths > 0 ? years + ' Jahre, ' + remainingMonths + ' Mt.' : years + ' Jahre'
  }

  return (
    <div className="pb-24">
      <Header title="Profil" />

      {/* Family Stats Card */}
      <div className="mx-4 mt-2 mb-6">
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl gradient-rot flex items-center justify-center">
              <span className="text-3xl text-white">👨‍👩‍👧</span>
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-800">Unsere Tuki-Familie</h2>
              <p className="text-xs text-gray-500">{children.length === 0 ? 'Noch kein Kinderprofil angelegt' : children.length + (children.length === 1 ? ' Kind' : ' Kinder')}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-yellow-50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-yellow-600">{tukiStars.total}</p>
              <p className="text-[10px] text-gray-500">Sterne</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-green-600">{completedRecipes.length + completedActivities.length}</p>
              <p className="text-[10px] text-gray-500">Abgeschlossen</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-pink-600">{favorites.length}</p>
              <p className="text-[10px] text-gray-500">Favoriten</p>
            </div>
          </div>
        </div>
      </div>

      {/* Children Profiles */}
      <div className="mx-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm text-gray-800">👶 Kinderprofile</h3>
          <button
            onClick={() => setShowAddChild(true)}
            className="text-xs text-tuki-rot font-medium"
          >
            + Kind hinzufügen
          </button>
        </div>

        {children.length === 0 && !showAddChild && (
          <button
            onClick={() => setShowAddChild(true)}
            className="w-full bg-white rounded-2xl p-5 border-2 border-dashed border-gray-200 text-center hover:border-tuki-rot/30 transition-colors"
          >
            <span className="text-3xl block mb-2">👶</span>
            <p className="text-sm font-medium text-gray-700">Kinderprofil anlegen</p>
            <p className="text-xs text-gray-400 mt-1">Name & Geburtsdatum für personalisierte Inhalte</p>
          </button>
        )}

        {children.map(child => (
          <div key={child.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-tuki-mint/30 flex items-center justify-center">
                <span className="text-2xl">{child.avatarEmoji}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-gray-800">{child.name}</h4>
                <p className="text-xs text-gray-500">{getAge(child.birthDate)} alt</p>
              </div>
              <button
                onClick={() => removeChild(child.id)}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors"
              >
                Entfernen
              </button>
            </div>
          </div>
        ))}

        {/* Add Child Form */}
        {showAddChild && (
          <div className="bg-white rounded-2xl p-5 border border-tuki-mint shadow-sm">
            <h4 className="font-semibold text-sm text-gray-800 mb-4">Neues Kinderprofil</h4>
            
            {/* Avatar Selection */}
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Avatar wählen</p>
              <div className="flex gap-2 flex-wrap">
                {avatarOptions.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => setChildEmoji(emoji)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all ${
                      childEmoji === emoji ? 'bg-tuki-mint/50 ring-2 ring-tuki-rot scale-110' : 'bg-gray-100'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="text-xs text-gray-500 block mb-1">Name</label>
              <input
                type="text"
                value={childName}
                onChange={e => setChildName(e.target.value)}
                placeholder="z.B. Mila"
                className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-tuki-mint focus:ring-2 focus:ring-tuki-mint/30"
              />
            </div>

            <div className="mb-4">
              <label className="text-xs text-gray-500 block mb-1">Geburtsdatum</label>
              <input
                type="date"
                value={childBirth}
                onChange={e => setChildBirth(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-tuki-mint focus:ring-2 focus:ring-tuki-mint/30"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAddChild}
                className="flex-1 py-2.5 bg-tuki-rot text-white rounded-xl text-sm font-medium active:scale-95 transition-transform"
              >
                Speichern
              </button>
              <button
                onClick={() => setShowAddChild(false)}
                className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm"
              >
                Abbrechen
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Level Progress */}
      <div className="mx-4 mb-6">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm text-gray-800">🏆 {tukiStars.levelName}</h3>
            <span className="text-xs text-gray-500">Level {tukiStars.level + 1}/5</span>
          </div>
          <div className="w-full h-2 bg-yellow-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((tukiStars.total / 100) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mx-4 mb-4">
        <h3 className="font-semibold text-sm text-gray-800 mb-3">⚙️ Einstellungen</h3>
        {[
          { label: 'Wochenplan anzeigen', emoji: '📅', path: '/wochenplan' },
          { label: 'Entwicklungs-Tracker', emoji: '📊', path: '/entwicklung' },
        ].map(item => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center gap-3 bg-white rounded-xl p-3.5 mb-2 border border-gray-100 text-left"
          >
            <span className="text-lg">{item.emoji}</span>
            <span className="text-sm text-gray-700 flex-1">{item.label}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        ))}
      </div>
    </div>
  )
}
