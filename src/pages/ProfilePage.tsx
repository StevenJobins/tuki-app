import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { recipes } from '../data/recipes'
import { activities } from '../data/activities'

const AVATAR_OPTIONS = ['\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67', '\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC66', '\uD83D\uDC69\u200D\uD83D\uDC67', '\uD83D\uDC68\u200D\uD83D\uDC67', '\uD83D\uDC69\u200D\uD83D\uDC66', '\uD83D\uDC68\u200D\uD83D\uDC66', '\uD83C\uDFE0', '\uD83C\uDF3C']
const CHILD_EMOJIS = ['\uD83D\uDC76', '\uD83D\uDC67', '\uD83D\uDC66', '\uD83E\uDDD2', '\uD83D\uDC78', '\uD83E\uDD34']

const LEVELS = [
  { min: 0, name: 'Kleiner Entdecker', emoji: '\uD83C\uDF31' },
  { min: 10, name: 'Kuechenhelfer', emoji: '\uD83D\uDC69\u200D\uD83C\uDF73' },
  { min: 25, name: 'Nachwuchskoch', emoji: '\uD83C\uDF73' },
  { min: 50, name: 'Familien-Star', emoji: '\u2B50' },
  { min: 100, name: 'Kuechenchef', emoji: '\uD83C\uDFC6' },
]

function calcAge(birthDate: string): string {
  if (!birthDate) return ''
  const birth = new Date(birthDate)
  const now = new Date()
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + now.getMonth() - birth.getMonth()
  if (months < 24) return `${months} Monate`
  return `${Math.floor(months / 12)} Jahre`
}

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }

export default function ProfilePage() {
  const navigate = useNavigate()
  const { tukiStars, completedActivities, completedRecipes, favorites, children, addChild, removeChild } = useApp()
  const { user, profile, signOut, updateProfile } = useAuth()

  const [editingName, setEditingName] = useState(false)
  const [newName, setNewName] = useState(profile?.display_name || '')
  const [showAvatars, setShowAvatars] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  // Children form
  const [showAddChild, setShowAddChild] = useState(false)
  const [childName, setChildName] = useState('')
  const [childBirth, setChildBirth] = useState('')
  const [childEmoji, setChildEmoji] = useState('\uD83D\uDC76')
  const [confirmRemoveChild, setConfirmRemoveChild] = useState<string | null>(null)

  const favoriteRecipes = recipes.filter(r => favorites.includes(r.id))
  const favoriteActivities = activities.filter(a => favorites.includes(a.id))
  const totalFavorites = favoriteRecipes.length + favoriteActivities.length
  const totalCompleted = completedActivities.length + completedRecipes.length

  const handleSaveName = async () => {
    if (newName.trim()) await updateProfile({ display_name: newName.trim() })
    setEditingName(false)
  }

  const handleAvatarSelect = async (emoji: string) => {
    await updateProfile({ avatar_emoji: emoji })
    setShowAvatars(false)
  }

  const handleAddChild = async () => {
    if (!childName.trim()) return
    await addChild({ id: crypto.randomUUID(), name: childName.trim(), birthDate: childBirth, avatarEmoji: childEmoji })
    setChildName(''); setChildBirth(''); setChildEmoji('\uD83D\uDC76'); setShowAddChild(false)
  }

  const handleRemoveChild = async (id: string) => {
    await removeChild(id)
    setConfirmRemoveChild(null)
  }

  const handleLogout = async () => {
    await signOut()
    setShowLogoutConfirm(false)
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="pb-24">
      <Header title="Profil" />

      {/* Profile Card */}
      <motion.div variants={item} className="mx-4 mt-2 mb-5">
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm text-center">
          <motion.button whileTap={{ scale: 0.95 }}
            onClick={() => setShowAvatars(!showAvatars)}
            className="w-20 h-20 rounded-full gradient-mint flex items-center justify-center text-3xl mx-auto mb-3">
            {profile?.avatar_emoji || '\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67'}
          </motion.button>

          <AnimatePresence>
            {showAvatars && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-3">
                <div className="flex flex-wrap justify-center gap-2 py-2">
                  {AVATAR_OPTIONS.map(emoji => (
                    <motion.button key={emoji} whileTap={{ scale: 0.9 }}
                      onClick={() => handleAvatarSelect(emoji)}
                      className={`w-11 h-11 rounded-full flex items-center justify-center text-xl border-2 transition-colors ${
                        profile?.avatar_emoji === emoji ? 'border-tuki-rot bg-red-50' : 'border-gray-100 bg-white'
                      }`}>
                      {emoji}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {editingName ? (
            <div className="flex items-center gap-2 justify-center mb-1">
              <input type="text" value={newName} onChange={e => setNewName(e.target.value)}
                className="text-center font-bold text-lg text-gray-800 bg-gray-50 rounded-lg px-3 py-1 border border-gray-200 focus:outline-none focus:border-tuki-mint"
                autoFocus onKeyDown={e => e.key === 'Enter' && handleSaveName()} />
              <button onClick={handleSaveName} className="text-tuki-rot text-sm font-medium">OK</button>
            </div>
          ) : (
            <button onClick={() => { setNewName(profile?.display_name || ''); setEditingName(true) }}>
              <h2 className="font-bold text-lg text-gray-800">{profile?.display_name || 'Meine Familie'}</h2>
            </button>
          )}
          <p className="text-gray-400 text-sm mt-1">{user?.email}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-5">
            {[
              { value: tukiStars.total, label: 'Tuki-Sterne', bg: 'bg-yellow-50', color: 'text-yellow-600' },
              { value: totalCompleted, label: 'Abgeschlossen', bg: 'bg-green-50', color: 'text-green-600' },
              { value: totalFavorites, label: 'Favoriten', bg: 'bg-pink-50', color: 'text-pink-600' },
            ].map(stat => (
              <motion.div key={stat.label} whileHover={{ scale: 1.03 }} className={`${stat.bg} rounded-xl p-3`}>
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Children Section */}
      <motion.div variants={item} className="mx-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm text-gray-800">&#x1F476; Meine Kinder</h3>
          <button onClick={() => setShowAddChild(!showAddChild)}
            className="text-xs font-medium text-tuki-rot">
            {showAddChild ? 'Abbrechen' : '+ Hinzufuegen'}
          </button>
        </div>

        <AnimatePresence>
          {showAddChild && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-3">
              <div className="bg-white rounded-2xl p-4 border border-gray-100 space-y-3">
                <input type="text" value={childName} onChange={e => setChildName(e.target.value)}
                  placeholder="Name des Kindes" className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-tuki-mint" />
                <input type="date" value={childBirth} onChange={e => setChildBirth(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-tuki-mint" />
                <div className="flex gap-2">
                  {CHILD_EMOJIS.map(e => (
                    <button key={e} onClick={() => setChildEmoji(e)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-lg border-2 ${
                        childEmoji === e ? 'border-tuki-rot bg-red-50' : 'border-gray-100'
                      }`}>{e}</button>
                  ))}
                </div>
                <button onClick={handleAddChild} disabled={!childName.trim()}
                  className="w-full py-2.5 gradient-rot text-white font-semibold rounded-xl text-sm disabled:opacity-50">
                  Kind hinzufuegen
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {children.length === 0 && !showAddChild ? (
          <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
            <p className="text-gray-400 text-sm">Noch keine Kinder hinzugefuegt</p>
            <button onClick={() => setShowAddChild(true)}
              className="mt-2 text-xs font-medium text-tuki-rot">Jetzt hinzufuegen</button>
          </div>
        ) : (
          <div className="space-y-2">
            {children.map(child => (
              <motion.div key={child.id} layout className="bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-tuki-mint-bg flex items-center justify-center text-lg">{child.avatarEmoji}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{child.name}</p>
                  {child.birthDate && <p className="text-[10px] text-gray-400">{calcAge(child.birthDate)}</p>}
                </div>
                <button onClick={() => setConfirmRemoveChild(child.id)} className="text-gray-300 text-xs">&#x2715;</button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Level Progress */}
      <motion.div variants={item} className="mx-4 mb-5">
        <h3 className="font-semibold text-sm text-gray-800 mb-3">&#x1F3C6; Entdecker-Level</h3>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 space-y-3">
          {LEVELS.map((level, i) => {
            const isActive = tukiStars.level === i
            const isDone = tukiStars.level > i
            return (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                  isDone ? 'bg-green-100' : isActive ? 'bg-yellow-100' : 'bg-gray-50'
                }`}>{isDone ? '\u2705' : level.emoji}</div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isActive ? 'text-tuki-rot' : isDone ? 'text-green-700' : 'text-gray-400'}`}>{level.name}</p>
                  <p className="text-[10px] text-gray-400">{level.min} Sterne</p>
                </div>
                {isActive && <span className="text-[10px] bg-tuki-rot text-white px-2 py-0.5 rounded-full font-medium">Aktuell</span>}
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Favorites */}
      {totalFavorites > 0 && (
        <motion.div variants={item} className="mx-4 mb-5">
          <h3 className="font-semibold text-sm text-gray-800 mb-3">&#x2764;&#xFE0F; Meine Favoriten</h3>
          <div className="space-y-2">
            {favoriteRecipes.map(r => (
              <motion.div key={r.id} whileTap={{ scale: 0.98 }} onClick={() => navigate(`/rezept/${r.id}`)}
                className="bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-3 cursor-pointer">
                <span className="text-xl">{r.emoji}</span>
                <div className="flex-1"><p className="text-sm font-medium text-gray-800">{r.title}</p><p className="text-[10px] text-gray-400">Rezept</p></div>
              </motion.div>
            ))}
            {favoriteActivities.map(a => (
              <motion.div key={a.id} whileTap={{ scale: 0.98 }} onClick={() => navigate(`/aktivitaet/${a.id}`)}
                className="bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-3 cursor-pointer">
                <span className="text-xl">{a.emoji}</span>
                <div className="flex-1"><p className="text-sm font-medium text-gray-800">{a.title}</p><p className="text-[10px] text-gray-400">Aktivitaet</p></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Logout */}
      <motion.div variants={item} className="mx-4 mt-6 mb-4">
        <button onClick={() => setShowLogoutConfirm(true)}
          className="w-full py-3 bg-white border border-red-200 text-red-500 font-medium rounded-xl text-sm active:scale-[0.98] transition-transform">
          Abmelden
        </button>
      </motion.div>

      {/* Footer */}
      <div className="text-center mt-4 mb-4">
        <div className="w-8 h-8 rounded-lg gradient-rot flex items-center justify-center mx-auto mb-2">
          <span className="text-white font-bold text-sm">T</span>
        </div>
        <p className="text-[10px] text-gray-400">Tuki Family App v2.1</p>
        <p className="text-[10px] text-gray-300">mimodo AG &middot; Schweiz</p>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
            onClick={() => setShowLogoutConfirm(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-6 w-full max-w-xs text-center" onClick={e => e.stopPropagation()}>
              <p className="font-semibold text-gray-800 mb-2">Wirklich abmelden?</p>
              <p className="text-sm text-gray-500 mb-4">Deine Daten bleiben gespeichert.</p>
              <div className="flex gap-2">
                <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-2.5 bg-gray-100 rounded-xl text-sm font-medium text-gray-600">Abbrechen</button>
                <button onClick={handleLogout} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium">Abmelden</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Remove Child Confirmation */}
      <AnimatePresence>
        {confirmRemoveChild && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
            onClick={() => setConfirmRemoveChild(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-6 w-full max-w-xs text-center" onClick={e => e.stopPropagation()}>
              <p className="font-semibold text-gray-800 mb-2">Kind entfernen?</p>
              <p className="text-sm text-gray-500 mb-4">Dieses Kinderprofil wird geloescht.</p>
              <div className="flex gap-2">
                <button onClick={() => setConfirmRemoveChild(null)} className="flex-1 py-2.5 bg-gray-100 rounded-xl text-sm font-medium text-gray-600">Abbrechen</button>
                <button onClick={() => handleRemoveChild(confirmRemoveChild)} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium">Entfernen</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
