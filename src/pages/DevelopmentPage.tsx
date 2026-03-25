import { useState } from 'react'
import Header from '../components/Header'
import { useApp } from '../context/AppContext'

interface Milestone {
  id: string
  title: string
  emoji: string
  ageMonths: [number, number]
  category: string
  description: string
}

const milestones: Milestone[] = [
  // 12-18 Monate
  { id: 'm1', title: 'Erste Schritte alleine', emoji: '🚶', ageMonths: [12, 18], category: 'Motorik', description: 'Dein Kind läuft die ersten Schritte ohne Hilfe.' },
  { id: 'm2', title: 'Turm aus 2-3 Klötzen', emoji: '🧱', ageMonths: [12, 18], category: 'Feinmotorik', description: 'Kann Bauklötze stapeln und einen kleinen Turm bauen.' },
  { id: 'm3', title: 'Erste Wörter (5-10)', emoji: '💬', ageMonths: [12, 18], category: 'Sprache', description: 'Sagt bewusst erste Wörter wie Mama, Papa, Ball, Hund...' },
  { id: 'm4', title: 'Aus Becher trinken', emoji: '🥤', ageMonths: [12, 18], category: 'Selbstständigkeit', description: 'Kann mit beiden Händen aus einem offenen Becher trinken.' },
  // 18-24 Monate
  { id: 'm5', title: 'Treppe steigen (mit Hilfe)', emoji: '🚜', ageMonths: [18, 24], category: 'Motorik', description: 'Geht Treppen hoch, hält sich dabei am Geländer oder an der Hand.' },
  { id: 'm6', title: '2-Wort-Sätze', emoji: '👣️', ageMonths: [18, 24], category: 'Sprache', description: '"Mama da", "Ball haben", "Mehr Milch" — erste Zwei-Wort-Kombinationen.' },
  { id: 'm7', title: 'Mit Löffel essen', emoji: '🥄', ageMonths: [18, 24], category: 'Selbstständigkeit', description: 'Kann (meistens) selbst mit dem Löffel essen — auch wenn es kleckert!' },
  { id: 'm8', title: 'Kritzeln mit Stift', emoji: '✏️', ageMonths: [18, 24], category: 'Feinmotorik', description: 'Hält einen Stift und macht bewusste Kritzelstriche auf Papier.' },
  // 2-3 Jahre
  { id: 'm9', title: 'Rennen & Hüpfen', emoji: '🏃', ageMonths: [24, 36], category: 'Motorik', description: 'Kann rennen ohne hinzufallen und versucht zu hüpfen.' },
  { id: 'm10', title: 'Farben benennen', emoji: '🎨', ageMonths: [24, 36], category: 'Kognition', description: 'Erkennt und benennt mindestens 3-4 Grundfarben.' },
  { id: 'm11', title: 'Sich selbst anziehen (teilweise)', emoji: '👕', ageMonths: [24, 36], category: 'Selbstständigkeit', description: 'Kann Schuhe, Mütze oder Jacke (teilweise) selbst an- und ausziehen.' },
  { id: 'm12', title: 'Bis 10 zählen', emoji: '🔢', ageMonths: [24, 36], category: 'Kognition', description: 'Zählt (mit oder ohne Fehler) bis mindestens 10.' },
  // 3-5 Jahre
  { id: 'm13', title: 'Mit Schere schneiden', emoji: '✂️', ageMonths: [36, 60], category: 'Feinmotorik', description: 'Kann mit einer Kinderschere entlang einer Linie schneiden.' },
  { id: 'm14', title: 'Eigenen Namen schreiben', emoji: '📝', ageMonths: [36, 60], category: 'Kognition', description: 'Schreibt (vielleicht spiegelverkehrt) den eigenen Namen.' },
  { id: 'm15', title: 'Freundschaften schliessen', emoji: '🤝', ageMonths: [36, 60], category: 'Sozial', description: 'Spielt gezielt mit bestimmten Kindern und nennt sie "Freund".' },
  { id: 'm16', title: 'Geschichten nacherzählen', emoji: '📖', ageMonths: [36, 60], category: 'Sprache', description: 'Kann eine einfache Geschichte in eigenen Worten nacherzählen.' },
]

const ageGroups = [
  { label: '12-18 Mon.', range: [12, 18] },
  { label: '18-24 Mon.', range: [18, 24] },
  { label: '2-3 Jahre', range: [24, 36] },
  { label: '3-5 Jahre', range: [36, 60] },
]

export default function DevelopmentPage() {
  const [selectedGroup, setSelectedGroup] = useState(0)
  const [achieved, setAchieved] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('tuki-milestones') || '[]')
    } catch { return [] }
  })

  const toggleMilestone = (id: string) => {
    const next = achieved.includes(id) ? achieved.filter(a => a !== id) : [...achieved, id]
    setAchieved(next)
    localStorage.setItem('tuki-milestones', JSON.stringify(next))
  }

  const group = ageGroups[selectedGroup]
  const groupMilestones = milestones.filter(
    m => m.ageMonths[0] >= group.range[0] && m.ageMonths[0] < group.range[1]
  )
  const achievedCount = groupMilestones.filter(m => achieved.includes(m.id)).length
  const progress = groupMilestones.length > 0 ? (achievedCount / groupMilestones.length) * 100 : 0

  return (
    <div className="pb-24">
      <Header title="Entwicklung" />

      {/* Info Banner */}
      <div className="mx-4 mt-2 mb-4 bg-blue-50 rounded-2xl p-4 border border-blue-100">
        <p className="text-xs text-blue-700 leading-relaxed">
          📋 Jedes Kind entwickelt sich in seinem eigenen Tempo. Diese Meilensteine dienen als
          Orientierung — nicht als Checkliste. Bei Fragen sprecht mit eurer Kinderärztin.
        </p>
      </div>

      {/* Age Group Selector */}
      <div className="flex gap-2 px-4 mb-4 overflow-x-auto no-scrollbar">
        {ageGroups.map((ag, i) => (
          <button
            key={i}
            onClick={() => setSelectedGroup(i)}
            className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedGroup === i
                ? 'bg-tuki-rot text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-100'
            }`}
          >
            {ag.label}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">{group.label}</span>
            <span className="text-xs text-gray-500">{achievedCount}/{groupMilestones.length} erreicht</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-tuki-mint to-tuki-mint-dark rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          {progress === 100 && (
            <p
              className="text-xs text-green-600 font-medium mt-2"
            >
              🎉 Alle Meilensteine dieser Phase erreicht!
            </p>
          )}
        </div>
      </div>

      {/* Milestones */}
      <div className="px-4 space-y-3">
        {groupMilestones.map(ms => {
          const done = achieved.includes(ms.id)
          return (
            <div
              key={ms.id}
              className={`rounded-2xl p-4 border transition-colors cursor-pointer ${
                done
                  ? 'bg-green-50 border-green-200'
                  : 'bg-white border-gray-100'
              }`}
              onClick={() => toggleMilestone(ms.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                  done ? 'bg-green-100' : 'bg-gray-50'
                }`}>
                  {done ? '✅' : ms.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-semibold text-sm ${done ? 'text-green-700' : 'text-gray-800'}`}>
                      {ms.title}
                    </h3>
                    <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                      {ms.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{ms.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
