import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getActivityById, categoryInfo } from '../data/activities'
import FavoriteButton from '../components/FavoriteButton'
import { useApp } from '../context/AppContext'

function getStepEmoji(stepText: string): string | null {
  // Extract leading emoji from step text (e.g. "🐱 Katze: ..." → "🐱")
  const match = stepText.match(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic})(\uFE0F)?/u)
  return match ? match[0] : null
}

function getStepTitle(stepText: string): { emoji: string; title: string; description: string } {
  const emoji = getStepEmoji(stepText)
  if (emoji) {
    const rest = stepText.substring(emoji.length).trim()
    // Check if there's a "Title:" pattern
    const colonIdx = rest.indexOf(':')
    if (colonIdx > 0 && colonIdx < 20) {
      return {
        emoji,
        title: rest.substring(0, colonIdx).trim(),
        description: rest.substring(colonIdx + 1).trim()
      }
    }
    return { emoji, title: '', description: rest }
  }
  return { emoji: '', title: '', description: stepText }
}

function AktivitaetsModus({ activity, onClose, onComplete }: { activity: any; onClose: () => void; onComplete: () => void }) {
  const [step, setStep] = useState(0)
  const [showMaterials, setShowMaterials] = useState(true)
  const totalSteps = activity.steps.length
  const progress = ((step + 1) / totalSteps) * 100

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const nextStep = () => {
    if (step < totalSteps - 1) {
      setStep(s => s + 1)
      setShowMaterials(false)
    }
  }
  const prevStep = () => {
    if (step > 0) setStep(s => s - 1)
  }

  const currentStep = activity.steps[step]
  const parsed = getStepTitle(currentStep.text)

  if (showMaterials) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col">
        <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white px-4 py-3 flex items-center justify-between shrink-0">
          <button onClick={onClose} className="text-white/80 text-sm font-medium">{'\u2715'} Beenden</button>
          <span className="font-bold text-sm">{activity.emoji} Aktivit\u00e4ts-Modus</span>
          <span className="text-white/70 text-xs">{activity.duration} Min.</span>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Alles bereit?</h2>
          <p className="text-xs text-gray-500 mb-4">Lege alles bereit, bevor ihr startet.</p>

          <div className="space-y-2">
            {activity.materials.map((mat: string, i: number) => (
              <label key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 cursor-pointer active:bg-gray-100 transition-colors">
                <input type="checkbox" className="w-5 h-5 rounded accent-indigo-500" />
                <span className="text-sm text-gray-800">{mat}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-white shrink-0">
          <button
            onClick={() => setShowMaterials(false)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold text-base shadow-lg shadow-purple-500/25 active:scale-[0.97] transition-transform"
          >
            Los geht's! \ud83d\ude80
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white shrink-0">
        <div className="px-4 py-3 flex items-center justify-between">
          <button onClick={onClose} className="text-white/80 text-sm font-medium">{'\u2715'} Beenden</button>
          <span className="font-bold text-sm">Schritt {step + 1} von {totalSteps}</span>
          <span className="text-white/70 text-xs">{activity.emoji}</span>
        </div>
        <div className="h-1 bg-white/20">
          <div className="h-full bg-white transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col justify-center px-6 py-8">
        {/* Big emoji display */}
        <div className="text-center mb-4">
          {parsed.emoji ? (
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-200/50">
              <span className="text-5xl">{parsed.emoji}</span>
            </div>
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center mx-auto mb-3 shadow-lg">
              <span className="text-white text-2xl font-bold">{step + 1}</span>
            </div>
          )}
          {parsed.title && (
            <h3 className="text-xl font-bold text-gray-800 mb-1">{parsed.title}</h3>
          )}
        </div>

        <p className="text-lg text-gray-700 leading-relaxed text-center font-medium max-w-sm mx-auto">
          {parsed.description}
        </p>

        {currentStep.tip && (
          <div className="mt-6 bg-amber-50 rounded-2xl p-4 border border-amber-100 mx-auto max-w-sm">
            <p className="text-sm text-amber-800 text-center">{'\ud83d\udca1'} {currentStep.tip}</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100 bg-white shrink-0">
        <div className="flex gap-3">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className={`flex-1 py-3.5 rounded-xl font-semibold text-sm border transition-all ${
              step === 0 ? 'border-gray-200 text-gray-300' : 'border-gray-300 text-gray-600 active:scale-[0.97]'
            }`}
          >
            {'\u2190'} Zur\u00fcck
          </button>
          {step < totalSteps - 1 ? (
            <button
              onClick={nextStep}
              className="flex-[2] py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-500/25 active:scale-[0.97] transition-transform"
            >
              Weiter {'\u2192'}
            </button>
          ) : (
            <button
              onClick={() => { onComplete(); onClose(); }}
              className="flex-[2] py-3.5 rounded-xl bg-green-500 text-white font-bold text-sm shadow-lg shadow-green-500/25 active:scale-[0.97] transition-transform"
            >
              {'\u2b50'} Fertig! Sterne verdienen
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ActivityDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { completeActivity, completedActivities } = useApp()
  const activity = getActivityById(id || '')
  const [aktivitaetsModus, setAktivitaetsModus] = useState(false)

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-4xl block mb-3">🤔</span>
          <p className="text-gray-500">Aktivität nicht gefunden</p>
          <button onClick={() => navigate('/aktivitaeten')} className="text-tuki-rot text-sm mt-2">
            Zurück zu Aktivitäten
          </button>
        </div>
      </div>
    )
  }

  const cat = categoryInfo[activity.category]
  const isCompleted = completedActivities.includes(activity.id)

  return (
    <div className="pb-8">
      {/* Hero Image */}
      <div className="relative h-56">
        <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <FavoriteButton id={activity.id} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${cat.color} inline-block mb-2`}>
            {cat.emoji} {cat.label}
          </span>
          <h1 className="text-2xl font-bold text-white">{activity.emoji} {activity.title}</h1>
          <p className="text-white/80 text-sm">{activity.subtitle}</p>
        </div>
      </div>

      {/* Quick Info */}
      <div className="flex justify-around py-4 bg-white border-b border-gray-100">
        <div className="text-center">
          <span className="text-lg">⏱️</span>
          <p className="text-xs font-semibold text-gray-700 mt-0.5">{activity.duration} Min.</p>
        </div>
        <div className="text-center">
          <span className="text-lg">👶</span>
          <p className="text-xs font-semibold text-gray-700 mt-0.5">{activity.ageRange[0]}-{activity.ageRange[1]} J.</p>
        </div>
        <div className="text-center">
          <span className="text-lg">📊</span>
          <p className="text-xs font-semibold text-gray-700 mt-0.5 capitalize">{activity.difficulty}</p>
        </div>
        <div className="text-center">
          <span className="text-lg">⭐</span>
          <p className="text-xs font-semibold text-gray-700 mt-0.5">{activity.stars} Sterne</p>
        </div>
      </div>

      {/* Tuki Tip */}
      <div className="mx-4 mt-4 bg-tuki-mint-bg border border-tuki-mint rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg gradient-rot flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-bold">T</span>
          </div>
          <div>
            <h3 className="font-semibold text-xs text-tuki-rot-dark">Tuki-Tipp</h3>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">{activity.tukiTip}</p>
          </div>
        </div>
      </div>

      {/* Learning Goals */}
      <div className="px-4 mt-6">
        <h2 className="font-semibold text-base text-gray-800 mb-3">🎓 Das lernt dein Kind</h2>
        <div className="flex flex-wrap gap-2">
          {activity.learningGoals.map((goal, i) => (
            <span key={i} className="bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full border border-green-100">
              ✓ {goal}
            </span>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div className="px-4 mt-6">
        <h2 className="font-semibold text-base text-gray-800 mb-3">🧰 Das brauchst du</h2>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {activity.materials.map((mat, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3 ${i < activity.materials.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <span className="text-tuki-mint-dark">●</span>
              <span className="text-sm text-gray-600">{mat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="px-4 mt-6">
        <h2 className="font-semibold text-base text-gray-800 mb-3">📋 So geht's</h2>
        <div className="space-y-4">
          {activity.steps.map((step, i) => (
            <div
              key={i}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full gradient-mint flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-tuki-rot-dark text-xs font-bold">{i + 1}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 leading-relaxed">{step.text}</p>
                {step.tip && (
                  <div className="mt-2 bg-yellow-50 rounded-lg p-2.5 border border-yellow-200/50">
                    <p className="text-xs text-yellow-700">💡 {step.tip}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Aktivitäts-Modus Button */}
      <div className="px-4 mt-6">
        <button
          onClick={() => setAktivitaetsModus(true)}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 active:scale-[0.97] transition-transform"
        >
          🚀 Aktivitäts-Modus starten
        </button>
        <p className="text-[10px] text-gray-400 text-center mt-1.5">
          Schritt-für-Schritt im Vollbild — perfekt zum gemeinsamen Mitmachen
        </p>
      </div>

      {/* Complete Button */}
      <div className="px-4 mt-4">
        <button
          onClick={() => completeActivity(activity.id)}
          disabled={isCompleted}
          className={`w-full py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors active:scale-[0.97] transition-transform ${
            isCompleted
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'gradient-rot text-white shadow-lg shadow-tuki-rot/25'
          }`}
        >
          {isCompleted ? (
            <>✅ Geschafft! +{activity.stars} Sterne verdient</>
          ) : (
            <>⭐ Aktivität geschafft — {activity.stars} Sterne verdienen</>
          )}
        </button>
      </div>

      {/* Aktivitäts-Modus Overlay */}
      {aktivitaetsModus && (
        <AktivitaetsModus
          activity={activity}
          onClose={() => setAktivitaetsModus(false)}
          onComplete={() => completeActivity(activity.id)}
        />
      )}
    </div>
  )
}
