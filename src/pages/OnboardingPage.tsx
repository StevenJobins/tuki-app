import { useState } from 'react'
import { useApp, ChildProfile } from '../context/AppContext'

const AVATAR_EMOJIS = ['👶', '👧', '👦', '🧒', '👸', '🤴', '🦁', '🐻', '⭐', '🦊', '🐰', '🦄']

interface ChildDraft {
  name: string
  birthDate: string
  avatarEmoji: string
}

export default function OnboardingPage() {
  const { addChild, setOnboarded } = useApp()
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [avatarEmoji, setAvatarEmoji] = useState('👶')
  const [saving, setSaving] = useState(false)
  const [addedChildren, setAddedChildren] = useState<ChildDraft[]>([])

  const addCurrentChild = () => {
    if (!name.trim() || !birthDate) return
    setAddedChildren(prev => [...prev, { name: name.trim(), birthDate, avatarEmoji }])
    // Reset for next child
    setName('')
    setBirthDate('')
    setAvatarEmoji('👶')
    setStep(3) // Go to overview
  }

  const handleAddAnother = () => {
    setStep(0) // Back to name input
  }

  const handleFinish = async () => {
    setSaving(true)
    try {
      for (const child of addedChildren) {
        await addChild({
          id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString() + Math.random().toString(36).slice(2),
          name: child.name,
          birthDate: child.birthDate,
          avatarEmoji: child.avatarEmoji,
        })
      }
    } catch (e) {
      console.warn('addChild failed, continuing offline:', e)
    }
    setOnboarded()
  }

  const getAgeText = (bd: string) => {
    const birth = new Date(bd)
    const now = new Date()
    const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth())
    if (months < 12) return months + ' Monate'
    const years = Math.floor(months / 12)
    const rem = months % 12
    return rem > 0 ? years + ' Jahre, ' + rem + ' Monate' : years + ' Jahre'
  }

  const ageText = birthDate ? getAgeText(birthDate) : ''
  const totalSteps = addedChildren.length === 0 ? 3 : 4

  return (
    <div className="min-h-screen bg-tuki-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-rot flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {step === 3 ? 'Deine Kinder' : 'Fast geschafft!'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {step === 3
              ? addedChildren.length === 1 ? '1 Kind hinzugefügt' : addedChildren.length + ' Kinder hinzugefügt'
              : 'Erstelle ein Profil für dein Kind.'}
          </p>
        </div>

        {/* Progress dots - only show for child entry steps */}
        {step < 3 && (
          <div className="flex justify-center gap-2 mb-8">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className={'h-2 rounded-full transition-all duration-300 ' + (i === step ? 'w-8 bg-tuki-rot' : i < step ? 'w-2 bg-tuki-rot/50' : 'w-2 bg-gray-200')}
              />
            ))}
          </div>
        )}

        {/* Step 0: Child Name */}
        {step === 0 && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 animate-fadeIn">
            <div className="text-center mb-6">
              <span className="text-4xl">👋</span>
              <h2 className="text-lg font-bold text-gray-800 mt-3">
                {addedChildren.length > 0 ? 'Wie heisst dein nächstes Kind?' : 'Wie heisst dein Kind?'}
              </h2>
            </div>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Vorname eingeben..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-center text-lg focus:outline-none focus:ring-2 focus:ring-tuki-rot/30 focus:border-tuki-rot"
              autoFocus
            />
            <div className="flex gap-3 mt-6">
              {addedChildren.length > 0 && (
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100"
                >
                  Zurück
                </button>
              )}
              <button
                onClick={() => name.trim() && setStep(1)}
                disabled={!name.trim()}
                className="flex-1 py-3 rounded-xl font-semibold text-white gradient-rot disabled:opacity-40 transition-opacity"
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Birth date */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 animate-fadeIn">
            <div className="text-center mb-6">
              <span className="text-4xl">🎂</span>
              <h2 className="text-lg font-bold text-gray-800 mt-3">Wann wurde {name} geboren?</h2>
              <p className="text-xs text-gray-400 mt-1">So können wir altersgerechte Inhalte empfehlen</p>
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
                Zurück
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
              <h2 className="text-lg font-bold text-gray-800 mt-3">Wähle ein Profilbild für {name}</h2>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {AVATAR_EMOJIS.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => setAvatarEmoji(emoji)}
                  className={'text-3xl p-3 rounded-2xl transition-all ' + (avatarEmoji === emoji ? 'bg-tuki-rot/10 ring-2 ring-tuki-rot scale-110' : 'bg-gray-50 hover:bg-gray-100')}
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
                Zurück
              </button>
              <button
                onClick={addCurrentChild}
                className="flex-1 py-3 rounded-xl font-semibold text-white gradient-rot transition-opacity"
              >
                Hinzufügen
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Children Overview */}
        {step === 3 && (
          <div className="animate-fadeIn">
            {/* Added children list */}
            <div className="space-y-3 mb-6">
              {addedChildren.map((child, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-tuki-mint flex items-center justify-center text-2xl">
                    {child.avatarEmoji}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{child.name}</p>
                    <p className="text-xs text-gray-400">{getAgeText(child.birthDate)} alt</p>
                  </div>
                  <button
                    onClick={() => {
                      setAddedChildren(prev => prev.filter((_, idx) => idx !== i))
                    }}
                    className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-400 text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Add another child button */}
            <button
              onClick={handleAddAnother}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border border-dashed border-gray-300 flex items-center justify-center gap-2 text-gray-500 hover:border-tuki-rot hover:text-tuki-rot transition-colors mb-6"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Weiteres Kind hinzufügen
            </button>

            {/* Start button */}
            <button
              onClick={handleFinish}
              disabled={saving || addedChildren.length === 0}
              className="w-full py-4 rounded-xl font-semibold text-white gradient-rot disabled:opacity-40 transition-opacity text-lg"
            >
              {saving ? 'Wird gespeichert...' : 'Los gehts!'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
