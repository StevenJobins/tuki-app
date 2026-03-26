import Header from '../components/Header'
import SectionHeader from '../components/SectionHeader'
import RecipeCard from '../components/RecipeCard'
import ActivityCard from '../components/ActivityCard'
import { recipes, getRecipesByAge, getSeasonalRecipes } from '../data/recipes'
import { activities, getActivitiesByAge } from '../data/activities'
import { getMilestonesForAge, getPhaseForAge } from '../data/milestones'
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

function getSeasonKey(): string {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return 'frühling'
  if (month >= 5 && month <= 7) return 'sommer'
  if (month >= 8 && month <= 10) return 'herbst'
  return 'winter'
}

function getChildAge(birthDate: string): number {
  const birth = new Date(birthDate)
  const now = new Date()
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth())
  return Math.round(months / 12 * 10) / 10 // age in years with 1 decimal
}

function getAgeLabel(birthDate: string): string {
  const birth = new Date(birthDate)
  const now = new Date()
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth())
  if (months < 12) return `${months} Monate`
  const years = Math.floor(months / 12)
  const rem = months % 12
  return rem > 0 ? `${years} J. ${rem} M.` : `${years} Jahre`
}

function getPhaseLabel(age: number): string {
  if (age < 1.5) return 'Baby'
  if (age < 2) return 'Kleinkind (früh)'
  if (age < 3) return 'Kleinkind'
  if (age < 5) return 'Vorschulkind'
  return 'Schulkind'
}

function getChildAgeMonths(birthDate: string): number {
  const birth = new Date(birthDate)
  const now = new Date()
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth())
  return months
}

const PHASE_INSIGHTS = [
  'Jedes Kind hat sein eigenes Tempo — Vergleiche bringen nichts, Vertrauen schon.',
  'In dieser Phase passiert gerade ganz viel im Kopf — auch wenn man es nicht immer sieht.',
  'Kleine Rückschritte gehören dazu. Sie sind oft ein Zeichen, dass ein grosser Sprung bevorsteht.',
  'Du machst das richtig. Dass du dich informierst, zeigt wie sehr dir die Entwicklung am Herzen liegt.',
  'Kinder lernen am meisten durch Nachmachen — du bist das beste Vorbild.',
  'Langeweile ist kein Problem, sondern der Anfang von Kreativität.',
  'Routine gibt Sicherheit. Kleine Rituale sind wertvoller als perfekte Tage.',
]

function getDayOfYear(): number {
  return Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
}

// Shuffle array deterministically by day
function shuffleByDay<T>(arr: T[]): T[] {
  const day = new Date().getDate()
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (i * day + day) % (i + 1)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function HomePage() {
  const navigate = useNavigate()
  const { children, tukiStars, completedActivities, completedRecipes } = useApp()

  const child = children[0]
  const childAge = child ? getChildAge(child.birthDate) : null
  const childAgeMonths = child ? getChildAgeMonths(child.birthDate) : 0
  const childName = child?.name || ''
  const ageLabel = child ? getAgeLabel(child.birthDate) : ''
  const phaseLabel = childAge !== null ? getPhaseLabel(childAge) : ''

  // Personalized content: filter by age, exclude completed, shuffle daily
  const personalRecipes = childAge !== null
    ? shuffleByDay(getRecipesByAge(childAge).filter(r => !completedRecipes.includes(r.id)))
    : shuffleByDay(getSeasonalRecipes())
  const personalActivities = childAge !== null
    ? shuffleByDay(getActivitiesByAge(childAge).filter(a => !completedActivities.includes(a.id)))
    : shuffleByDay(activities)

  const featuredRecipes = personalRecipes.slice(0, 4)
  const featuredActivities = personalActivities.slice(0, 4)

  // Seasonal extras
  const allSeasonalRecipes = getSeasonalRecipes()
  const seasonKey = getSeasonKey()
  const seasonalActivities = activities.filter(a => a.season.includes(seasonKey as any))

  // Tagesimpuls: pick ONE recipe and ONE activity for today
  const dailyRecipe = personalRecipes.length > 0 ? personalRecipes[0] : null
  const dailyActivity = personalActivities.length > 0 ? personalActivities[0] : null

  // Phase insight
  const phase = child ? getPhaseForAge(childAgeMonths) : null
  const dayOfYear = getDayOfYear()
  const phaseInsight = PHASE_INSIGHTS[dayOfYear % PHASE_INSIGHTS.length]

  return (
    <div className="pb-24">
      <Header />

      {/* Hero Section — personalized */}
      <div className="px-4 mt-2 mb-6">
        <div className="relative rounded-3xl overflow-hidden gradient-mint p-5">
          <div className="relative z-10">
            <p className="text-tuki-rot-dark text-sm font-medium">{getGreeting()} 👋</p>
            <h1 className="text-2xl font-bold text-gray-800 mt-1 leading-tight">
              {childName
                ? <>Was entdecken wir<br />heute mit {childName}?</>
                : <>Was entdecken wir<br />heute zusammen?</>
              }
            </h1>
            {child && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg">{child.avatarEmoji}</span>
                <span className="text-xs text-gray-600 font-medium">{childName} · {ageLabel} · {phaseLabel}</span>
              </div>
            )}
            <div className="flex items-center gap-3 mt-3">
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
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-4 md:grid-cols-4 gap-2 md:gap-3">
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
      </div>

      {/* Tagesimpuls Card */}
      {childName && (dailyRecipe || dailyActivity) && (
        <div className="px-4 mb-6">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100/50">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">✨</span>
              <h3 className="font-semibold text-sm text-gray-800">Tagesimpuls</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {dailyRecipe && (
                <button
                  onClick={() => navigate(`/rezept/${dailyRecipe.id}`)}
                  className="bg-white rounded-xl p-3 text-left shadow-sm active:scale-95 transition-transform"
                >
                  <div className="text-2xl mb-2">{dailyRecipe.emoji}</div>
                  <h4 className="font-semibold text-xs text-gray-800 line-clamp-2">{dailyRecipe.title}</h4>
                  {dailyRecipe.duration && (
                    <p className="text-[10px] text-gray-500 mt-1">⏱️ {dailyRecipe.duration}</p>
                  )}
                  <p className="text-[10px] text-amber-600 font-medium mt-2">Heute kochen →</p>
                </button>
              )}
              {dailyActivity && (
                <button
                  onClick={() => navigate(`/aktivitaet/${dailyActivity.id}`)}
                  className="bg-white rounded-xl p-3 text-left shadow-sm active:scale-95 transition-transform"
                >
                  <div className="text-2xl mb-2">{dailyActivity.emoji}</div>
                  <h4 className="font-semibold text-xs text-gray-800 line-clamp-2">{dailyActivity.title}</h4>
                  {dailyActivity.duration && (
                    <p className="text-[10px] text-gray-500 mt-1">⏱️ {dailyActivity.duration}</p>
                  )}
                  <p className="text-[10px] text-amber-600 font-medium mt-2">Heute entdecken →</p>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Seasonal Banner */}
      <div className="px-4 mb-6">
        <button
          onClick={() => navigate(`/rezepte?season=${getSeasonKey()}`)}
          className="w-full bg-tuki-warm rounded-2xl p-4 border border-orange-100 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{getSeasonEmoji()}</span>
            <div>
              <h3 className="font-semibold text-sm text-gray-800">{getSeasonName()}s-Rezepte</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {allSeasonalRecipes.length} saisonale Ideen für euch entdecken
              </p>
            </div>
            <svg className="ml-auto" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8F5652" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </button>
      </div>

      
      {/* Frühlings-Highlights — Seasonal Content */}
      {seasonKey === 'frühling' && (allSeasonalRecipes.length > 0 || seasonalActivities.length > 0) && (
        <div className="mb-6">
          <div className="px-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🐣</span>
              <h2 className="font-bold text-lg text-gray-800">Frühling & Ostern</h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">Saisonale Rezepte & Aktivitäten für die schönste Jahreszeit</p>
          </div>
          
          {/* Spring Recipes Row */}
          {allSeasonalRecipes.length > 0 && (
            <div>
              <div className="px-4 mb-2">
                <span className="text-xs font-semibold text-tuki-rot-dark">🌷 Frühlings-Rezepte</span>
              </div>
              <div className="flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar snap-x">
                {shuffleByDay(allSeasonalRecipes).slice(0, 6).map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} size="featured" />
                ))}
              </div>
            </div>
          )}

          {/* Spring Activities Row */}
          {seasonalActivities.length > 0 && (
            <div className="mt-4">
              <div className="px-4 mb-2">
                <span className="text-xs font-semibold text-tuki-rot-dark">🦋 Frühlings-Aktivitäten</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4">
                {shuffleByDay(seasonalActivities).slice(0, 4).map(activity => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Featured Recipes — personalized by age */}
      <div>
        <SectionHeader
          title={childName ? `Rezepte für ${childName}` : 'Beliebte Rezepte'}
          emoji="🍳"
          linkTo={`/rezepte?season=${getSeasonKey()}`}
        />
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar snap-x">
          {featuredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} size="featured" />
          ))}
        </div>
      </div>

      {/* Activities — personalized by age */}
      <div className="mt-6">
        <SectionHeader
          title={childName ? `Aktivitäten für ${childName}` : 'Aktivitäten für heute'}
          emoji="🎯"
          linkTo="/aktivitaeten"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4">
          {featuredActivities.slice(0, 4).map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>

      {/* Phase Insight */}
      {child && phase && (
        <div className="mt-6 px-4">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 shadow-sm border border-emerald-100/50">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                <span className="text-emerald-700 text-lg">🌱</span>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-800">{childName} ist gerade in der Phase: {phase.title}</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  {phaseInsight}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Level Progress */}
      <div className="mt-6 px-4 mb-4">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm text-gray-800">🏆 {tukiStars.levelName}</h3>
            <span className="text-xs text-gray-500">Level {tukiStars.level + 1}/5</span>
          </div>
          <div className="w-full h-2 bg-yellow-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((tukiStars.total / 100) * 100, 100)}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-500 mt-1.5">
            Noch {Math.max(0, [10, 25, 50, 100][tukiStars.level] || 100 - tukiStars.total)} Sterne bis zum nächsten Level
          </p>
        </div>
      </div>
    </div>
  )
}
