import { useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const navItems = [
  { path: '/', label: 'Home', emoji: '🏠' },
  { path: '/rezepte', label: 'Rezepte', emoji: '🍳' },
  { path: '/aktivitaeten', label: 'Aktivitäten', emoji: '🎮' },
  { path: '/favoriten', label: 'Favoriten', emoji: '❤️' },
  { path: '/wochenplan', label: 'Wochenplan', emoji: '📅' },
  { path: '/zutaten-check', label: 'Kühlschrank', emoji: '🧱' },
  { path: '/entwicklung', label: 'Entwicklung', emoji: '📈' },
  { path: '/community', label: 'Community', emoji: '👨‍👩‍👧' },
  { path: '/sterne-shop', label: 'Sterne-Shop', emoji: '⭐' },
  { path: '/profil', label: 'Profil', emoji: '🤗' },
]

export default function SideNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { tukiStars } = useApp()
  const basePath = (import.meta as any).env?.BASE_URL || '/tuki-app/'

  return (
    <nav className="hidden md:flex flex-col w-64 min-h-screen bg-white border-r border-gray-100 p-4 shrink-0 sticky top-0 h-screen overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 py-2 mb-6">
        <div className="w-9 h-9 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center p-1.5">
          <img src={basePath + 'tuki-logo.svg'} alt="Tuki" className="h-full w-auto" />
        </div>
        <span className="font-rubik font-semibold text-lg text-gray-800">
          Tuki <span className="text-tuki-rot">Family</span>
        </span>
      </div>

      {/* Nav items */}
      <div className="flex flex-col gap-1 flex-1">
        {navItems.map(item => {
          const active = item.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.path)
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                active
                  ? 'bg-tuki-mint-bg text-tuki-rot-dark'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-tuki-rot" />
              )}
              <span className="text-lg">{item.emoji}</span>
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>

      {/* Stars badge at bottom */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-3 border border-yellow-200/50">
          <div className="flex items-center gap-2 mb-2">
            <span>{'⭐'}</span>
            <span className="text-sm font-semibold text-gray-700">{tukiStars.total} Sterne</span>
          </div>
          <div className="w-full h-1.5 bg-yellow-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all"
              style={{ width: `${Math.min((tukiStars.total / 100) * 100, 100)}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-500 mt-1">{tukiStars.levelName}</p>
        </div>
      </div>
    </nav>
  )
}
