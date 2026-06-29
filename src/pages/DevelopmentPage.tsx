import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import { useTranslation } from '../i18n/useTranslation'

interface MilestoneMeta {
  id: string
  emoji: string
  ageMonths: [number, number]
  category: string
}

const milestones: MilestoneMeta[] = [
  // 12-18 Monate
  { id: 'm1', emoji: '🚶', ageMonths: [12, 18], category: 'motorik' },
  { id: 'm2', emoji: '🧱', ageMonths: [12, 18], category: 'feinmotorik' },
  { id: 'm3', emoji: '💬', ageMonths: [12, 18], category: 'sprache' },
  { id: 'm4', emoji: '🥤', ageMonths: [12, 18], category: 'selbstständigkeit' },
  // 18-24 Monate
  { id: 'm5', emoji: '🪜', ageMonths: [18, 24], category: 'motorik' },
  { id: 'm6', emoji: '🗣️', ageMonths: [18, 24], category: 'sprache' },
  { id: 'm7', emoji: '🥄', ageMonths: [18, 24], category: 'selbstständigkeit' },
  { id: 'm8', emoji: '✏️', ageMonths: [18, 24], category: 'feinmotorik' },
  // 2-3 Jahre
  { id: 'm9', emoji: '🏃', ageMonths: [24, 36], category: 'motorik' },
  { id: 'm10', emoji: '🎨', ageMonths: [24, 36], category: 'kognition' },
  { id: 'm11', emoji: '👕', ageMonths: [24, 36], category: 'selbstständigkeit' },
  { id: 'm12', emoji: '🔢', ageMonths: [24, 36], category: 'kognition' },
  // 3-5 Jahre
  { id: 'm13', emoji: '✂️', ageMonths: [36, 60], category: 'feinmotorik' },
  { id: 'm14', emoji: '📝', ageMonths: [36, 60], category: 'kognition' },
  { id: 'm15', emoji: '🤝', ageMonths: [36, 60], category: 'sozial' },
  { id: 'm16', emoji: '📖', ageMonths: [36, 60], category: 'sprache' },
]

const ageGroupRanges: [number, number][] = [
  [12, 18],
  [18, 24],
  [24, 36],
  [36, 60],
]

export default function DevelopmentPage() {
  const { t } = useTranslation()
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

  const milestoneText = t.development.milestones as Record<string, { title: string; description: string }>
  const categoryLabels = t.development.milestoneCategories as Record<string, string>

  const range = ageGroupRanges[selectedGroup]
  const groupLabel = t.development.ageGroups[selectedGroup]
  const groupMilestones = milestones.filter(
    m => m.ageMonths[0] >= range[0] && m.ageMonths[0] < range[1]
  )
  const achievedCount = groupMilestones.filter(m => achieved.includes(m.id)).length
  const progress = groupMilestones.length > 0 ? (achievedCount / groupMilestones.length) * 100 : 0

  return (
    <div className="pb-24">
      <Header title={t.development.title} />

      {/* Info Banner */}
      <div className="mx-4 mt-2 mb-4 bg-blue-50 rounded-2xl p-4 border border-blue-100">
        <p className="text-xs text-blue-700 leading-relaxed">
          {t.development.disclaimer}
        </p>
      </div>

      {/* Age Group Selector */}
      <div className="flex gap-2 px-4 mb-4 overflow-x-auto no-scrollbar">
        {ageGroupRanges.map((_, i) => (
          <button
            key={i}
            onClick={() => setSelectedGroup(i)}
            className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedGroup === i
                ? 'bg-tuki-rot text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-100'
            }`}
          >
            {t.development.ageGroups[i]}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">{groupLabel}</span>
            <span className="text-xs text-gray-500">{t.development.achieved(achievedCount, groupMilestones.length)}</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-tuki-mint to-tuki-mint-dark rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {progress === 100 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-green-600 font-medium mt-2"
            >
              {t.development.allAchieved}
            </motion.p>
          )}
        </div>
      </div>

      {/* Milestones */}
      <div className="px-4 space-y-3">
        <AnimatePresence mode="wait">
          {groupMilestones.map(ms => {
            const done = achieved.includes(ms.id)
            const text = milestoneText[ms.id] || { title: ms.id, description: '' }
            return (
              <motion.div
                key={ms.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
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
                        {text.title}
                      </h3>
                      <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                        {categoryLabels[ms.category] || ms.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{text.description}</p>
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
