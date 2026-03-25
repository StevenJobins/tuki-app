import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AVATAR_OPTIONS = ['👨‍👩‍👧', '👨‍👩‍👦', '👩‍👧', '👨‍👧', '👩‍👦', '👨‍👦', '👩‍👧‍👦', '👨‍👩‍👧‍👦', '🏠', '🌻']

const CHILD_AGE_OPTIONS = [
  { label: '0–1 Jahr', value: '0-1' },
  { label: '1–2 Jahre', value: '1-2' },
  { label: '2–3 Jahre', value: '2-3' },
  { label: '3–5 Jahre', value: '3-5' },
  { label: '5–8 Jahre', value: '5-8' },
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { updateProfile } = useAuth()
  const [step, setStep] = useState(0)
  const [familyName, setFamilyName] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('👨‍👩‍👧')
  const [selectedAge, setSelectedAge] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  const nextStep = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setStep(s => s + 1)
      setIsAnimating(false)
    }, 300)
  }

  const handleComplete = async () => {
    await updateProfile({
      display_name: familyName.trim() || 'Meine Familie',
      avatar_emoji: selectedAvatar,
    })
    localStorage.setItem('tuki_child_age', selectedAge)
    localStorage.setItem('tuki_onboarded', 'true')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-green-50 flex flex-col items-center justify-center px-6">
      {/* Progress Dots */}
      <div className="flex gap-2 mb-8">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === step ? 'w-8 bg-tuki-rot' : i < step ? 'w-2 bg-tuki-rot opacity-50' : 'w-2 bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Step Content */}
      <div
        className={`w-full max-w-sm transition-all duration-300 ${
          isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        {step === 0 && (
          <div className="text-center">
            {/* Logo */}
            <div className="w-20 h-20 rounded-2xl gradient-rot flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white font-bold text-3xl">T</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Willkommen bei Tuki</h1>
            <p className="text-gray-500 mb-2">Die Familien-App, die Kochen, Spielen und Lernen verbindet.</p>
            <p className="text-sm text-gray-400 mb-8">Entdecke altersgerechte Rezepte und Aktivitaeten fuer euren Familienalltag.</p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100">
                <span className="text-2xl">🍳</span>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800">25+ Kinderrezepte</p>
                  <p className="text-[10px] text-gray-400">Einfach, gesund & kindertauglich</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100">
                <span className="text-2xl">🎯</span>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800">25+ Aktivitaeten</p>
                  <p className="text-[10px] text-gray-400">Spielerisch foerdern & Spass haben</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100">
                <span className="text-2xl">⭐</span>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800">Tuki-Sterne sammeln</p>
                  <p className="text-[10px] text-gray-400">Motivation durch Belohnungssystem</p>
                </div>
              </div>
            </div>

            <button
              onClick={nextStep}
              className="w-full py-4 gradient-rot text-white font-semibold rounded-2xl text-base shadow-lg active:scale-[0.98] transition-transform"
            >
              Los geht's
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="text-center">
            <div className="text-5xl mb-4">{selectedAvatar}</div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Wer seid ihr?</h2>
            <p className="text-sm text-gray-500 mb-6">Waehlt euer Familien-Emoji und gebt euch einen Namen.</p>

            {/* Avatar Grid */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {AVATAR_OPTIONS.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => setSelectedAvatar(emoji)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 transition-all duration-200 ${
                    selectedAvatar === emoji
                      ? 'border-tuki-rot bg-red-50 scale-110'
                      : 'border-gray-100 bg-white'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Family Name */}
            <input
              type="text"
              placeholder="z.B. Familie Mueller"
              value={familyName}
              onChange={e => setFamilyName(e.target.value)}
              className="w-full text-center font-medium text-gray-800 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus:outline-none focus:border-tuki-mint mb-6"
            />

            <button
              onClick={nextStep}
              className="w-full py-4 gradient-rot text-white font-semibold rounded-2xl text-base shadow-lg active:scale-[0.98] transition-transform"
            >
              Weiter
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <div className="text-5xl mb-4">🎂</div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Wie alt ist euer Kind?</h2>
            <p className="text-sm text-gray-500 mb-6">So zeigen wir euch passende Inhalte.</p>

            <div className="space-y-2 mb-8">
              {CHILD_AGE_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedAge(opt.value)}
                  className={`w-full py-3 px-4 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
                    selectedAge === opt.value
                      ? 'border-tuki-rot bg-red-50 text-tuki-rot'
                      : 'border-gray-100 bg-white text-gray-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleComplete}
              disabled={!selectedAge}
              className={`w-full py-4 font-semibold rounded-2xl text-base shadow-lg active:scale-[0.98] transition-all duration-200 ${
                selectedAge
                  ? 'gradient-rot text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Tuki starten 🚀
            </button>

            <button
              onClick={handleComplete}
              className="mt-3 text-sm text-gray-400 underline"
            >
              Ueberspringen
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="text-[10px] text-gray-300 mt-8">mimodo AG · Schweiz</p>
    </div>
  )
}
