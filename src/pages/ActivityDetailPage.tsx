import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getActivityById, categoryInfo } from '../data/activities'
import FavoriteButton from '../components/FavoriteButton'
import { useApp } from '../context/AppContext'

export default function ActivityDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { completeActivity, completedActivities } = useApp()
  const activity = getActivityById(id || '')

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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-8">
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
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
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
            </motion.div>
          ))}
        </div>
      </div>

      {/* Complete Button */}
      <div className="px-4 mt-8">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => completeActivity(activity.id)}
          disabled={isCompleted}
          className={`w-full py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors ${
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
        </motion.button>
      </div>
    </motion.div>
  )
}
