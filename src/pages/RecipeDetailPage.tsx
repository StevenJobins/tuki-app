import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getRecipeById } from '../data/recipes'
import FavoriteButton from '../components/FavoriteButton'
import ShareButton from '../components/ShareButton'
import { useApp } from '../context/AppContext'

function KochModus({ recipe, onClose, onComplete }: { recipe: any; onClose: () => void; onComplete: () => void }) {
  const [step, setStep] = useState(0)
  const [showIngredients, setShowIngredients] = useState(true)
  const totalSteps = recipe.steps.length
  const progress = ((step + 1) / totalSteps) * 100

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const nextStep = () => {
    if (step < totalSteps - 1) {
      setStep(s => s + 1)
      setShowIngredients(false)
    }
  }
  const prevStep = () => {
    if (step > 0) setStep(s => s - 1)
  }

  const currentStep = recipe.steps[step]

  if (showIngredients) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-tuki-rot to-red-500 text-white px-4 py-3 flex items-center justify-between shrink-0">
          <button onClick={onClose} className="text-white/80 text-sm font-medium">✕ Beenden</button>
          <span className="font-bold text-sm">{recipe.emoji} Koch-Modus</span>
          <span className="text-white/70 text-xs">{recipe.duration} Min.</span>
        </div>

        {/* Ingredients checklist */}
        <div className="flex-1 overflow-y-auto px-4 py-5">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Alles bereit?</h2>
          <p className="text-xs text-gray-500 mb-4">Lege alle Zutaten bereit, bevor ihr startet.</p>

          <div className="space-y-2">
            {recipe.ingredients.map((ing: any, i: number) => (
              <label key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 cursor-pointer active:bg-gray-100 transition-colors">
                <input type="checkbox" className="w-5 h-5 rounded accent-red-500" />
                <span className="text-sm font-medium text-gray-600 w-16 shrink-0">{ing.amount}</span>
                <span className="text-sm text-gray-800">{ing.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="p-4 border-t border-gray-100 bg-white shrink-0">
          <button
            onClick={() => setShowIngredients(false)}
            className="w-full py-4 rounded-2xl gradient-rot text-white font-bold text-base shadow-lg shadow-red-500/25 active:scale-[0.97] transition-transform"
          >
            Los geht's! 🚀
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header with progress */}
      <div className="bg-gradient-to-r from-tuki-rot to-red-500 text-white shrink-0">
        <div className="px-4 py-3 flex items-center justify-between">
          <button onClick={onClose} className="text-white/80 text-sm font-medium">✕ Beenden</button>
          <span className="font-bold text-sm">Schritt {step + 1} von {totalSteps}</span>
          <span className="text-white/70 text-xs">{recipe.emoji}</span>
        </div>
        <div className="h-1 bg-white/20">
          <div className="h-full bg-white transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto flex flex-col justify-center px-6 py-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl gradient-rot flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white text-2xl font-bold">{step + 1}</span>
          </div>
        </div>

        <p className="text-lg text-gray-800 leading-relaxed text-center font-medium">
          {currentStep.text}
        </p>

        {currentStep.tip && (
          <div className="mt-6 bg-amber-50 rounded-2xl p-4 border border-amber-100 mx-auto max-w-sm">
            <p className="text-sm text-amber-800 text-center">💡 {currentStep.tip}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="p-4 border-t border-gray-100 bg-white shrink-0">
        <div className="flex gap-3">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className={`flex-1 py-3.5 rounded-xl font-semibold text-sm border transition-all ${
              step === 0 ? 'border-gray-200 text-gray-300' : 'border-gray-300 text-gray-600 active:scale-[0.97]'
            }`}
          >
            ← Zurück
          </button>
          {step < totalSteps - 1 ? (
            <button
              onClick={nextStep}
              className="flex-[2] py-3.5 rounded-xl gradient-rot text-white font-bold text-sm shadow-lg shadow-red-500/25 active:scale-[0.97] transition-transform"
            >
              Weiter →
            </button>
          ) : (
            <button
              onClick={() => { onComplete(); onClose(); }}
              className="flex-[2] py-3.5 rounded-xl bg-green-500 text-white font-bold text-sm shadow-lg shadow-green-500/25 active:scale-[0.97] transition-transform"
            >
              ⭐ Fertig! Sterne verdienen
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function RecipeDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { completeRecipe, completedRecipes } = useApp()
  const recipe = getRecipeById(id || '')
  const [kochModus, setKochModus] = useState(false)

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-4xl block mb-3">🤔</span>
          <p className="text-gray-500">Rezept nicht gefunden</p>
          <button onClick={() => navigate('/rezepte')} className="text-tuki-rot text-sm mt-2">
            Zurück zu Rezepten
          </button>
        </div>
      </div>
    )
  }

  const isCompleted = completedRecipes.includes(recipe.id)

  return (
    <div className="pb-8">
      {/* Hero Image */}
      <div className="relative h-64">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <ShareButton title={recipe.title} text={recipe.subtitle + ' \u2014 Tuki Family'} />
            <FavoriteButton id={recipe.id} />
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 mb-1">
            {recipe.tags.map(tag => (
              <span key={tag} className="bg-white/25 text-white text-[10px] font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-bold text-white">{recipe.emoji} {recipe.title}</h1>
          <p className="text-white/80 text-sm">{recipe.subtitle}</p>
        </div>
      </div>

      {/* Quick Info */}
      <div className="flex justify-around py-4 bg-white border-b border-gray-100">
        <div className="text-center">
          <span className="text-lg">⏱️</span>
          <p className="text-xs font-semibold text-gray-700 mt-0.5">{recipe.duration} Min.</p>
          <p className="text-[10px] text-gray-400">Dauer</p>
        </div>
        <div className="text-center">
          <span className="text-lg">👶</span>
          <p className="text-xs font-semibold text-gray-700 mt-0.5">{recipe.ageRange[0]}-{recipe.ageRange[1]} J.</p>
          <p className="text-[10px] text-gray-400">Alter</p>
        </div>
        <div className="text-center">
          <span className="text-lg">📊</span>
          <p className="text-xs font-semibold text-gray-700 mt-0.5 capitalize">{recipe.difficulty}</p>
          <p className="text-[10px] text-gray-400">Level</p>
        </div>
        <div className="text-center">
          <span className="text-lg">🍽️</span>
          <p className="text-xs font-semibold text-gray-700 mt-0.5">{recipe.servings}</p>
          <p className="text-[10px] text-gray-400">Portionen</p>
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
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">{recipe.tukiTip}</p>
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="px-4 mt-6">
        <h2 className="font-semibold text-base text-gray-800 mb-3">🛒 Zutaten</h2>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {recipe.ingredients.map((ing, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3 ${i < recipe.ingredients.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <div className="w-6 h-6 rounded-full bg-tuki-mint-bg flex items-center justify-center shrink-0">
                <span className="text-tuki-rot text-[10px] font-bold">{i + 1}</span>
              </div>
              <span className="text-sm font-medium text-gray-700 w-16 shrink-0">{ing.amount}</span>
              <span className="text-sm text-gray-600">{ing.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="px-4 mt-6">
        <h2 className="font-semibold text-base text-gray-800 mb-3">👩‍🍳 Zubereitung</h2>
        <div className="space-y-4">
          {recipe.steps.map((step, i) => (
            <div
              key={i}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full gradient-rot flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">{i + 1}</span>
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

      {/* Koch-Modus Button */}
      <div className="px-4 mt-6">
        <button
          onClick={() => setKochModus(true)}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 active:scale-[0.97] transition-transform"
        >
          👨‍🍳 Koch-Modus starten
        </button>
        <p className="text-[10px] text-gray-400 text-center mt-1.5">
          Schritt-für-Schritt im Vollbild — perfekt zum gemeinsamen Kochen
        </p>
      </div>

      {/* Complete Button */}
      <div className="px-4 mt-4">
        <button
          onClick={() => completeRecipe(recipe.id)}
          disabled={isCompleted}
          className={`w-full py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors active:scale-[0.97] transition-transform ${
            isCompleted
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'gradient-rot text-white shadow-lg shadow-tuki-rot/25'
          }`}
        >
          {isCompleted ? (
            <>✅ Geschafft! +{recipe.stars} Sterne verdient</>
          ) : (
            <>⭐ Rezept geschafft — {recipe.stars} Sterne verdienen</>
          )}
        </button>
      </div>

      {/* Koch-Modus Overlay */}
      {kochModus && (
        <KochModus
          recipe={recipe}
          onClose={() => setKochModus(false)}
          onComplete={() => completeRecipe(recipe.id)}
        />
      )}
    </div>
  )
}
