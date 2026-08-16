import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

/**
 * Hinweisleiste fuer Leute ohne Konto.
 *
 * Bewusst zurueckhaltend: die App funktioniert ohne Anmeldung vollstaendig,
 * das Konto ist ein Angebot (Geraetewechsel, Community), keine Huerde.
 * Wer sie wegklickt, sieht sie in dieser Sitzung nicht wieder.
 */
export default function GastHinweis() {
  const [weg, setWeg] = useState(() => sessionStorage.getItem('tuki-gasthinweis-weg') === '1')
  const navigate = useNavigate()
  const { pathname } = useLocation()

  if (weg || pathname === '/anmelden') return null

  const schliessen = () => {
    sessionStorage.setItem('tuki-gasthinweis-weg', '1')
    setWeg(true)
  }

  return (
    <div className="fixed bottom-16 lg:bottom-4 left-0 right-0 z-40 px-3 pb-2 pointer-events-none">
      <div className="max-w-lg lg:max-w-md mx-auto lg:mx-0 bg-white rounded-2xl shadow-lg border border-gray-100 p-3 flex items-center gap-3 pointer-events-auto">
        <span className="text-xl shrink-0">💾</span>
        <p className="text-xs text-gray-600 leading-snug flex-1">
          Deine Angaben liegen nur auf diesem Gerät. Mit einem Konto bleiben sie erhalten.
        </p>
        <button
          onClick={() => navigate('/anmelden')}
          className="shrink-0 px-3 py-2 rounded-xl text-xs font-semibold text-white gradient-rot"
        >
          Sichern
        </button>
        <button
          onClick={schliessen}
          aria-label="Hinweis ausblenden"
          className="shrink-0 w-7 h-7 rounded-lg bg-gray-100 text-gray-400 text-sm flex items-center justify-center"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
