import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  if (!deferredPrompt || dismissed) return null

  const handleInstall = async () => {
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
    }
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl gradient-rot flex items-center justify-center shrink-0">
          <span className="text-white text-2xl font-bold">T</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-800">Tuki installieren</p>
          <p className="text-xs text-gray-500 mt-0.5">Schneller Zugriff vom Homescreen</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setDismissed(true)}
            className="text-xs text-gray-400 px-2 py-1.5"
          >
            Sp{'\u00e4'}ter
          </button>
          <button
            onClick={handleInstall}
            className="text-xs font-semibold text-white bg-tuki-rot px-3 py-1.5 rounded-xl"
          >
            Installieren
          </button>
        </div>
      </div>
    </div>
  )
}
