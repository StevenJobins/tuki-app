import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import { useApp, ChildProfile } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { recipes } from '../data/recipes'
import { activities } from '../data/activities'

const AVATAR_EMOJIS = ['👶', '👧', '👦', '🧒', '👸', '🤴', '🦸', '🧚', '🐣', '🌟', '🦋', '🐻']

function AddChildModal({ onClose, onSave, editChild }: {
  onClose: () => void
  onSave: (child: ChildProfile) => void
  editChild?: ChildProfile | null
}) {
  const [name, setName] = useState(editChild?.name || '')
  const [birthDate, setBirthDate] = useState(editChild?.birthDate || '')
  const [avatar, setAvatar] = useState(editChild?.avatarEmoji || '👶')

  const handleSave = () => {
    if (!name.trim() || !birthDate) return
    onSave({
      id: editChild?.id || `child-${Date.now()}`,
      name: name.trim(),
      birthDate,
      avatarEmoji: avatar,
    })
    onClose()
  }

  // Calculate max date (today) and min date (10 years ago)
  const today = new Date().toISOString().split('T')[0]
  const minDate = new Date()
  minDate.setFullYear(minDate.getFullYear() - 10)
  const minDateStr = minDate.toISOString().split('T')[0]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        exit={{ y: 300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white rounded-t-3xl w-full max-w-lg p-6 pb-10"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-5" />
        <h2 className="font-bold text-lg text-gray-800 mb-5">
          {editChild ? 'Kind bearbeiten' : 'Kind hinzufügen'}
        </h2>

        {/* Avatar Selection */}
        <div className="mb-5">
          <label className="text-xs font-medium text-gray-500 mb-2 block">Avatar wählen</label>
          <div className="flex gap-2 flex-wrap">
            {AVATAR_EMOJIS.map(emoji => (
              <button
                key={emoji}
                onClick={() => setAvatar(emoji)}
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all ${
                  avatar === emoji
                    ? 'bg-tuki-mint border-2 border-tuki-rot scale-110'
                    : 'bg-gray-50 border border-gray-100'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="z.B. Mia"
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-tuki-mint focus:ring-2 focus:ring-tuki-mint/30"
          />
        </div>

        {/* Birth Date */}
        <div className="mb-6">
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">Geburtsdatum</label>
          <input
            type="date"
            value={birthDate}
            onChange={e => setBirthDate(e.target.value)}
            min={minDateStr}
            max={today}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-tuki-mint focus:ring-2 focus:ring-tuki-mint/30"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim() || !birthDate}
            className="flex-1 py-3 rounded-xl bg-tuki-rot text-white text-sm font-medium disabled:opacity-40 active:scale-95 transition-transform"
          >
            {editChild ? 'Speichern' : 'Hinzufügen'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ChildAgeLabel({ birthDate }: { birthDate: string }) {
  const birth = new Date(birthDate)
  const now = new Date()
  let years = now.getFullYear() - birth.getFullYear()
  const m = now.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) years--
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + now.getMonth() - birth.getMonth()

  if (years < 1) return <span>{months} Monate</span>
  if (years === 1) {
    const extraMonths = months - 12
    return <span>1 Jahr{extraMonths > 0 ? `, ${extraMonths} Mon.` : ''}</span>
  }
  return <span>{years} Jahre</span>
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const {
    tukiStars, completedActivities, completedRecipes, favorites, children,
    activeChildId, addChild, updateChild, removeChild, setActiveChild, getChildAge,
  } = useApp()
  const [showAddChild, setShowAddChild] = useState(false)
  const [editingChild, setEditingChild] = useState<ChildProfile | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

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

  const activeChild = children.find(c => c.id === activeChildId) || null

  const handleSaveChild = (child: ChildProfile) => {
    if (editingChild) {
      updateChild(child)
    } else {
      addChild(child)
    }
    setEditingChild(null)
  }

  const handleDeleteChild = (childId: string) => {
    removeChild(childId)
    setConfirmDelete(null)
  }

  return (
    <div className="pb-24">
      <Header title="Profil" />

      {/* Family Card with Active Child */}
      <div className="mx-4 mt-2 mb-6">
        <div className="bg-white rounded-3xl p-6 border border-gray-100 text-center">
          <div className="w-20 h-20 rounded-full gradient-mint flex items-center justify-center text-3xl mx-auto mb-3">
            {activeChild ? activeChild.avatarEmoji : '👨‍👩‍👧'}
          </div>
          <h2 className="font-bold text-lg text-gray-800">
            {activeChild ? activeChild.name : 'Unsere Tuki-Familie'}
          </h2>
          {activeChild && (
            <p className="text-gray-500 text-sm mt-1">
              <ChildAgeLabel birthDate={activeChild.birthDate} /> alt
            </p>
          )}
          {!activeChild && (
            <p className="text-gray-500 text-sm mt-1">Mitglied seit März 2026</p>
          )}

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

      {/* Children Section */}
      <div className="mx-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm text-gray-800">👶 Unsere Kinder</h3>
          <button
            onClick={() => { setEditingChild(null); setShowAddChild(true) }}
            className="flex items-center gap-1 text-xs font-medium text-tuki-rot bg-red-50 px-3 py-1.5 rounded-full active:scale-95 transition-transform"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Kind hinzufügen
          </button>
        </div>

        {children.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
            <span className="text-4xl block mb-3">👶</span>
            <p className="text-sm text-gray-600 font-medium">Noch keine Kinder hinzugefügt</p>
            <p className="text-xs text-gray-400 mt-1">Füge dein erstes Kind hinzu, um personalisierte Inhalte zu erhalten!</p>
            <button
              onClick={() => setShowAddChild(true)}
              className="mt-4 px-5 py-2.5 bg-tuki-rot text-white rounded-xl text-sm font-medium active:scale-95 transition-transform"
            >
              Erstes Kind hinzufügen
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {children.map(child => {
              const isActive = child.id === activeChildId
              return (
                <motion.div
                  key={child.id}
                  layout
                  className={`bg-white rounded-xl p-3.5 border flex items-center gap-3 ${
                    isActive ? 'border-tuki-rot/30 bg-red-50/30' : 'border-gray-100'
                  }`}
                >
                  <button
                    onClick={() => setActiveChild(child.id)}
                    className="flex items-center gap-3 flex-1 text-left"
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${
                      isActive ? 'bg-tuki-mint' : 'bg-gray-50'
                    }`}>
                      {child.avatarEmoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-800 truncate">{child.name}</p>
                        {isActive && (
                          <span className="text-[9px] bg-tuki-rot text-white px-1.5 py-0.5 rounded-full font-medium shrink-0">
                            Aktiv
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400">
                        <ChildAgeLabel birthDate={child.birthDate} />
                      </p>
                    </div>
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => { setEditingChild(child); setShowAddChild(true) }}
                      className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setConfirmDelete(child.id)}
                      className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {/* Level Progress */}
      <div className="mx-4 mb-6">
        <h3 className="font-semibold text-sm text-gray-800 mb-3">
          🏆 Entdecker-Level {activeChild ? `(${activeChild.name})` : ''}
        </h3>
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
          <h3 className="font-semibold text-sm text-gray-800 mb-3">
            ❤️ {activeChild ? `${activeChild.name}s Favoriten` : 'Meine Favoriten'}
          </h3>
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

      {/* Settings */}
      <div className="mx-4">
        <h3 className="font-semibold text-sm text-gray-800 mb-3">Einstellungen</h3>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {[
            { emoji: '🌐', label: 'Sprache', value: 'Deutsch' },
            { emoji: '🔔', label: 'Benachrichtigungen', value: 'An' },
            { emoji: '🎨', label: 'Erscheinungsbild', value: 'Hell' },
            { emoji: '📱', label: 'App-Version', value: '2.1.0' },
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
        <p className="text-[10px] text-gray-400">Tuki Family App v2.1</p>
        <p className="text-[10px] text-gray-300">mimodo AG · Schweiz</p>
      </div>

      {/* Add/Edit Child Modal */}
      <AnimatePresence>
        {showAddChild && (
          <AddChildModal
            onClose={() => { setShowAddChild(false); setEditingChild(null) }}
            onSave={handleSaveChild}
            editChild={editingChild}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-8"
            onClick={() => setConfirmDelete(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="font-bold text-gray-800 mb-2">Kind entfernen?</h3>
              <p className="text-sm text-gray-500 mb-5">
                Alle Favoriten und Fortschritte dieses Kindes werden gelöscht.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600"
                >
                  Abbrechen
                </button>
                <button
                  onClick={() => handleDeleteChild(confirmDelete)}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium active:scale-95 transition-transform"
                >
                  Entfernen
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
