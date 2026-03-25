import { useParams, useNavigate } from 'react-router-dom'
import { getRecipeById } from '../data/recipes'
import FavoriteButton from '../components/FavoriteButton'
import { useApp } from '../context/AppContext'

export default function RecipeDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { completeRecipe, completedRecipes } = useApp()
  const recipe = getRecipeById(id || '')

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-4xl block mb-3">🤔</span>
          <p className="text-gray-500">Rezept nicht gefunden</p>
          <button onClick={() => navigate('/rezepte')} className="text-tuki-rot text-sm mt-2">
            Zurueck zu Rezepten
          </button>
        </div>
      </div>
    )
  }

  const isCompleted = completedRecipes.includes(recipe.id)

  return (
    <div className="pb-8">
      {/* Hero Image */}
      <div className="relative h-56 bg-gray-100">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4">
          <button onClick={() => navigate('/rezepte')} className="w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow">
            <span className="text-lg">←</span>
          </button>
        </div>
        <div className="absolute top-4 right-4">
          <FavoriteButton itemId={recipe.id} type="recipe" />
        </div>
      </div>

      {/* Title */}
      <div className="px-4 -mt-6 relative">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{recipe.emoji}</span>
            <h1 className="text-lg font-bold text-gray-900">{recipe.title}</h1>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">{recipe.description}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-3 px-4 mt-4">
        <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
          <span className="text-lg">⏱️</span>
          <p className="text-xs font-semibold text-gray-700 mt-0.5">{recipe.time}</p>
          <p className="text-[10px] text-gray-400">Dauer</p>
        </div>
        <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
          <span className="text-lg">👶</span>
          <p className="text-xs font-semibold text-gray-700 mt-0.5">{recipe.ageRange[0]}–{recipe.ageRange[1]} Jahre</p>
          <p className="text-[10px] text-gray-400">Alter</p>
        </div>
        <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
          <span className="text-lg">📊</span>
          <p className="text-xs font-semibold text-gray-700 mt-0.5">{recipe.difficulty}</p>
          <p className="text-[10px] text-gray-400">Schwierigkeit</p>
        </div>
        <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
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
        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
          {recipe.ingredients.map((ing, i) => (
            <div key={i} className="flex items-center px-4 py-2.5">
              <span className="text-xs text-tuki-rot font-medium w-24 shrink-0">{ing.amount}</span>
              <span className="text-sm text-gray-700">{ing.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="px-4 mt-6">
        <h2 className="font-semibold text-base text-gray-800 mb-3">👩‍🍳 Zubereitung</h2>
        <div className="space-y-3">
          {recipe.steps.map((step, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-7 h-7 rounded-full gradient-rot flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">{i + 1}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 leading-relaxed">{step.text}</p>
                {step.tip && (
                  <div className="mt-2 bg-yellow-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-yellow-700">💡 {step.tip}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Complete Button */}
      <div className="px-4 mt-8">
        <button
          onClick={() => !isCompleted && completeRecipe(recipe.id)}
          className={`w-full py-4 rounded-2xl font-semibold text-lg shadow-lg transition ${
            isCompleted
              ? 'bg-green-100 text-green-700'
              : 'gradient-rot text-white hover:opacity-90'
          }`}
        >
          {isCompleted
            ? <>✅ Geschafft! +{recipe.stars} Sterne verdient</>
            : <>⭐ Rezept geschafft — {recipe.stars} Sterne verdienen</>
          }
        </button>
      </div>
    </div>
  )
}
