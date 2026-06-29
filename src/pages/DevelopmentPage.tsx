import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import { useApp } from '../context/AppContext'
import { useTranslation } from '../i18n/useTranslation'

interface Milestone {
  id: string
  title: string
  emoji: string
  ageMonths: [number, number]
  category: string
  description: string
}

const milestones: Milestone[] = [
  { id: 'm1', title: 'Erste Schritte alleine', emoji: '🚶', ageMonths: [12, 18], category: 'Motorik', description: 'Dein Kind läuft die ersten Schritte ohne Hilfe.' },
  { id: 'm2', title: 'Turm aus 2-3 Klötzen', emoji: '🧱', ageMonths: [12, 18], category: 'Feinmotorik', description: 'Kann Bauklötze stapeln und einen kleinen Turm bauen.' },
  { id: 'm3', title: 'Erste Wörter (5-10)', emoji: '💬', ageMonths: [12, 18], category: 'Sprache', description: 'Sagt bewusst erste Wörter wie Mama, Papa, Ball, Hund...' },
  { id: 'm4', title: 'Aus Becher trinken', emoji: '🥤', ageMonths: [12, 18], category: 'Selbstständigkeit', description: 'Kann mit beiden Händen aus einem offenen Becher trinken.' },
  { id: 'm5', title: 'Treppe steigen (mit Hilfe)', emoji: '🪜', ageMonths: [18, 24], category: 'Motorik', description: 'Geht Treppen hoch, hält sich dabei am Geländer oder an der Hand.' },
  { id: 'm6', title: '2-Wort-Sätze', emoji: '🗣️', ageMonths: [18, 24], category: 'Sprache', description: 'Mama da, Ball haben, Mehr Milch — erste Zwei-Wort-Kombinationen.' },
  { id: 'm7', title: 'Mit Löffel essen', emoji: '🥄', ageMonths: [18, 24], category: 'Selbstständigkeit', description: 'Kann (meistens) selbst mit dem Löffel essen — auch wenn es kleckert!' },
  { id: 'm8', title: 'Kritzeln mit Stift', emoji: '✏️', ageMonths: [18, 24], category: 'Feinmotorik', description: 'Hält einen Stift und macht bewusste Kritzelstriche auf Papier.' },
  { id: 'm9', title: 'Rennen & Hüpfen', emoji: '🏃', ageMonths: [24, 36], category: 'Motorik', description: 'Kann rennen ohne hinzufallen und versucht zu hüpfen.' },
  { id: 'm10', title: 'Farben benennen', emoji: '🎨', ageMonths: [24, 36], category: 'Kognition', description: 'Erkennt und benennt mindestens 3-4 Grundfarben.' },
  { id: 'm11', title: 'Sich selbst anziehen (teilweise)', emoji: '👕', ageMonths: [24, 36], category: 'Selbstständigkeit', description: 'Kann Schuhe, Mütze oder Jacke (teilweise) selbst an- und ausziehen.' },
  { id: 'm12', title: 'Bis 10 zählen', emoji: '🔢', ageMonths: [24, 36], category: 'Kognition', description: 'Zählt (mit oder ohne Fehler) bis mindestens 10.' },
  { id: 'm13', title: 'Mit Schere schneiden', emoji: '✂️', ageMonths: [36, 60], category: 'Feinmotorik', description: 'Kann mit einer Kinderschere entlang einer Linie schneiden.' },
  { id: 'm14', title: 'Eigenen Namen schreiben', emoji: '📝', ageMonths: [36, 60], category: 'Kognition', description: 'Schreibt (vielleicht spiegelverkehrt) den eigenen Namen.' },
  { id: 'm15', title: 'Freundschaften schliessen', emoji: '🤝', ageMonths: [36, 60], category: 'Sozial', description: 'Spielt gezielt mit bestimmten Kindern und nennt sie Freund.' },
  { id: 'm16', title: 'Geschichten nacherzählen', emoji: '📖', ageMonths: [36, 60], category: 'Sprache', description: 'Kann eine einfache Geschichte in eigenen Worten nacherzählen.' },
  { id: 'm17', title: 'Fahrrad fahren (ohne Stützräder)', emoji: '🚲', ageMonths: [60, 96], category: 'Motorik', description: 'Fährt sicher Fahrrad ohne Stützräder.' },
  { id: 'm18', title: 'Uhr lesen (volle Stunden)', emoji: '🕒', ageMonths: [60, 96], category: 'Kognition', description: 'Kann die Uhr lesen und volle Stunden benennen.' },
  { id: 'm19', title: 'Eigene Meinung vertreten', emoji: '💡', ageMonths: [60, 96], category: 'Sozial', description: 'Kann eigene Wünsche und Meinungen klar formulieren.' },
  { id: 'm20', title: 'Kleine Texte lesen', emoji: '📚', ageMonths: [60, 96], category: 'Sprache', description: 'Liest einfache Wörter und kurze Sätze selbstständig.' },
]

const ageGroups = [
  { label: '12-18 Mon.', range: [12, 18] },
  { label: '18-24 Mon.', range: [18, 24] },
  { label: '2-3 Jahre', range: [24, 36] },
  { label: '3-5 Jahre', range: [36, 60] },
  { label: '5-8 Jahre', range: [60, 96] },
]

function getAgeGroupForChild(birthDate: string): number {
  const birth = new Date(birthDate)
  const now = new Date()
  const ageMonths = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth())
  for (let i = ageGroups.length - 1; i >= 0; i--) {
    if (ageMonths >= ageGroups[i].range[0]) return i
  }
  return 0
}

export default function DevelopmentPage() {
  const { t } = useTranslation()
  const { children: kids, activeChildId, setActiveChild, getActiveChild } = useApp()
  const activeChild = getActiveChild()

  const [selectedGroup, setSelectedGroup] = useState(() => {
    if (activeChild) return getAgeGroupForChild(activeChild.birthDate)
    return 0
  })

  const storageKey = activeChildId ? 'tuki-milestones-' + activeChildId : 'tuki-milestones'
  const [achieved, setAchieved] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '[]')
    } catch { return [] }
  })

  useEffect(() => {
    const key = activeChildId ? 'tuki-milestones-' + activeChildId : 'tuki-milestones'
    try {
      setAchieved(JSON.parse(localStorage.getItem(key) || '[]'))
    } catch { setAchieved([]) }
    if (activeChild) {
      setSelectedGroup(getAgeGroupForChild(activeChild.birthDate))
    }
  }, [activeChildId])

  const toggleMilestone = (id: string) => {
    const next = achieved.includes(id) ? achieved.filter(a => a !== id) : [...achieved, id]
    setAchieved(next)
    localStorage.setItem(storageKey, JSON.stringify(next))
  }

  const group = ageGroups[selectedGroup]
  const groupMilestones = milestones.filter(
    m => m.ageMonths[0] >= group.range[0] && m.ageMonths[0] < group.range[1]
  )
  const achievedCount = groupMilestones.filter(m => achieved.includes(m.id)).length
  const progress = groupMilestones.length > 0 ? (achievedCount / groupMilestones.length) * 100 : 0

  return (
    <div className="pb-24">
      <Header title={t.development.title} />

      {kids.length > 1 && (
        <div className="px-4 mt-1 mb-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {kids.map(child => {
              const isActive = child.id === activeChildId
              return (
                <button key={child.id} onClick={() => setActiveChild(child.id)}
                  className={'flex items-center gap-2 px-3.5 py-2 rounded-full whitespace-nowrap transition-all shrink-0 ' + (isActive ? 'bg-tuki-rot text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200')}
                >
                  <span className="text-base">{child.avatarEmoji}</span>
                  <span className="text-xs font-medium">{child.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {activeChild && (
        <div className="mx-4 mt-2 mb-3 bg-purple-50 rounded-2xl p-3 border border-purple-100">
          <div className="flex items-center gap-2">
            <span className="text-lg">{activeChild.avatarEmoji}</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">{t.development.developmentOf(activeChild.name)}</p>
              <p className="text-xs text-gray-500">{t.development.trackIndividually}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mx-4 mt-2 mb-4 bg-blue-50 rounded-2xl p-4 border border-blue-100">
        <p className="text-xs text-blue-700 leading-relaxed">{t.development.disclaimer}</p>
      </div>
      <div className="flex gap-2 px-4 mb-4 overflow-x-auto no-scrollbar">
        {ageGroups.map((ag, i) => (
          <button key={i} onClick={() => setSelectedGroup(i)}
            className={'px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ' + (selectedGroup === i ? 'bg-tuki-rot text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-100')}
          >{t.development.ageGroups[i] || ag.label}</button>
        ))}
      </div>
      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">{activeChild ? activeChild.name + ': ' + (t.development.ageGroups[selectedGroup] || group.label) : (t.development.ageGroups[selectedGroup] || group.label)}</span>
            <span className="text-xs text-gray-500">{t.development.achieved(achievedCount, groupMilestones.length)}</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-tuki-mint to-tuki-mint-dark rounded-full" animate={{ width: progress + '%' }} transition={{ duration: 0.5 }} />
          </div>
          {progress === 100 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-green-600 font-medium mt-2">{t.development.allAchieved}</motion.p>
          )}
        </div>
      </div>
      <div className="px-4 space-y-3">
        <AnimatePresence mode="wait">
          {groupMilestones.map(ms => {
            const done = achieved.includes(ms.id)
            const mText = (t.development.milestones as Record<string, { title: string; description: string }>)[ms.id] || { title: ms.title, description: ms.description }
            return (
              <motion.div key={ms.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className={'rounded-2xl p-4 border transition-colors cursor-pointer ' + (done ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100')}
                onClick={() => toggleMilestone(ms.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={'w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ' + (done ? 'bg-green-100' : 'bg-gray-50')}>
                    {done ? '✅' : ms.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={'font-semibold text-sm ' + (done ? 'text-green-700' : 'text-gray-800')}>{mText.title}</h3>
                      <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                        {(t.development.milestoneCategories as Record<string, string>)[ms.category.toLowerCase()] || ms.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{mText.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
