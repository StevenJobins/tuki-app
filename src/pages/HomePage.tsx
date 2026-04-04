import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
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
  if (hour < 6) return 'Gute Nacht'
  if (hour < 11) return 'Guten Morgen'
  if (hour < 14) return 'Mahlzeit'
  if (hour < 18) return 'Guten Nachmittag'
  return 'Guten Abend'
}

function getGreetingEmoji(): string {
  const hour = new Date().getHours()
  if (hour < 6) return '🌙'
  if (hour < 11) return '☀️'
  if (hour < 14) return '🍝'
  if (hour < 18) return '🌞'
  return '🌅'
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

function getPhaseInsight(age: number): { title: string; text: string; emoji: string } {
  if (age < 1) return { emoji: '🌱', title: 'Entdeckungsphase', text: 'Dein Baby entdeckt die Welt mit allen Sinnen. Einfache Texturen und Geschmäcker sind jetzt perfekt!' }
  if (age < 2) return { emoji: '🚶', title: 'Kleine Schritte, grosse Abenteuer', text: 'Dein Kind wird immer selbstständiger. Lass es Zutaten anfassen und einfache Aufgaben übernehmen.' }
  if (age < 3) return { emoji: '🎨', title: 'Kreative Entfaltung', text: 'Die Fantasie blüht! Rühren, kneten und dekorieren — dein Kind liebt es, aktiv mitzumachen.' }
  if (age < 5) return { emoji: '🧪', title: 'Kleine Forscher', text: 'Warum ist das so? Dein Kind stellt viele Fragen. Nutze Kochen und Basteln zum spielerischen Lernen.' }
  return { emoji: '👩‍🍳', title: 'Mini-Chef im Einsatz', text: 'Dein Kind kann schon richtig mithelfen! Einfache Rezepte selbst zubereiten stärkt das Selbstvertrauen.' }
}

const DAILY_TIPS = [
  'Lass dein Kind die Zutaten für das Abendessen aus dem Kühlschrank holen — im Tuki erreicht es alles auf Augenhöhe.',
  'Kinder lieben Rituale: Eine feste Koch-Zeit am Wochenende stärkt die Familienbindung.',
  'Tipp: Benenne Farben und Formen beim Kochen — so lernt dein Kind ganz nebenbei.',
  'Lass dein Kind den Tisch decken — das fördert Zählen, Sortieren und Stolz auf die eigene Leistung.',
  'Gemeinsam einkaufen gehen: Lass dein Kind Obst und Gemüse auswählen und dabei die Sinne nutzen.',
  'Heute mal ein Picknick im Wohnzimmer? Kinder lieben kreative Essorte!',
  'Lass dein Kind mitbestimmen, was heute gekocht wird — das steigert die Freude am Essen.',
]

const MOTIVATIONAL = [
  'Ihr macht das super! 💪',
  'Weiter so, Familie! 🌟',
  'Jeder Stern zählt! ⭐',
  'Ihr seid ein tolles Team! 🤝',
  'Kochen verbindet! ❤️',
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

export default function HomePage() {
  const navigate = useNavigate()
  const { tukiStars, completedActivities, completedRecipes, children, activeChildId, setActiveChild, getChildAge, getActiveChild } = useApp()
  const activeChild = getActiveChild()
  const childAge = getChildAge()
  const [waveAnim, setWaveAnim] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setWaveAnim(true), 500)
    return () => clearTimeout(t)
  }, [])

  const seasonalRecipes = getSeasonalRecipes()
  const ageFilteredRecipes = childAge !== null
    ? seasonalRecipes.filter(r => childAge >= r.ageRange[0] && childAge <= r.ageRange[1])
    : seasonalRecipes
  const displayRecipes = ageFilteredRecipes.length > 0 ? ageFilteredRecipes.slice(0, 6) : seasonalRecipes.slice(0, 4)
  const ageFilteredActivities = childAge !== null
    ? activities.filter(a => childAge >= a.ageRange[0] && childAge <= a.ageRange[1])
    : activities
  const displayActivities = ageFilteredActivities.slice(0, 4)
  const phase = childAge !== null ? getPhaseInsight(childAge) : null

  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  const dailyTip = DAILY_TIPS[dayOfYear % DAILY_TIPS.length]
  const motivation = MOTIVATIONAL[dayOfYear % MOTIVATIONAL.length]
  const totalDone = completedActivities.length + completedRecipes.length

  // Simple streak: based on total completed items
  const streakDays = Math.min(totalDone, 30)

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="pb-24">
      <Header />

      {/* Child Switcher */}
      {children.length > 1 && (
        <motion.div variants={item} className="px-4 mt-1 mb-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {children.map(child => {
              const isActive = child.id === activeChildId
              return (
                <button key={child.id} onClick={() => setActiveChild(child.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full whitespace-nowrap transition-all shrink-0 ${
                    isActive ? 'bg-tuki-rot text-white shadow-md shadow-red-500/20' : 'bg-white text-gray-600 border border-gray-200'
                  }`}>
                  <span className="text-base">{child.avatarEmoji}</span>
                  <span className="text-xs font-medium">{child.name}</span>
                </button>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Hero Section - Upgraded */}
      <motion.div variants={item} className="px-4 mt-2 mb-5">
        <div className="relative rounded-3xl overflow-hidden gradient-mint p-5">
          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <span className={`text-lg ${waveAnim ? 'animate-wiggle' : ''}`}>{getGreetingEmoji()}</span>
              <p className="text-tuki-rot-dark text-sm font-medium">
                {getGreeting()}{activeChild ? ', ' + activeChild.name : ''}!
              </p>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mt-1.5 leading-tight">
              {activeChild
                ? <>Was entdecken wir <br />heute zusammen?</>
                : <>Was entdecken wir<br />heute zusammen?</>
              }
            </h1>

            {/* Stats Row */}
            <div className="flex items-center gap-2.5 mt-4">
              {/* Streak */}
              {streakDays > 0 && (
                <div className="glass rounded-xl px-3 py-2 flex items-center gap-2 shadow-sm">
                  <span className="animate-flame text-base">🔥</span>
                  <div>
                    <p className="text-xs font-bold text-gray-700">{streakDays}</p>
                    <p className="text-[9px] text-gray-500">Streak</p>
                  </div>
                </div>
              )}
              <div className="glass rounded-xl px-3 py-2 flex items-center gap-2 shadow-sm">
                <span>⭐</span>
                <div>
                  <p className="text-xs font-bold text-gray-700">{tukiStars.total}</p>
                  <p className="text-[9px] text-gray-500">{tukiStars.levelName}</p>
                </div>
              </div>
              <div className="glass rounded-xl px-3 py-2 flex items-center gap-2 shadow-sm">
                <span>✅</span>
                <div>
                  <p className="text-xs font-bold text-gray-700">{totalDone}</p>
                  <p className="text-[9px] text-gray-500">Erledigt</p>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/20" />
          <div className="absolute -right-2 bottom-0 w-20 h-20 rounded-full bg-white/15" />
          <div className="absolute left-1/2 -top-3 w-16 h-16 rounded-full bg-white/10" />
        </div>
      </motion.div>

      {/* Motivation Banner - small and cute */}
      <motion.div variants={item} className="px-4 mb-4">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl px-4 py-2.5 border border-amber-100/50 flex items-center gap-2">
          <span className="text-sm animate-float">🌟</span>
          <p className="text-xs text-amber-800 font-medium">{motivation}</p>
        </div>
      </motion.div>

      {/* Phase Insight */}
      {phase && activeChild && (
        <motion.div variants={item} className="px-4 mb-5">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100/50">
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

      {/* Quick Actions - with card-lift */}
      <motion.div variants={item} className="px-4 mb-5">
        <div className="grid grid-cols-4 gap-2">
          {[
            { emoji: '🍳', label: 'Rezepte', path: '/rezepte' },
            { emoji: '🎮', label: 'Aktivitäten', path: '/aktivitaeten' },
            { emoji: '📊', label: 'Entwicklung', path: '/entwicklung' },
            { emoji: '👨‍👩‍👧', label: 'Community', path: '/community' },
          ].map(action => (
            <button key={action.path} onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-1.5 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 card-lift active:scale-95 transition-transform">
              <span className="text-2xl">{action.emoji}</span>
              <span className="text-[10px] font-medium text-gray-600">{action.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Seasonal Banner */}
      <motion.div variants={item} className="px-4 mb-5">
        <button onClick={() => navigate('/rezepte')}
          className="w-full bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-100/50 text-left card-lift transition-all">
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-float">{getSeasonEmoji()}</span>
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-gray-800">{getSeasonName()}s-Rezepte</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {childAge !== null
                  ? `${ageFilteredRecipes.length} passende Ideen für ${activeChild?.name}`
                  : `${seasonalRecipes.length} saisonale Ideen entdecken`
                }
              </p>
            </div>
            <svg className="ml-auto shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8F5652" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </button>
      </motion.div>

      {/* Kühlschrank-Check Banner */}
      <motion.div variants={item} className="px-4 mb-5">
        <button onClick={() => navigate('/zutaten-check')}
          className="w-full bg-gradient-to-r from-tuki-mint-bg to-green-50 rounded-2xl p-4 border border-green-100/50 text-left card-lift transition-all">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧊</span>
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-gray-800">Kühlschrank-Check</h3>
              <p className="text-xs text-gray-500 mt-0.5">Was kannst du mit deinen Zutaten kochen?</p>
            </div>
            <svg className="ml-auto shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8F5652" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </button>
      </motion.div>

      {/* Featured Recipes */}
      <motion.div variants={item}>
        <SectionHeader title={activeChild ? `Rezepte für ${activeChild.name}` : 'Beliebte Rezepte'} emoji="🍳" linkTo="/rezepte" />
        <div className="flex gap-4 overflow-x-auto px-4 py-3 no-scrollbar snap-x max-w-full">
          {displayRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} size="featured" />
          ))}
        </div>
      </motion.div>

      {/* Activities */}
      <motion.div variants={item} className="mt-6">
        <SectionHeader title={activeChild ? `Aktivitäten für ${activeChild.name}` : 'Aktivitäten für heute'} emoji="🎯" linkTo="/aktivitaeten" />
        <div className="grid grid-cols-2 gap-3 px-4 py-2">
          {displayActivities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </motion.div>

      {/* Tuki Tip of the Day */}
      <motion.div variants={item} className="mt-6 px-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl gradient-rot flex items-center justify-center shrink-0 shadow-sm">
              <span className="text-white text-lg">💡</span>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-800">Tuki-Tipp des Tages</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{dailyTip}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Level Progress - Premium */}
      <motion.div variants={item} className="mt-6 px-4 mb-4">
        <div className="bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 rounded-2xl p-4 border border-yellow-200/50 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-sm text-gray-800">🏆 {tukiStars.levelName}</h3>
            <span className="text-[10px] font-semibold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">Level {tukiStars.level + 1}/5</span>
          </div>
          <div className="w-full h-2.5 bg-yellow-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((tukiStars.total / 100) * 100, 100)}%` }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
            />
          </div>
          <p className="text-[10px] text-gray-500 mt-1.5">
            Noch {Math.max(0, [10, 25, 50, 100][tukiStars.level] || 100 - tukiStars.total)} Sterne bis zum nächsten Level 🌟
          </p>
        </div>
      </motion.div>

      {/* No children prompt */}
      {children.length === 0 && (
        <motion.div variants={item} className="px-4 mb-4">
          <button onClick={() => navigate('/profil')}
            className="w-full bg-gradient-to-r from-tuki-mint to-green-50 rounded-2xl p-4 border border-green-200/50 text-left card-lift transition-all">
            <div className="flex items-center gap-3">
              <span className="text-2xl animate-float">👶</span>
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-gray-800">Kind hinzufügen</h3>
                <p className="text-xs text-gray-500 mt-0.5">Für personalisierte Inhalte & Altersempfehlungen</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8F5652" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </div>
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
