import { motion } from 'framer-motion'
import Header from '../components/Header'
import SectionHeader from '../components/SectionHeader'
import RecipeCard from '../components/RecipeCard'
import ActivityCard from '../components/ActivityCard'
import { recipes, getSeasonalRecipes } from '../data/recipes'
import { activities } from '../data/activities'
import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 11) return 'Guten Morgen'
  if (hour < 14) return 'Mahlzeit'
  if (hour < 18) return 'Guten Nachmittag'
  return 'Guten Abend'
}

function getSeasonEmoji(): string {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return '🌸'
  if (month >= 5 && month <= 7) return '☀️'
  if (month >= 8 && month <= 10) return '🍂'
  return '❄️'
}

function getSeasonName(): string {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return 'Frühling'
  if (month >= 5 && month <= 7) return 'Sommer'
  if (month >= 8 && month <= 10) return 'Herbst'
  return 'Winter'
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export default function HomePage() {
  const navigate = useNavigate()
  const { tukiStars, completedActivities, completedRecipes } = useApp()
  const seasonalRecipes = getSeasonalRecipes().slice(0, 4)
  const featuredActivities = activities.slice(0, 4)

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="pb-24">
      <Header />

      {/* Hero Section */}
      <motion.div variants={item} className="px-4 mt-2 mb-6">
        <div className="relative rounded-3xl overflow-hidden gradient-mint p-5">
          <div className="relative z-10">
            <p className="text-tuki-rot-dark text-sm font-medium">{getGreeting()} 👋</p>
            <h1 className="text-2xl font-bold text-gray-800 mt-1 leading-tight">
              Was entdecken wir<br />heute zusammen?
            </h1>
            <div className="flex items-center gap-3 mt-4">
              <div className="bg-white/70 rounded-xl px-3 py-2 flex items-center gap-2">
                <span>⭐</span>
                <div>
                  <p className="text-xs font-semibold text-gray-700">{tukiStars.total} Sterne</p>
                  <p className="text-[10px] text-gray-500">{tukiStars.levelName}</p>
                </div>
              </div>
              <div className="bg-white/70 rounded-xl px-3 py-2 flex items-center gap-2">
                <span>✅</span>
                <div>
                  <p className="text-xs font-semibold text-gray-700">{completedActivities.length + completedRecipes.length}</p>
                  <p className="text-[10px] text-gray-500">Abgeschlossen</p>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/20" />
          <div className="absolute -right-2 bottom-0 w-20 h-20 rounded-full bg-white/15" />
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item} className="px-4 mb-6">
        <div className="grid grid-cols-4 gap-2">
          {[
            { emoji: '🍳', label: 'Rezepte', path: '/rezepte' },
            { emoji: '🎮', label: 'Aktivitäten', path: '/aktivitaeten' },
            { emoji: '📊', label: 'Entwicklung', path: '/entwicklung' },
            { emoji: '👨‍👩‍👧', label: 'Community', path: '/community' },
          ].map(action => (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-1.5 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform"
            >
              <span className="text-2xl">{action.emoji}</span>
              <span className="text-[10px] font-medium text-gray-600">{action.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Seasonal Banner */}
      <motion.div variants={item} className="px-4 mb-6">
        <button
          onClick={() => navigate('/rezepte')}
          className="w-full bg-tuki-warm rounded-2xl p-4 border border-orange-100 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{getSeasonEmoji()}</span>
            <div>
              <h3 className="font-semibold text-sm text-gray-800">{getSeasonName()}s-Rezepte</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {seasonalRecipes.length} saisonale Ideen für euch entdecken
              </p>
            </div>
            <svg className="ml-auto" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8F5652" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </button>
      </motion.div>

      {/* Featured Recipes */}
      <motion.div variants={item}>
        <SectionHeader title="Beliebte Rezepte" emoji="🍳" linkTo="/rezepte" />
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar snap-x">
          {seasonalRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} size="featured" />
          ))}
        </div>
      </motion.div>

      {/* Activities */}
      <motion.div variants={item} className="mt-6">
        <SectionHeader title="Aktivitäten für heute" emoji="🎯" linkTo="/aktivitaeten" />
        <div className="grid grid-cols-2 gap-3 px-4">
          {featuredActivities.slice(0, 4).map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </motion.div>

      {/* Tuki Tip of the Day */}
      <motion.div variants={item} className="mt-6 px-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl gradient-rot flex items-center justify-center shrink-0">
              <span className="text-white text-lg">💡</span>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-800">Tuki-Tipp des Tages</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Lass dein Kind die Zutaten für das Abendessen aus dem Kühlschrank holen —
                im Tuki erreicht es alles auf Augenhöhe. Das stärkt die Selbstständigkeit!
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Level Progress */}
      <motion.div variants={item} className="mt-6 px-4 mb-4">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm text-gray-800">🏆 {tukiStars.levelName}</h3>
            <span className="text-xs text-gray-500">Level {tukiStars.level + 1}/5</span>
          </div>
          <div className="w-full h-2 bg-yellow-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((tukiStars.total / 100) * 100, 100)}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <p classNAME="text-[10px] text-gray-500 mt-1.5">
            Noch {Math.max(0, [10, 25, 50, 100][tukiStars.level] || 100 - tukiStars.total)} Sterne bis zum nächsten Level
          </p>
        </div>
      </motion.div>
    </motion.div>
  
)3turn (\n    <motion.div variants={container} initial="hidden" animate="show" className="pb-24">
      <header />
      <motion.div variants={item} className="px-4 mt-2 mb-6">
  
  
  
?}
