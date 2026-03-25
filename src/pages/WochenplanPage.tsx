import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useApp } from '../context/AppContext'
import { recipes, Recipe } from '../data/recipes'
import { activities, Activity } from '../data/activities'

const DAYS = [
  { key: 'mo', label: 'Mo', full: 'Montag' },
  { key: 'di', label: 'Di', full: 'Dienstag' },
  { key: 'mi', label: 'Mi', full: 'Mittwoch' },
  { key: 'do', label: 'Do', full: 'Donnerstag' },
  { key: 'fr', label: 'Fr', full: 'Freitag' },
  { key: 'sa', label: 'Sa', full: 'Samstag' },
  { key: 'so', label: 'So', full: 'Sonntag' },
]

const EXPERT_TIPS = [
  {
    expert: 'Dr. Sarah Keller',
    title: 'Kinderernährung',
    tip: 'Kinder brauchen 5-6 kleine Mahlzeiten am Tag. Bindet sie aktiv in die Zubereitung ein — Kinder essen lieber, was sie selbst gemacht haben!',
    emoji: '👩‍⚕️',
  },
  {
    expert: 'Prof. Martin Weber',
    title: 'Entwicklungspsychologie',
    tip: 'Routinen geben Kindern Sicherheit. Ein fester Wochenplan mit Koch- und Spielzeiten stärkt das Zeitverständnis und die Vorfreude.',
    emoji: '🧠',
  },
  {
    expert: 'Lisa Brunner',
    title: 'Montessori-Pädagogin',
    tip: 'Lasst Kinder selbst wählen! Wenn sie mitentscheiden, was gekocht wird, steigt die Motivation und das Selbstvertrauen.',
    emoji: '🎓',
  },
  {
    expert: 'Dr. Julia Meier',
    title: 'Kinderärztin',
    tip: 'Gemeinsames Kochen fördert die Feinmotorik, das Zählen und die Sprachentwicklung — alles gleichzeitig!',
    emoji: '🏥',
  },
  {
    expert: 'Thomas Huber',
    title: 'Familientherapeut',
    tip: 'Die Küche ist der beste Ort für Familiengespräche. Beim Rüsten und Kochen entstehen die schönsten Dialoge.',
    emoji: '💬',
  },
]

function getCurrentSeason(): string {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return 'frühling'
  if (month >= 5 && month <= 7) return 'sommer'
  if (month >= 8 && month <= 10) return 'herbst'
  return 'winter'
}

function getSeasonASCII(): string {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return 'Fruehling'
  if (month >= 5 && month <= 7) return 'Sommer'
  if (month >= 8 && month <= 10) return 'Herbst'
  return 'Winter'
}

function getWeekNumber(): number {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  const diff = now.getTime() - start.getTime()
  return Math.ceil(diff / (7 * 24 * 60 * 60 * 1000))
}

function getChildAge(birthDate: string): number {
  const birth = new Date(birthDate)
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const m = now.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--
  return Math.max(0, age)
}

function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
}

export default function WochenplanPage() {
  const navigate = useNavigate()
  const { children, completedRecipes, completedActivities, weekPlan, addToWeekPlan, removeFromWeekPlan } = useApp()
  const [selectedDay, setSelectedDay] = useState(DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1].key)

  const weekNum = getWeekNumber()
  const season = getCurrentSeason()
  const seasonASCII = getSeasonASCII()

  const youngestAge = useMemo(() => {
    if (children.length === 0) return 2
    return Math.min(...children.map(c => getChildAge(c.birthDate)))
  }, [children])

  const oldestAge = useMemo(() => {
    if (children.length === 0) return 5
    return Math.max(...children.map(c => getChildAge(c.birthDate)))
  }, [children])

  const suitableRecipes = useMemo(() => {
    return recipes.filter(r => {
      const ageOk = r.ageRange[0] <= oldestAge && r.ageRange[1] >= youngestAge
      const seasonOk = r.season.includes(seasonASCII as any) ||
        r.season.includes(season as any) ||
        r.season.includes('ganzjaehrig' as any) ||
        r.season.includes('ganzjährig' as any)
      return ageOk && seasonOk
    })
  }, [youngestAge, oldestAge, season, seasonASCII])

  const suitableActivities = useMemo(() => {
    return activities.filter(a => {
      const ageOk = a.ageRange[0] <= oldestAge && a.ageRange[1] >= youngestAge
      const seasonOk = a.season.includes(season as any) ||
        a.season.includes('ganzjährig' as any)
      return ageOk && seasonOk
    })
  }, [youngestAge, oldestAge, season])

  const generatedPlan = useMemo(() => {
    const rand = seededRandom(weekNum * 7919)
    const plan: Record<string, { recipes: Recipe[]; activity: Activity | null }> = {}
    const shuffledRecipes = [...suitableRecipes].sort(() => rand() - 0.5)
    const shuffledActivities = [...suitableActivities].sort(() => rand() - 0.5)
    const uncompletedRecipes = shuffledRecipes.filter(r => !completedRecipes.includes(r.id))
    const completedRecipesList = shuffledRecipes.filter(r => completedRecipes.includes(r.id))
    const orderedRecipes = [...uncompletedRecipes, ...completedRecipesList]
    const uncompletedActivities = shuffledActivities.filter(a => !completedActivities.includes(a.id))
    const completedActivitiesList = shuffledActivities.filter(a => completedActivities.includes(a.id))
    const orderedActivities = [...uncompletedActivities, ...completedActivitiesList]
    let recipeIdx = 0
    let activityIdx = 0
    DAYS.forEach((day) => {
      const dayRecipes: Recipe[] = []
      for (let i = 0; i < 2 && recipeIdx < orderedRecipes.length; i++) {
        dayRecipes.push(orderedRecipes[recipeIdx % orderedRecipes.length])
        recipeIdx++
      }
      const activity = orderedActivities.length > 0
        ? orderedActivities[activityIdx % orderedActivities.length]
        : null
      activityIdx++
      plan[day.key] = { recipes: dayRecipes, activity }
    })
    return plan
  }, [weekNum, suitableRecipes, suitableActivities, completedRecipes, completedActivities])

  const dayPlan = generatedPlan[selectedDay] || { recipes: [], activity: null }
  const customItems = weekPlan[selectedDay] || []
  const todayTip = EXPERT_TIPS[new Date().getDay() % EXPERT_TIPS.length]
  const selectedDayFull = DAYS.find(d => d.key === selectedDay)?.full || ''

  return (
    <div className="pb-24">
      <Header title="Wochenplan" />

      {/* Week Overview */}
      <div className="px-4 mt-2 mb-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-bold text-base text-gray-800">Kalenderwoche {weekNum}</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {children.length > 0
                  ? `Personalisiert für ${children.map(c => c.name).join(' & ')}`
                  : 'Erstelle ein Kinderprofil für personalisierte Vorschläge'
                }
              </p>
            </div>
            <button onClick={() => navigate('/profil')} className="text-xs text-tuki-rot font-medium">
              {children.length === 0 ? '+ Kind' : 'Profil'}
            </button>
          </div>
          <div className="flex gap-1.5">
            {DAYS.map(day => {
              const isToday = day.key === DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1].key
              const isSelected = day.key === selectedDay
              const hasItems = (generatedPlan[day.key]?.recipes.length || 0) > 0
              return (
                <button key={day.key} onClick={() => setSelectedDay(day.key)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all relative ${
                    isSelected ? 'bg-tuki-rot text-white shadow-md'
                    : isToday ? 'bg-tuki-mint text-tuki-rot-dark'
                    : 'bg-gray-50 text-gray-500'
                  }`}>
                  {day.label}
                  {hasItems && !isSelected && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-tuki-rot rounded-full" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="px-4 mb-3">
        <h3 className="font-bold text-lg text-gray-800">{selectedDayFull}</h3>
        <p className="text-xs text-gray-500">
          {dayPlan.recipes.length} Rezepte · {dayPlan.activity ? '1 Aktivität' : 'Keine Aktivität'}
        </p>
      </div>

      {/* Recipes for the Day */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">🍳</span>
          <h4 className="font-semibold text-sm text-gray-700">Rezepte</h4>
        </div>
        <div className="space-y-3">
          {dayPlan.recipes.map((recipe) => (
            <button key={recipe.id} onClick={() => navigate(`/rezept/${recipe.id}`)}
              className="w-full bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex items-center gap-3 text-left active:scale-[0.98] transition-transform">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-gray-800 truncate">{recipe.emoji} {recipe.title}</h4>
                <p className="text-xs text-gray-500 truncate">{recipe.subtitle}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-gray-400">{recipe.duration} Min.</span>
                  <span className="text-[10px] text-gray-400">·</span>
                  <span className="text-[10px] text-gray-400">{recipe.ageRange[0]}-{recipe.ageRange[1]} J.</span>
                  <span className="text-[10px] text-gray-400">·</span>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                    recipe.difficulty === 'leicht' ? 'bg-green-100 text-green-700' :
                    recipe.difficulty === 'mittel' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {recipe.difficulty === 'leicht' ? '⚡' : recipe.difficulty === 'mittel' ? '🔥' : '🌟'} {recipe.difficulty}
                  </span>
                </div>
              </div>
              {completedRecipes.includes(recipe.id) && (
                <span className="text-green-500 text-lg shrink-0">✓</span>
              )}
            </button>
          ))}
          {dayPlan.recipes.length === 0 && (
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400">Keine Rezepte für diesen Tag</p>
            </div>
          )}
        </div>
      </div>

      {/* Activity for the Day */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">🎯</span>
          <h4 className="font-semibold text-sm text-gray-700">Aktivität</h4>
        </div>
        {dayPlan.activity ? (
          <button onClick={() => navigate(`/aktivitaet/${dayPlan.activity!.id}`)}
            className="w-full bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100/50 flex items-center gap-3 text-left active:scale-[0.98] transition-transform">
            <div className="w-14 h-14 rounded-xl bg-white/80 flex items-center justify-center text-2xl shrink-0">
              {dayPlan.activity.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-gray-800 truncate">{dayPlan.activity.title}</h4>
              <p className="text-xs text-gray-500 truncate">{dayPlan.activity.subtitle}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-gray-400">{dayPlan.activity.duration} Min.</span>
                <span className="text-[10px] text-gray-400">·</span>
                <span className="text-[10px] text-purple-500 font-medium">
                  {dayPlan.activity.learningGoals[0]}
                </span>
              </div>
            </div>
            {completedActivities.includes(dayPlan.activity.id) && (
              <span className="text-green-500 text-lg shrink-0">✓</span>
            )}
          </button>
        ) : (
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-400">Keine Aktivität für diesen Tag</p>
          </div>
        )}
      </div>

      {/* Weekly Progress */}
      <div className="px-4 mb-4">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200/50">
          <h4 className="font-semibold text-sm text-gray-800 mb-2">{'📊'} Wochenfortschritt</h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-lg font-bold text-tuki-rot">
                {Object.values(generatedPlan).reduce((acc, d) =>
                  acc + d.recipes.filter(r => completedRecipes.includes(r.id)).length, 0
                )}
              </p>
              <p className="text-[10px] text-gray-500">Rezepte gekocht</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-purple-600">
                {Object.values(generatedPlan).reduce((acc, d) =>
                  acc + (d.activity && completedActivities.includes(d.activity.id) ? 1 : 0), 0
                )}
              </p>
              <p className="text-[10px] text-gray-500">Aktivitäten</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-green-600">
                {Math.round(
                  ((Object.values(generatedPlan).reduce((acc, d) =>
                    acc + d.recipes.filter(r => completedRecipes.includes(r.id)).length +
                    (d.activity && completedActivities.includes(d.activity.id) ? 1 : 0), 0
                  ) / Math.max(1, Object.values(generatedPlan).reduce((acc, d) =>
                    acc + d.recipes.length + (d.activity ? 1 : 0), 0
                  ))) * 100)
                )}%
              </p>
              <p className="text-[10px] text-gray-500">Geschafft</p>
            </div>
          </div>
        </div>
      </div>

      {/* Expert Tip */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-tuki-mint flex items-center justify-center shrink-0 text-lg">
              {todayTip.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-sm text-gray-800">{todayTip.expert}</h4>
                <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{todayTip.title}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{todayTip.tip}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => navigate('/rezepte')}
            className="bg-tuki-mint/30 rounded-2xl p-3 text-center border border-tuki-mint/50 active:scale-95 transition-transform">
            <span className="text-2xl block mb-1">{'🍳'}</span>
            <p className="text-xs font-medium text-tuki-rot-dark">Alle Rezepte</p>
          </button>
          <button onClick={() => navigate('/aktivitaeten')}
            className="bg-purple-50 rounded-2xl p-3 text-center border border-purple-100 active:scale-95 transition-transform">
            <span className="text-2xl block mb-1">{'🎯'}</span>
            <p className="text-xs font-medium text-purple-700">Alle Aktivitäten</p>
          </button>
        </div>
      </div>
    </div>
  )
}
