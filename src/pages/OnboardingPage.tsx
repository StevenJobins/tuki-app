import { useState } from 'react'
import { useApp } from '../context/AppContext'

const AVATAR_EMOJIS = ['ð¶', 'ð§', 'ð¦', 'ð§', 'ð¸', 'ð¤´', 'ð¦', 'ð»', 'ð', 'ð¦', 'ð°', 'ð¦']

export default function OnboardingPage() {
  const { addChild, setOnboarded } = useApp()
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [avatarEmoji, setAvatarEmoji] = useState('ð¶')
  const [saving, setSaving] = useState(false)

  const handleFinish = async () => {
    if (!name.trim() || !birthDate) return
    setSaving(true)
    try {
      const child = {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        name: name.trim(),
        birthDate,
        avatarEmoji,
      }
      await addChild(child)
    } catch (e) {
      console.warn('addChild failed, continuing offline:', e)
    }
    setOnboarded()
  }

  // Calculate age preview
  const ageText = birthDate
    ? (() => {
        const birth = new Date(birthDate)
        const now = new Date()
        const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth())
        if (months < 12) return `${months} Monate`
        const years = Math.floor(months / 12)
        const rem = months % 12
        return rem > 0 ? `${years} Jahre, ${rem} Monate` : `${years} Jahre`
      })()
    : ''

  return (
    <div className="min-h-screen bg-tuki-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-rot flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Willkommen bei Tuki!</h1>
          <p className="text-sm text-gray-500 mt-1">ErzÃ¤hl uns von deinem Kind, damit wir die besten Inhalte fÃ¼r euch finden.</p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? 'w-8 bg-tuki-rot' : i < step ? 'w-2 bg-tuki-rot/50' : 'w-2 bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Step 0: Name */}
        {step === 0 && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 animate-fadeIn">
            <div className="text-center mb-6">
              <span className="text-4xl">ð</span>
              <h2 className="text-lg font-bold text-gray-800 mt-3">Wie heisst dein Kind?</h2>
            </div>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Vorname eingeben..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-center text-lg focus:outline-none focus:ring-2 focus:ring-tuki-rot/30 focus:border-tuki-rot"
              autoFocus
            />
            <button
              onClick={() => name.trim() && setStep(1)}
              disabled={!name.trim()}
              className="w-full mt-6 py-3 rounded-xl font-semibold text-white gradient-rot disabled:opacity-40 transition-opacity"
            >
              Weiter
            </button>
          </div>
        )}

        {/* Step 1: Birth date */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 animate-fadeIn">
            <div className="text-center mb-6">
              <span className="text-4xl">ð</span>
              <h2 className="text-lg font-bold text-gray-800 mt-3">Wann wurde {name} geboren?</h2>
              <p className="text-xs text-gray-400 mt-1">So kÃ¶nnen wir altersgerechte Inhalte empfehlen</p>
            </div>
            <input
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              min="2018-01-01"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-center text-lg focus:outline-none focus:ring-2 focus:ring-tuki-rot/30 focus:border-tuki-rot"
            />
            {ageText && (
              <p className="text-center text-sm text-tuki-rot font-medium mt-3">
                {name} ist {ageText} alt
              </p>
            )}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(0)}
                className="flex-1 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100"
              >
                ZurÃ¼ck
              </button>
              <button
                onClick={() => birthDate && setStep(2)}
                disabled={!birthDate}
                className="flex-1 py-3 rounded-xl font-semibold text-white gradient-rot disabled:opacity-40 transition-opacity"
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Avatar */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 animate-fadeIn">
            <div className="text-center mb-6">
              <span className="text-5xl">{avatarEmoji}</span>
              <h2 className="text-lg font-bold text-gray-800 mt-3">WÃ¤hle ein Emoji fÃ¼r {name}</h2>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {AVATAR_EMOJIS.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => setAvatarEmoji(emoji)}
                  className={`text-3xl p-3 rounded-xl transition-all ${
                    avatarEmoji === emoji
                      ? 'bg-tuki-rot/10 ring-2 ring-tuki-rot scale-110'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100"
              >
                ZurÃ¼ck
              </button>
              <button
                onClick={handleFinish}
                disabled={saving}
                className="flex-1 py-3 rounded-xl font-semibold text-white gradient-rot disabled:opacity-40 transition-opacity"
              >
                {saving ? 'Speichern...' : 'Los gehts! ð'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
