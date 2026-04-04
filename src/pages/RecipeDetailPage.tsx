import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getRecipeById } from '../data/recipes'
import FavoriteButton from '../components/FavoriteButton'
import ShareButton from '../components/ShareButton'
import { useApp } from '../context/AppContext'

/* ---- Confetti Burst Component ---- */
function ConfettiBurst({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 3500)
    return () => clearTimeout(timer)
  }, [onDone])

  const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF922B', '#CC5DE8', '#20C997', '#F06595']
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: colors[i % colors.length],
    delay: Math.random() * 0.8,
    size: 6 + Math.random() * 8,
    duration: 2.5 + Math.random() * 1.5,
  }))

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left + '%',
            backgroundColor: p.color,
            width: p.size + 'px',
            height: p.size * 0.6 + 'px',
            animationDelay: p.delay + 's',
            animationDuration: p.duration + 's',
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  )
}

/* ---- Cooking Timer Component ---- */
function KochTimer({ minutes }: { minutes: number }) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60)
  const [running, setRunning] = useState(false)
  const [started, setStarted] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running && secondsLeft > 0) {
      intervalRef.current = setInterval(() => setSecondsLeft(s => s - 1), 1000)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, secondsLeft])

  useEffect(() => {
    if (secondsLeft === 0 && started) {
      setRunning(false)
      if (intervalRef.current) clearInterval(intervalRef.current)
      // Vibrate on timer end if available
      if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200])
    }
  }, [secondsLeft, started])

  const mins = Math.floor(secondsLeft / 60)
  const secs = secondsLeft % 60
  const progress = started ? ((minutes * 60 - secondsLeft) / (minutes * 60)) * 100 : 0
  const circumference = 2 * Math.PI * 36

  const toggleTimer = () => {
    if (!started) setStarted(true)
    setRunning(r => !r)
  }

  const resetTimer = () => {
    setRunning(false)
    setStarted(false)
    setSecondsLeft(minutes * 60)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="relative w-20 h-20 shrink-0">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" stroke="#f3f4f6" strokeWidth="4" />
          <circle cx="40" cy="40" r="36" fill="none"
            stroke={secondsLeft === 0 ? '#22c55e' : running ? '#8F5652' : '#d1d5db'}
            strokeWidth="4" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-sm font-bold ${secondsLeft === 0 ? 'text-green-500' : 'text-gray-700'}`}>
            {secondsLeft === 0 ? 'â' : `${mins}:${secs.toString().padStart(2, '0')}`}
          </span>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-xs font-semibold text-gray-700">
          {secondsLeft === 0 ? 'Fertig!' : running ? 'Timer lÃ¤uft...' : started ? 'Pausiert' : 'Koch-Timer'}
        </p>
        <p className="text-[10px] text-gray-400 mt-0.5">{minutes} Minuten Kochzeit</p>
        <div className="flex gap-2 mt-2">
          <button onClick={toggleTimer}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
              running ? 'bg-amber-100 text-amber-700' :
              secondsLeft === 0 ? 'bg-green-100 text-green-700' :
              'gradient-rot text-white shadow-sm'
            }`}>
            {secondsLeft === 0 ? 'Fertig â' : running ? 'â¸ Pause' : started ? 'â¶ Weiter' : 'â¶ Start'}
          </button>
          {started && <button onClick={resetTimer} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-500">Reset</button>}
        </div>
      </div>
    </div>
  )
}

/* ---- Koch-Modus (fullscreen step-by-step) ---- */
function KochModus({ recipe, onClose, onComplete }: { recipe: any; onClose: () => void; onComplete: () => void }) {
  const [step, setStep] = useState(0)
  const [showIngredients, setShowIngredients] = useState(true)
  const [checkedIngs, setCheckedIngs] = useState<boolean[]>(new Array(recipe.ingredients.length).fill(false))
  const totalSteps = recipe.steps.length
  const progress = ((step + 1) / totalSteps) * 100

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const nextStep = () => { if (step < totalSteps - 1) { setStep(s => s + 1); setShowIngredients(false) } }
  const prevStep = () => { if (step > 0) setStep(s => s - 1) }
  const toggleIng = (i: number) => setCheckedIngs(prev => { const n = [...prev]; n[i] = !n[i]; return n })
  const allChecked = checkedIngs.every(Boolean)
  const currentStep = recipe.steps[step]

  if (showIngredients) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col">
        <div className="gradient-rot text-white px-4 py-3 flex items-center justify-between shrink-0">
          <button onClick={onClose} className="text-white/80 text-sm font-medium">â Beenden</button>
          <span className="font-bold text-sm">{recipe.emoji} Koch-Modus</span>
          <span className="text-white/70 text-xs">{recipe.duration} Min.</span>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-5">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Alles bereit? â</h2>
          <p className="text-xs text-gray-500 mb-4">Hake alle Zutaten ab, bevor ihr startet.</p>
          <div className="space-y-2">
            {recipe.ingredients.map((ing: any, i: number) => (
              <button key={i} onClick={() => toggleIng(i)}
                className={`flex items-center gap-3 w-full rounded-xl p-3 transition-all ${checkedIngs[i] ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-transparent'}`}>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${checkedIngs[i] ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                  {checkedIngs[i] && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                </div>
                <span className={`text-sm font-medium w-16 shrink-0 ${checkedIngs[i] ? 'text-green-600' : 'text-gray-600'}`}>{ing.amount}</span>
                <span className={`text-sm ${checkedIngs[i] ? 'text-green-700 line-through' : 'text-gray-800'}`}>{ing.name}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="p-4 border-t border-gray-100 bg-white shrink-0">
          <button onClick={() => setShowIngredients(false)}
            className={`w-full py-4 rounded-2xl font-bold text-base shadow-lg active:scale-[0.97] transition-all ${allChecked ? 'gradient-rot text-white shadow-red-500/25' : 'bg-gray-200 text-gray-500'}`}>
            {allChecked ? "Los geht's! ð" : `Noch ${checkedIngs.filter(c => !c).length} Zutaten...`}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      <div className="gradient-rot text-white shrink-0">
        <div className="px-4 py-3 flex items-center justify-between">
          <button onClick={onClose} className="text-white/80 text-sm font-medium">â Beenden</button>
          <span className="font-bold text-sm">Schritt {step + 1} von {totalSteps}</span>
          <span className="text-white/70 text-xs">{recipe.emoji}</span>
        </div>
        <div className="h-1.5 bg-white/20">
          <div className="h-full bg-white/90 transition-all duration-500 ease-out rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto flex flex-col justify-center px-6 py-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl gradient-rot flex items-center justify-center mx-auto mb-4 shadow-lg animate-scale-pop" key={step}>
            <span className="text-white text-2xl font-bold">{step + 1}</span>
          </div>
        </div>
        <p className="text-lg text-gray-800 leading-relaxed text-center font-medium animate-slide-up" key={'text-'+step}>
          {currentStep.text}
        </p>
        {currentStep.tip && (
          <div className="mt-6 bg-amber-50 rounded-2xl p-4 border border-amber-100 mx-auto max-w-sm animate-slide-up">
            <p className="text-sm text-amber-800 text-center">ð¡ {currentStep.tip}</p>
          </div>
        )}
      </div>
      <div className="p-4 border-t border-gray-100 bg-white shrink-0">
        <div className="flex gap-3">
          <button onClick={prevStep} disabled={step === 0}
            className={`flex-1 py-3.5 rounded-xl font-semibold text-sm border transition-all ${step === 0 ? 'border-gray-200 text-gray-300' : 'border-gray-300 text-gray-600 active:scale-[0.97]'}`}>
            â ZurÃ¼ck
          </button>
          {step < totalSteps - 1 ? (
            <button onClick={nextStep}
              className="flex-[2] py-3.5 rounded-xl gradient-rot text-white font-bold text-sm shadow-lg shadow-red-500/25 active:scale-[0.97] transition-transform">
              Weiter â
            </button>
          ) : (
            <button onClick={() => { onComplete(); onClose(); }}
              className="flex-[2] py-3.5 rounded-xl bg-green-500 text-white font-bold text-sm shadow-lg shadow-green-500/25 active:scale-[0.97] transition-transform">
              â­ Fertig! Sterne verdienen
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ---- Main Page Component ---- */
export default function RecipeDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { completeRecipe, completedRecipes } = useApp()
  const recipe = getRecipeById(id || '')
  const [kochModus, setKochModus] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [heroImgErr, setHeroImgErr] = useState(false)
  const [checkedIngs, setCheckedIngs] = useState<boolean[]>([])

  useEffect(() => {
    if (recipe) setCheckedIngs(new Array(recipe.ingredients.length).fill(false))
  }, [recipe])

  const handleComplete = useCallback(() => {
    if (recipe && !completedRecipes.includes(recipe.id)) {
      completeRecipe(recipe.id)
      setShowConfetti(true)
    }
  }, [recipe, completedRecipes, completeRecipe])

  const toggleIngredient = (i: number) => {
    setCheckedIngs(prev => { const n = [...prev]; n[i] = !n[i]; return n })
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-scale-pop">
          <span className="text-4xl block mb-3">ð¤</span>
          <p className="text-gray-500">Rezept nicht gefunden</p>
          <button onClick={() => navigate('/rezepte')} className="text-tuki-rot text-sm mt-2 font-medium">ZurÃ¼ck zu Rezepten</button>
        </div>
      </div>
    )
  }

  const isCompleted = completedRecipes.includes(recipe.id)
  const checkedCount = checkedIngs.filter(Boolean).length

  return (
    <div className="pb-8">
      {showConfetti && <ConfettiBurst onDone={() => setShowConfetti(false)} />}

      {/* Hero Image */}
      <div className="relative h-72 overflow-hidden">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full glass flex items-center justify-center shadow-lg active:scale-95 transition-transform">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <div className="flex items-center gap-2">
            <ShareButton title={recipe.title} text={recipe.subtitle + ' \u2014 Tuki Family'} recipeId={recipe.id} />
            <FavoriteButton id={recipe.id} />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center gap-2 mb-2">
            {recipe.tags.map((tag: string) => (
              <span key={tag} className="glass text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">{recipe.emoji} {recipe.title}</h1>
          <p className="text-white/80 text-sm mt-0.5">{recipe.subtitle}</p>
        </div>
      </div>

      {/* Quick Info - Glass Cards */}
      <div className="flex gap-2 px-4 -mt-5 relative z-10 mb-4">
        {[
          { icon: 'â±ï¸', val: recipe.duration + ' Min.', label: 'Dauer' },
          { icon: 'ð¶', val: recipe.ageRange[0] + '-' + recipe.ageRange[1] + ' J.', label: 'Alter' },
          { icon: 'ð', val: recipe.difficulty, label: 'Level' },
          { icon: 'ð½ï¸', val: recipe.servings + '', label: 'Portionen' },
        ].map((info, i) => (
          <div key={i} className="flex-1 glass rounded-2xl p-2.5 text-center shadow-sm">
            <span className="text-base">{info.icon}</span>
            <p className="text-[11px] font-semibold text-gray-700 mt-0.5 capitalize">{info.val}</p>
            <p className="text-[9px] text-gray-400">{info.label}</p>
          </div>
        ))}
      </div>

      {/* Timer */}
      <div className="px-4 mb-4">
        <KochTimer minutes={recipe.duration} />
      </div>

      {/* Tuki Tip */}
      <div className="mx-4 mb-4 bg-gradient-to-r from-tuki-mint-bg to-green-50 border border-tuki-mint rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl gradient-rot flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-white text-sm font-bold">T</span>
          </div>
          <div>
            <h3 className="font-semibold text-xs text-tuki-rot-dark">Tuki-Tipp</h3>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">{recipe.tukiTip}</p>
          </div>
        </div>
      </div>

      {/* Ingredients with interactive checklist */}
      <div className="px-4 mt-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-base text-gray-800">ð Zutaten</h2>
          {checkedCount > 0 && (
            <span className="text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full animate-count-up">
              {checkedCount}/{recipe.ingredients.length} bereit
            </span>
          )}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          {recipe.ingredients.map((ing: any, i: number) => (
            <button key={i} onClick={() => toggleIngredient(i)}
              className={`flex items-center gap-3 w-full px-4 py-3 transition-all ${i < recipe.ingredients.length - 1 ? 'border-b border-gray-50' : ''} ${checkedIngs[i] ? 'bg-green-50/50' : ''}`}>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${checkedIngs[i] ? 'bg-green-500 border-green-500 animate-scale-pop' : 'border-gray-200 bg-white'}`}>
                {checkedIngs[i] && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>}
              </div>
              <span className={`text-sm font-medium w-16 shrink-0 ${checkedIngs[i] ? 'text-green-600' : 'text-gray-500'}`}>{ing.amount}</span>
              <span className={`text-sm text-left ${checkedIngs[i] ? 'text-green-700 line-through opacity-60' : 'text-gray-700'}`}>{ing.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="px-4 mt-6">
        <h2 className="font-semibold text-base text-gray-800 mb-3">ð©âð³ Zubereitung</h2>
        <div className="space-y-4">
          {recipe.steps.map((step: any, i: number) => (
            <div key={i} className="flex gap-3">
              <div className="w-8 h-8 rounded-full gradient-rot flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <span className="text-white text-xs font-bold">{i + 1}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 leading-relaxed">{step.text}</p>
                {step.tip && (
                  <div className="mt-2 bg-amber-50 rounded-xl p-2.5 border border-amber-100">
                    <p className="text-xs text-amber-700">ð¡ {step.tip}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Koch-Modus Button */}
      <div className="px-4 mt-6">
        <button onClick={() => setKochModus(true)}
          className="w-full py-4 rounded-2xl gradient-sunset text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 active:scale-[0.97] transition-transform animate-pulse-glow">
          ð¨âð³ Koch-Modus starten
        </button>
        <p className="text-[10px] text-gray-400 text-center mt-1.5">
          Schritt-fÃ¼r-Schritt im Vollbild â perfekt zum gemeinsamen Kochen
        </p>
      </div>

      {/* Complete Button */}
      <div className="px-4 mt-4">
        <button onClick={handleComplete} disabled={isCompleted}
          className={`w-full py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.97] ${
            isCompleted
              ? 'bg-green-50 text-green-700 border-2 border-green-200'
              : 'gradient-rot text-white shadow-lg shadow-tuki-rot/25'
          }`}>
          {isCompleted ? (
            <>â Geschafft! +{recipe.stars} Sterne verdient</>
          ) : (
            <>â­ Rezept geschafft â {recipe.stars} Sterne verdienen</>
          )}
        </button>
      </div>

      {/* Koch-Modus Overlay */}
      {kochModus && (
        <KochModus recipe={recipe} onClose={() => setKochModus(false)} onComplete={handleComplete} />
      )}
    </div>
  )
}
