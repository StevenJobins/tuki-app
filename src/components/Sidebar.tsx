import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { useTranslation } from '../i18n/useTranslation'

export default function Sidebar() {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { tukiStars, completedActivities, completedRecipes, getActiveChild } = useApp()
  const activeChild = getActiveChild()

  const navItems = [
    { path: '/', label: t.nav.home, emoji: '🏠' },
    { path: '/rezepte', label: t.nav.recipes, emoji: '🍳' },
    { path: '/aktivitaeten', label: t.nav.activities, emoji: '🎮' },
    { path: '/community', label: t.nav.community, emoji: '👨‍👩‍👧' },
    { path: '/favoriten', label: 'Favoriten', emoji: '❤️' },
  ]

  const extraItems = [
    { path: '/wochenplan', label: 'Wochenplan', emoji: '📅' },
    { path: '/zutaten-check', label: 'Kühlschrank-Check', emoji: '🧱' },
    { path: '/entwicklung', label: 'Entwicklung', emoji: '📈' },
  ]

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <aside className="hidden lg:flex flex-col w-60 xl:w-64 h-screen sticky top-0 bg-white border-r border-gray-100 shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl gradient-rot flex items-center justify-center">
          <span className="text-white font-bold text-base">T</span>
        </div>
        <span className="font-rubik font-bold text-lg text-gray-800">Tuki Family</span>
      </div>

      {/* Active Child Card */}
      {activeChild && (
        <div className="mx-4 mb-4 bg-tuki-cream rounded-xl p-3 border border-gray-100">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{activeChild.avatarEmoji}</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">{activeChild.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-yellow-600 font-medium">{'⭐'} {tukiStars.total}</span>
                <span className="text-gray-300">{'|'}</span>
                <span className="text-xs text-green-600">{'✅'} {completedActivities.length + completedRecipes.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const active = isActive(item.path)
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative ${
                active
                  ? 'bg-tuki-rot/10 text-tuki-rot'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              {active && (
                <motion.div
                  layoutId="sidebarIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-tuki-rot"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className="text-base">{item.emoji}</span>
              <span>{item.label}</span>
            </button>
          )
        })}

        {/* Divider */}
        <div className="border-t border-gray-100 my-3" />

        {/* Extra items */}
        {extraItems.map(item => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all"
          >
            <span className="text-base">{item.emoji}</span>
            <span>{item.label}</span>
          </button>
        ))}

        {/* Divider */}
        <div className="border-t border-gray-100 my-3" />

        {/* Profil */}
        <button
          onClick={() => navigate('/profil')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative ${
            isActive('/profil')
              ? 'bg-tuki-rot/10 text-tuki-rot'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
          }`}
        >
          {isActive('/profil') && (
            <motion.div
              layoutId="sidebarIndicator"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-tuki-rot"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span className="text-base">{'🤗'}</span>
          <span>{t.nav.profile}</span>
        </button>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gradient-rot flex items-center justify-center">
            <span className="text-white font-bold text-xs">T</span>
          </div>
          <div>
            <p className="text-[10px] text-gray-400">Tuki Family App v2.1</p>
            <p className="text-[10px] text-gray-300">mimodo AG</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
