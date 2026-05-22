import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { useNotifications } from '../context/NotificationContext'
import { useTranslation } from '../i18n/useTranslation'

interface HeaderProps {
  title?: string
  showBack?: boolean
  transparent?: boolean
}

// Format relative time from ISO timestamp
function formatTimeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'jetzt'
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h`
  const days = Math.floor(hours / 24)
  return `${days}d`
}

export default function Header({ title, showBack, transparent }: HeaderProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { tukiStars, getActiveChild } = useApp()
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const [showNotifications, setShowNotifications] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const isHome = location.pathname === '/'
  const activeChild = getActiveChild()

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowNotifications(false)
      }
    }
    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showNotifications])

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
            className="w-9 h-9 rounded-full bg-white/80 dark:bg-gray-700 flex items-center justify-center shadow-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        {isHome ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-rot flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-rubik font-semibold text-lg text-gray-800 dark:text-gray-100">
              {t.header.title}
            </span>
          </div>
        ) : (
          <h1 className="font-rubik font-semibold text-lg text-gray-800 dark:text-gray-100">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Active child badge */}
        {activeChild && !isHome && (
          <div className="flex items-center gap-1 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded-full border border-purple-200 dark:border-purple-700">
            <span className="text-sm">{activeChild.avatarEmoji}</span>
            <span className="text-[10px] font-medium text-purple-700 dark:text-purple-300 max-w-[60px] truncate">{activeChild.name}</span>
          </div>
        )}

        {/* Notification bell */}
        <div className="relative" ref={panelRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-9 h-9 rounded-full bg-white/80 dark:bg-gray-700 flex items-center justify-center shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            aria-label={t.notifications?.title || 'Notifications'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-300">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification dropdown panel */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-11 w-80 max-h-96 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
              >
                {/* Panel header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-100">
                    {t.notifications?.title || 'Benachrichtigungen'}
                  </h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-[11px] text-tuki-rot font-medium hover:underline"
                    >
                      {t.notifications?.markAllRead || 'Alle gelesen'}
                    </button>
                  )}
                </div>

                {/* Notification list */}
                <div className="overflow-y-auto max-h-72">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center">
                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        {t.notifications?.empty || 'Keine neuen Benachrichtigungen'}
                      </p>
                    </div>
                  ) : (
                    notifications.map(notif => (
                      <button
                        key={notif.id}
                        onClick={() => markAsRead(notif.id)}
                        className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-50 dark:border-gray-700/50 ${
                          !notif.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                        }`}
                      >
                        <span className="text-lg mt-0.5 flex-shrink-0">{notif.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs leading-relaxed ${
                            !notif.read
                              ? 'text-gray-800 dark:text-gray-100 font-medium'
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {notif.message}
                          </p>
                          <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 block">
                            {formatTimeAgo(notif.createdAt)}
                          </span>
                        </div>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-tuki-rot mt-1.5 flex-shrink-0" />
                        )}
                      </button>
                    ))
                  )}
                </div>

                {/* Panel footer */}
                <div className="px-4 py-2.5 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800">
                  <p className="text-[10px] text-center text-gray-400 dark:text-gray-500">
                    {t.notifications?.footer || 'Das sind deine neuesten Updates'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tuki Stars badge */}
        <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 px-2.5 py-1 rounded-full border border-yellow-200 dark:border-yellow-700">
          <span className="text-sm">⭐</span>
          <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-300">{tukiStars.total}</span>
        </div>
      </div>
    </header>
  )
}
