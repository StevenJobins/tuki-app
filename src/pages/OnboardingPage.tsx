import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AVATAR_OPTIONS = ['👨‍👩‍👧', '👨‍👩‍👦', '👩‍👧', '👨‍👧', '👩‍👦', '👨‍👦', '👩‍👧‍👦', '👨‍👩‍👧‍👦', '🏠', '🌻']
const AGE_OPTIONS = ['0–1 Jahr', '1–2 Jahre', '2–3 Jahre', '3–5 Jahre', '5–8 Jahre']

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0])
  const [familyName, setFamilyName] = useState('')
  const [selectedAge, setSelectedAge] = useState('')
  const navigate = useNavigate()
  const { updateProfile } = useAuth()

  const handleComplete = async () => {
    try {
      await updateProfile({
        display_name: familyName.trim() || 'Meine Familie',
        avatar_emoji: selectedAvatar,
      })
    } catch (e) {
      console.log('Profile update skipped (no auth)')
    }
    localStorage.setItem('tuki_child_age', selectedAge)
    localStorage.setItem('tuki_onboarded', 'true')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-green-50 flex flex-col items-center justify-center p-6">
      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        {[0, 1, 2].map(i => (
          <div key={i} className={`h-2 rounded-full transition-all ${i === step ? 'w-8 bg-tuki-rot' : 'w-2 bg-gray-300'}`} />
        ))}
      </div>

      {step === 0 && (
        <div className="text-center max-w-sm animate-fadeIn">
          <div className="w-20 h-20 rounded-2xl gradient-rot flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl text-white font-bold">T</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Willkommen bei Tuki</h1>
          <p className="text-gray-500 mb-2">Die Familien-App, die Kochen, Spielen und Lernen verbindet.</p>
          <p className="text-gray-400 text-sm mb-8">Entdecke altersgerechte Rezepte und Aktivitaeten fuer euren Familienalltag.</p>

          <div className="space-y-3 mb-8">
            <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <span className="text-2xl">🍳</span>
              <div className="text-left">
                <p className="font-semibold text-gray-800">25+ Kinderrezepte</p>
                <p className="text-xs text-gray-500">Einfach, gesund & kindertauglich</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <span className="text-2xl">🎨</span>
              <div className="text-left">
                <p className="font-semibold text-gray-800">25+ Aktivitaeten</p>
                <p className="text-xs text-gray-500">Spielerisch foerdern & Spass haben</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <span className="text-2xl">⭐</span>
              <div className="text-left">
                <p className="font-semibold text-gray-800">Tuki-Sterne sammeln</p>
                <p className="text-xs text-gray-500">Motivation durch Belohnungssystem</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep(1)}
            className="w-full py-4 rounded-2xl gradient-rot text-white font-semibold text-lg shadow-lg hover:opacity-90 transition"
          >
            Los geht's
          </button>
          <p className="text-gray-300 text-xs mt-4">mimodo AG · Schweiz</p>
        </div>
      )}

      {step === 1 && (
        <div className="text-center max-w-sm animate-fadeIn">
          <div className="text-6xl mb-4">{selectedAvatar}</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Wer seid ihr?</h2>
          <p className="text-gray-500 text-sm mb-6">Waehlt euer Familien-Emoji und gebt euch einen Namen.</p>

          <div className="grid grid-cols-5 gap-3 mb-6">
            {AVATAR_OPTIONS.map(avatar => (
              <button
                key={avatar}
                onClick={() => setSelectedAvatar(avatar)}
                className={`text-2xl p-2 rounded-xl transition ${selectedAvatar === avatar ? 'bg-red-100 ring-2 ring-tuki-rot' : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                {avatar}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={familyName}
            onChange={e => setFamilyName(e.target.value)}
            placeholder="z.B. Familie Mueller"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 mb-6 focus:outline-none focus:ring-2 focus:ring-tuki-rot"
          />

          <button
            onClick={() => setStep(2)}
            className="w-full py-4 rounded-2xl gradient-rot text-white font-semibold text-lg shadow-lg hover:opacity-90 transition"
          >
            Weiter
          </button>
          <p className="text-gray-300 text-xs mt-4">mimodo AG · Schweiz</p>
        </div>
      )}

      {step === 2 && (
        <div className="text-center max-w-sm animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Wie alt ist euer Kind?</h2>
          <p className="text-gray-500 text-sm mb-6">So zeigen wir euch passende Inhalte.</p>

          <div className="space-y-3 mb-8">
            {AGE_OPTIONS.map(age => (
              <button
                key={age}
                onClick={() => setSelectedAge(age)}
                className={`w-full py-3 px-4 rounded-xl text-left font-medium transition ${selectedAge === age ? 'bg-red-100 text-tuki-rot ring-2 ring-tuki-rot' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
              >
                {age}
              </button>
            ))}
          </div>

          <button
            onClick={handleComplete}
            className="w-full py-4 rounded-2xl gradient-rot text-white font-semibold text-lg shadow-lg hover:opacity-90 transition"
          >
            Tuki starten 🚀
          </button>
          <button
            onClick={handleComplete}
            className="w-full py-3 text-gray-400 text-sm mt-2 hover:text-gray-600 transition"
          >
            Ueberspringen
          </button>
          <p className="text-gray-300 text-xs mt-4">mimodo AG · Schweiz</p>
        </div>
      )}
    </div>
  )
}
