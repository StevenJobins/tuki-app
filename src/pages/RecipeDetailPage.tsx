import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
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
            Zurück zu Rezepten
          </button>
        </div>
      </div>
    )
  }

  const isCompleted = completedRecipes.includes(recipe.id)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-8">
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
          <FavoriteButton id={recipe.id} />
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
              <span className="text-sm text-gray-600">{ing.item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="px-4 mt-6">
        <h2 className="font-semibold text-base text-gray-800 mb-3">👩‍🍳 Zubereitung</h2>
        <div className="space-y-4">
          {recipe.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
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
            </motion.div>
          ))}
        </div>
      </div>

      {/* Complete Button */}
      <div className="px-4 mt-8">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => completeRecipe(recipe.id)}
          disabled={isCompleted}
          className={`w-full py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors ${
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
        </motion.button>
      </div>
    </motion.div>
  )
}
