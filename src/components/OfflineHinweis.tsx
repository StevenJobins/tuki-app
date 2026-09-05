import { useEffect, useState } from 'react'
import { OFFLINE_EVENT, isOffline } from '../lib/native'

/**
 * Schmaler Balken, wenn keine Verbindung besteht. Die App bleibt benutzbar:
 * Rezepte, Aktivitaeten und Meilensteine liegen lokal vor.
 */
export default function OfflineHinweis() {
  const [offline, setOffline] = useState(isOffline())

  useEffect(() => {
    const onChange = (e: Event) => setOffline(!!(e as CustomEvent).detail)
    window.addEventListener(OFFLINE_EVENT, onChange)
    return () => window.removeEventListener(OFFLINE_EVENT, onChange)
  }, [])

  if (!offline) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gray-800 text-white text-xs text-center py-1.5 px-3">
      Offline. Du siehst gespeicherte Inhalte, Community und Sterne kommen zurück, sobald du wieder online bist.
    </div>
  )
}
