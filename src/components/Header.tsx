import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

interface HeaderProps {
  title?: string
  showBack?: boolean
  transparent?: boolean
}

export default function Header({ title, showBack, transparent }: HeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { tukiStars } = useApp()

  const isHome = location.pathname === '/'

  return (
    <header
      className={`sticky top-0 z-40 px-4 py-3 flex items-center justify-between ${
        transparent ? '' : 'glass border-b border-gray-100/50'
      }`}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center shadow-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        {isHome ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-rot flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-rubik font-semibold text-lg text-gray-800">
              Tuki <span className="text-tuki-rot">Family</span>
            </span>
          </div>
        ) : (
          <h1 className="font-rubik font-semibold text-lg text-gray-800">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Tuki Stars badge */}
        <div className="flex items-center gap-1 bg-yellow-50 px-2.5 py-1 rounded-full border border-yellow-200">
          <span className="text-sm">⭐</span>
          <span className="text-xs font-semibold text-yellow-700">{tukiStars.total}</span>
        </div>
      </div>
    </header>
  )
}
