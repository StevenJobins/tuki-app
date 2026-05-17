import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '../i18n/useTranslation'

function BottomNav() {
  const { t } = useTranslation()
  const [showMore, setShowMore] = useState(false)

  const navItems = [
    { path: '/', label: t.nav.home, icon: 'home' },
    { path: '/rezepte', label: t.nav.recipes, icon: 'recipe' },
    { path: '/aktivitaeten', label: t.nav.activities, icon: 'activity' },
    { path: '/community', label: t.nav.community, icon: 'community' },
  ]

  const moreItems = [
    { path: '/wochenplan', label: 'Wochenplan', emoji: '📅' },
    { path: '/zutaten-check', label: 'K\u00FChlschrank-Check', emoji: '🧊' },
    { path: '/entwicklung', label: 'Entwicklung', emoji: '📊' },
    { path: '/profil', label: t.nav.profile, emoji: '👤' },
  ]

  const morePaths = moreItems.map(i => i.path)

  function NavIcon({ icon, active }: { icon: string; active: boolean }) {
    const color = active ? '#8F5652' : '#9CA3AF'
    const icons: Record<string, JSX.Element> = {
      home: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" fill={active ? '#8F565220' : 'none'} />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      recipe: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10" fill={active ? '#8F565220' : 'none'} />
          <path d="M15 2a6 6 0 016 6" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
      activity: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" fill={active ? '#8F565220' : 'none'} />
          <path d="M8 12l2 2 4-4" />
        </svg>
      ),
      community: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" fill={active ? '#8F565220' : 'none'} />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
      more: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      ),
    }
    return icons[icon] || null
  }

  const location = useLocation()
  const navigate = useNavigate()

  const hideOn = ['/rezept/', '/aktivitaet/']
  if (hideOn.some(p => location.pathname.includes(p))) return null

  const isMoreActive = morePaths.some(p => location.pathname.startsWith(p))

  return (
    <>
      {/* More Menu Overlay */}
      <AnimatePresence>
        {showMore && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40 lg:hidden"
              onClick={() => setShowMore(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="fixed bottom-16 left-0 right-0 z-40 bg-white rounded-t-2xl shadow-xl safe-bottom lg:hidden"
            >
              <div className="p-4 pb-2">
                <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
                {moreItems.map(item => {
                  const active = location.pathname === item.path
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path)
                        setShowMore(false)
                      }}
                      className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-left ${active ? 'bg-tuki-cream text-tuki-rot font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      <span className="text-xl">{item.emoji}</span>
                      <span className="text-base">{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-gray-100 safe-bottom lg:hidden">
        <div className="max-w-lg mx-auto flex justify-around items-center h-16 px-2">
          {navItems.map(item => {
            const active = item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path)
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-0.5 py-1 px-3 relative"
              >
                {active && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-tuki-rot"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <NavIcon icon={item.icon} active={active} />
                <span className={`text-[10px] font-medium ${active ? 'text-tuki-rot' : 'text-gray-400'}`}>
                  {item.label}
                </span>
              </button>
            )
          })}
          {/* More Button */}
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex flex-col items-center gap-0.5 py-1 px-3 relative"
          >
            {isMoreActive && !showMore && (
              <motion.div
                layoutId="navIndicator"
                className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-tuki-rot"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <NavIcon icon="more" active={isMoreActive || showMore} />
            <span className={`text-[10px] font-medium ${isMoreActive || showMore ? 'text-tuki-rot' : 'text-gray-400'}`}>
              Mehr
            </span>
          </button>
        </div>
      </nav>
    </>
  )
}

export default BottomNav
