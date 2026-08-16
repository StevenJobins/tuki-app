import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useApp } from '../context/AppContext'
import { supabase } from '../lib/supabase'

export default function LoginPage() {
  const { signIn, signUp } = useAuth()
  const { isOnboarded, children } = useApp()
  const navigate = useNavigate()
  // Wer schon ohne Konto unterwegs war, will hier sichern, nicht sich anmelden.
  const alsGast = isOnboarded && children.length > 0
  const [isRegister, setIsRegister] = useState(alsGast)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [showResend, setShowResend] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (isRegister) {
      if (!displayName.trim()) {
        setError('Bitte gib einen Familiennamen ein')
        setLoading(false)
        return
      }
      const { error } = await signUp(email, password, displayName.trim())
      if (error) {
        setError(error)
      } else {
        setSuccess('Konto erstellt! Bitte prüfe deine E-Mails zur Bestätigung.')
      }
    } else {
      const { error } = await signIn(email, password)
      if (!error && alsGast) navigate('/')
      if (error) {
        if (error === 'EMAIL_NOT_CONFIRMED') {
          setError('Deine E-Mail-Adresse ist noch nicht bestätigt. Bitte prüfe dein Postfach (auch Spam-Ordner).')
          setShowResend(true)
        } else {
          setError(error === 'Invalid login credentials' ? 'E-Mail oder Passwort falsch. Falls du dich gerade registriert hast, bestätige zuerst deine E-Mail.' : error)
        }
      }
    }
    setLoading(false)
  }

  const handleResend = async () => {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.resend({ type: 'signup', email, options: { emailRedirectTo: window.location.origin + '/' } })
    if (error) {
      setError('Fehler beim Senden: ' + error.message)
    } else {
      setSuccess('Bestätigungsmail erneut gesendet! Prüfe auch deinen Spam-Ordner.')
      setShowResend(false)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-tuki-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-rot flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
          <h1 className="font-rubik font-bold text-2xl text-gray-800">
            Tuki <span className="text-tuki-rot">Family</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            {isRegister ? 'Erstelle dein Familienkonto' : 'Willkommen zurück!'}
          </p>
          {alsGast && (
            <p className="text-xs text-gray-400 mt-3 leading-relaxed">
              Deine bisherigen Angaben gehen nicht verloren. Sie werden mit dem
              Konto verknüpft, sobald du angemeldet bist.
            </p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Familienname</label>
              <input
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="z.B. Familie Müller"
                className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-tuki-mint focus:ring-2 focus:ring-tuki-mint/30"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">E-Mail</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="deine@email.ch"
              required
              className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-tuki-mint focus:ring-2 focus:ring-tuki-mint/30"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Passwort</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={isRegister ? 'Min. 6 Zeichen' : 'Dein Passwort'}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-tuki-mint focus:ring-2 focus:ring-tuki-mint/30"
            />
          </div>

          {showResend && (
            <button
              type="button"
              onClick={handleResend}
              disabled={loading}
              className="w-full py-2 px-4 text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-colors"
            >
              Bestätigungsmail erneut senden
            </button>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="text-red-600 text-xs">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <p className="text-green-600 text-xs">{success}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 gradient-rot text-white font-semibold rounded-xl text-sm shadow-lg disabled:opacity-50 active:scale-[0.98] transition-transform"
          >
            {loading ? '...' : isRegister ? 'Konto erstellen' : 'Anmelden'}
          </button>
        </form>

        {/* Toggle */}
        <div className="text-center mt-6">
          <button
            onClick={() => { setIsRegister(!isRegister); setError(''); setSuccess('') }}
            className="text-sm text-gray-500"
          >
            {isRegister ? (
              <>Bereits ein Konto? <span className="text-tuki-rot font-medium">Anmelden</span></>
            ) : (
              <>Noch kein Konto? <span className="text-tuki-rot font-medium">Registrieren</span></>
            )}
          </button>
        </div>

        {alsGast && (
          <div className="text-center mt-4">
            <button onClick={() => navigate('/')} className="text-sm text-gray-400">
              Später, erst mal weiterschauen
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
