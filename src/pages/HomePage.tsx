import { motion } from 'framer-motion'
import Header from '../components/Header'
import SectionHeader from '../components/SectionHeader'
import RecipeCard from '../components/RecipeCard'
import ActivityCard from '../components/ActivityCard'
import { recipes, getSeasonalRecipes, getTranslatedRecipe } from '../data/recipes'
import { activities, getTranslatedActivity } from '../data/activities'
import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../i18n/useTranslation'

function getGreeting(t: any): string {
  const hour = new Date().getHours()
  if (hour < 11) return t.home.greetings.morning
  if (hour < 14) return t.home.greetings.noon
  if (hour < 18) return t.home.greetings.afternoon
  return t.home.greetings.evening
}

function getSeasonEmoji(): string {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return '🌸'
  if (month >= 5 && month <= 7) return '☀️'
  if (month >= 8 && month <= 10) return '🍂'
  return '❄️'
}

function getSeasonName(t: any): string {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return t.seasons.spring
  if (month >= 5 && month <= 7) return t.seasons.summer
  if (month >= 8 && month <= 10) return t.seasons.autumn
  return t.seasons.winter
}

function getPhaseInsight(age: number, t: any): { title: string; text: string; emoji: string } {
  if (age < 1) return { emoji: '🌱', title: t.phases.discovery.title, text: t.phases.discovery.text }
  if (age < 2) return { emoji: '🚶', title: t.phases.littleSteps.title, text: t.phases.littleSteps.text }
  if (age < 3) return { emoji: '🎨', title: t.phases.creative.title, text: t.phases.creative.text }
  if (age < 5) return { emoji: '🧪', title: t.phases.explorer.title, text: t.phases.explorer.text }
  return { emoji: '👩‍🍳', title: t.phases.miniChef.title, text: t.phases.miniChef.text }
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
  const { t, language } = useTranslation()
  const { tukiStars, completedActivities, completedRecipes, children, activeChildId, setActiveChild, getChildAge, getActiveChild } = useApp()

  const activeChild = getActiveChild()
  const childAge = getChildAge()

  const seasonalRecipes = getSeasonalRecipes()
  const ageFilteredRecipes = childAge !== null
    ? seasonalRecipes.filter(r => childAge >= r.ageRange[0] && childAge <= r.ageRange[1])
    : seasonalRecipes
  const displayRecipes = ageFilteredRecipes.length > 0 ? ageFilteredRecipes.slice(0, 6) : seasonalRecipes.slice(0, 4)

  const ageFilteredActivities = childAge !== null
    ? activities.filter(a => childAge >= a.ageRange[0] && childAge <= a.ageRange[1])
    : activities
  const displayActivities = ageFilteredActivities.slice(0, 4)

  const phase = childAge !== null ? getPhaseInsight(childAge, t) : null

  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  const dailyTip = t.dailyTips[dayOfYear % t.dailyTips.length]

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="pb-24 overflow-x-hidden">
      <Header />

      {children.length > 1 && (
        <motion.div variants={item} className="px-4 mt-1 mb-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {children.map(child => {
              const isActive = child.id === activeChildId
              return (
                <button key={child.id} onClick={() => setActiveChild(child.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full whitespace-nowrap transition-all shrink-0 ${isActive ? 'bg-tuki-rot text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200'}`}
                >
                  <span className="text-base">{child.avatarEmoji}</span>
                  <span className="text-xs font-medium">{child.name}</span>
                </button>
              )
            })}
          </div>
        </motion.div>
      )}

      <motion.div variants={item} className="px-4 mt-2 mb-6">
        <div className="relative rounded-3xl overflow-hidden gradient-mint p-5">
          <div className="relative z-10">
            <p className="text-tuki-rot-dark text-sm font-medium">
              {getGreeting(t)} {activeChild ? activeChild.avatarEmoji : '👋'}
            </p>
            <h1 className="text-2xl font-bold text-gray-800 mt-1 leading-tight">
              {activeChild ? <>{t.home.heroQuestion(activeChild.name)}</> : <>{t.home.heroQuestionGeneric}</>}
            </h1>
            <div className="flex items-center gap-3 mt-4">
              <div className="bg-white/70 rounded-xl px-3 py-2 flex items-center gap-2">
                <span>⭐</span>
                <div>
                  <p className="text-xs font-semibold text-gray-700">{tukiStars.total} {t.home.starsLabel}</p>
                  <p className="text-[10px] text-gray-500">{t.levels[tukiStars.level]}</p>
                </div>
              </div>
              <div className="bg-white/70 rounded-xl px-3 py-2 flex items-center gap-2">
                <span>✅</span>
                <div>
                  <p className="text-xs font-semibold text-gray-700">{completedActivities.length + completedRecipes.length}</p>
                  <p className="text-[10px] text-gray-500">{t.home.completedLabel}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/20" />
          <div className="absolute -right-2 bottom-0 w-20 h-20 rounded-full bg-white/15" />
        </div>
      </motion.div>

      {phase && activeChild && (
        <motion.div variants={item} className="px-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                <span className="text-lg">{phase.emoji}</span>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-800">{phase.title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{phase.text}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div variants={item} className="px-4 mb-6">
        <div className="grid grid-cols-4 gap-2">
          {[
            { emoji: '🍳', label: t.home.quickActions.recipes, path: '/rezepte' },
            { emoji: '🎮', label: t.home.quickActions.activities, path: '/aktivitaeten' },
            { emoji: '📊', label: t.home.quickActions.development, path: '/entwicklung' },
            { emoji: '👨‍👩‍👧', label: t.home.quickActions.community, path: '/community' },
          ].map(action => (
            <button key={action.path} onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-1.5 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform"
            >
              <span className="text-2xl">{action.emoji}</span>
              <span className="text-[10px] font-medium text-gray-600">{action.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item} className="px-4 mb-6">
        <button onClick={() => navigate('/rezepte')} className="w-full bg-tuki-warm rounded-2xl p-4 border border-orange-100 text-left">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{getSeasonEmoji()}</span>
            <div>
              <h3 className="font-semibold text-sm text-gray-800">{t.home.seasonalRecipes(getSeasonName(t))}</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {childAge !== null
                  ? t.home.seasonalIdeasFor(ageFilteredRecipes.length, activeChild?.name ?? '')
                  : t.home.seasonalIdeasGeneric(seasonalRecipes.length)
                }
              </p>
            </div>
            <svg className="ml-auto" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8F5652" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </button>
      </motion.div>

      <motion.div variants={item}>
        <SectionHeader title={activeChild ? t.home.recipesFor(activeChild.name) : t.home.popularRecipes} emoji="🍳" linkTo="/rezepte" />
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar snap-x max-w-full">
          {displayRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={getTranslatedRecipe(recipe, language)} size="featured" />
          ))}
        </div>
      </motion.div>

      <motion.div variants={item} className="mt-6">
        <SectionHeader title={activeChild ? t.home.activitiesFor(activeChild.name) : t.home.activitiesToday} emoji="🎯" linkTo="/aktivitaeten" />
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4 px-4">
          {displayActivities.map(activity => (
            <ActivityCard key={activity.id} activity={getTranslatedActivity(activity, language)} />
          ))}
        </div>
      </motion.div>

      <motion.div variants={item} className="mt-6 px-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl gradient-rot flex items-center justify-center shrink-0">
              <span className="text-white text-lg">💡</span>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-800">{t.home.tipOfDay}</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{dailyTip}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="mt-6 px-4 mb-4">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm text-gray-800">🏆 {t.levels[tukiStars.level]}</h3>
            <span className="text-xs text-gray-500">{t.home.levelProgress(tukiStars.level + 1)}</span>
          </div>
          <div className="w-full h-2 bg-yellow-100 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" initial={{ width: 0 }} animate={{ width: `${Math.min((tukiStars.total / 100) * 100, 100)}%` }} transition={{ duration: 1, delay: 0.5 }} />
          </div>
          <p className="text-[10px] text-gray-500 mt-1.5">
            {t.home.starsToNext(Math.max(0, [10, 25, 50, 100][tukiStars.level] || 100 - tukiStars.total))}
          </p>
        </div>
      </motion.div>

      {children.length === 0 && (
        <motion.div variants={item} className="px-4 mb-4">
          <button onClick={() => navigate('/profil')} className="w-full bg-gradient-to-r from-tuki-mint to-green-50 rounded-2xl p-4 border border-green-200/50 text-left">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👶</span>
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-gray-800">{t.home.addChild}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{t.home.addChildDesc}</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8F5652" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </div>
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
