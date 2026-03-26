import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useApp } from '../context/AppContext'
import {
  milestones,
  agePhases,
  categoryInfo,
  getMilestonesForAge,
  getPhaseForAge,
  type Milestone,
} from '../data/milestones'
import { recipes } from '../data/recipes'
import { activities } from '../data/activities'

export default function DevelopmentPage() {
  const navigate = useNavigate()
  const { children } = useApp()
  const [selectedPhaseIdx, setSelectedPhaseIdx] = useState(0)
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null)
  const [achieved, setAchieved] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('tuki-milestones') || '[]')
    } catch { return [] }
  })

  // Calculate child age in months
  const childAge = useMemo(() => {
    if (children.length === 0) return 24
    const birth = new Date(children[0].birthDate)
    const now = new Date()
    return (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth())
  }, [children])

  // Auto-select phase based on child age
  useState(() => {
    const idx = agePhases.findIndex(p => childAge >= p.range[0] && childAge < p.range[1])
    if (idx >= 0) setSelectedPhaseIdx(idx)
  })

  const phase = agePhases[selectedPhaseIdx]
  const phaseMilestones = milestones.filter(
    m => m.ageMonths[0] >= phase.range[0] && m.ageMonths[1] <= phase.range[1]
  )
  const achievedCount = phaseMilestones.filter(m => achieved.includes(m.id)).length
  const progress = phaseMilestones.length > 0 ? (achievedCount / phaseMilestones.length) * 100 : 0

  const toggleMilestone = (id: string) => {
    const next = achieved.includes(id) ? achieved.filter(a => a !== id) : [...achieved, id]
    setAchieved(next)
    localStorage.setItem('tuki-milestones', JSON.stringify(next))
  }

  const toggleExpand = (id: string) => {
    setExpandedMilestone(prev => prev === id ? null : id)
  }

  // Find linked recipe/activity objects
  const getLinkedRecipes = (ids: string[]) => recipes.filter(r => ids.includes(r.id))
  const getLinkedActivities = (ids: string[]) => activities.filter(a => ids.includes(a.id))

  // Group milestones by category
  const categories = Object.keys(categoryInfo)
  const milestonesByCategory = categories
    .map(cat => ({
      cat,
      info: categoryInfo[cat],
      items: phaseMilestones.filter(m => m.category === cat),
    }))
    .filter(g => g.items.length > 0)

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      <Header title="Entwicklung" />

      {/* Phase Header with Child Info */}
      <div className="mx-4 mt-2 mb-4">
        <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-2xl p-5 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{children[0]?.avatarEmoji || '👶'}</span>
              <span className="text-white/80 text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full">
                {childAge} Monate
              </span>
            </div>
            <h2 className="text-xl font-bold mt-1">{phase.title}</h2>
            <p className="text-white/80 text-xs mt-1 leading-relaxed max-w-[280px]">
              {phase.description}
            </p>

            {/* Progress Circle */}
            <div className="flex items-center gap-3 mt-4">
              <div className="relative w-14 h-14">
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                  <circle cx="28" cy="28" r="24" fill="none" stroke="white" strokeWidth="4"
                    strokeDasharray={`${progress * 1.508} 150.8`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{Math.round(progress)}%</span>
                </div>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{achievedCount} von {phaseMilestones.length}</p>
                <p className="text-white/70 text-xs">Meilensteine erreicht</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Selector */}
      <div className="flex gap-2 px-4 mb-4 overflow-x-auto no-scrollbar">
        {agePhases.map((ap, i) => (
          <button
            key={ap.id}
            onClick={() => { setSelectedPhaseIdx(i); setExpandedMilestone(null) }}
            className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedPhaseIdx === i
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {ap.label}
          </button>
        ))}
      </div>

      {/* Focus Areas */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {phase.focusAreas.map((area, i) => (
            <span key={i} className="bg-purple-50 text-purple-700 text-[10px] font-medium px-3 py-1.5 rounded-full whitespace-nowrap border border-purple-100">
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <div className="mx-4 mb-4 bg-blue-50 rounded-xl p-3 border border-blue-100">
        <p className="text-[11px] text-blue-700 leading-relaxed">
          ✅ Tippe auf das Kästchen links, um einen Meilenstein als erreicht zu markieren. Jedes Kind entwickelt sich in seinem eigenen Tempo — die Meilensteine dienen als Orientierung.
        </p>
      </div>

      {/* Milestones by Category */}
      <div className="px-4 space-y-5">
        {milestonesByCategory.map(({ cat, info, items }) => (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">{info.emoji}</span>
              <h3 className="text-sm font-bold text-gray-800">{info.label}</h3>
              <span className="text-[10px] text-gray-400">
                {items.filter(m => achieved.includes(m.id)).length}/{items.length}
              </span>
            </div>

            <div className="space-y-2">
              {items.map(ms => {
                const done = achieved.includes(ms.id)
                const expanded = expandedMilestone === ms.id
                const linkedRecipes = getLinkedRecipes(ms.linkedRecipes)
                const linkedActivs = getLinkedActivities(ms.linkedActivities)

                return (
                  <div key={ms.id} className={`rounded-2xl border transition-all ${
                    done ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100'
                  }`}>
                    {/* Main Row */}
                    <div className="p-3 flex items-start gap-3">
                      {/* Checkbox — clear tap target */}
                      <button
                        className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all active:scale-90 ${
                          done
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300 bg-white'
                        }`}
                        onClick={(e) => { e.stopPropagation(); toggleMilestone(ms.id) }}
                        aria-label={done ? 'Als nicht erreicht markieren' : 'Als erreicht markieren'}
                      >
                        {done && (
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>
                      <div className="flex-1 min-w-0" onClick={() => toggleExpand(ms.id)}>
                        <div className="flex items-center gap-2">
                          <span className="text-base">{ms.emoji}</span>
                          <h4 className={`font-semibold text-sm ${done ? 'text-green-700 line-through' : 'text-gray-800'}`}>
                            {ms.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{ms.description}</p>
                      </div>
                      <svg onClick={() => toggleExpand(ms.id)} className={`w-4 h-4 text-gray-400 shrink-0 mt-1 transition-transform cursor-pointer ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>

                    {/* Expanded Detail */}
                    {expanded && (
                      <div className="px-3 pb-3 space-y-3 border-t border-gray-100 pt-3">
                        {/* Expert Tip */}
                        <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-base">💡</span>
                            <div>
                              <span className="text-[11px] font-semibold text-amber-800">Experten-Tipp</span>
                              <span className="text-[10px] text-amber-600 ml-1">— {ms.expertName}</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-amber-800 leading-relaxed">{ms.expertTip}</p>
                          <p className="text-[10px] text-amber-500 mt-1 italic">{ms.expertTitle}</p>
                        </div>

                        {/* Linked Content */}
                        {(linkedRecipes.length > 0 || linkedActivs.length > 0) && (
                          <div>
                            <p className="text-[11px] font-semibold text-gray-700 mb-2">📎 Passende Inhalte</p>
                            <div className="flex gap-2 overflow-x-auto no-scrollbar">
                              {linkedRecipes.map(r => (
                                <div
                                  key={r.id}
                                  onClick={() => navigate(`/rezept/${r.id}`)}
                                  className="bg-white rounded-xl p-2 border border-gray-100 cursor-pointer min-w-[140px] shrink-0 active:scale-95 transition-transform"
                                >
                                  <div className="w-full h-16 rounded-lg overflow-hidden mb-1.5">
                                    <img src={r.image} alt={r.title} className="w-full h-full object-cover" loading="lazy" />
                                  </div>
                                  <p className="text-[10px] font-medium text-gray-700 truncate">{r.emoji} {r.title}</p>
                                  <p className="text-[9px] text-gray-400">Rezept · {r.duration} Min.</p>
                                </div>
                              ))}
                              {linkedActivs.map(a => (
                                <div
                                  key={a.id}
                                  onClick={() => navigate(`/aktivitaet/${a.id}`)}
                                  className="bg-white rounded-xl p-2 border border-gray-100 cursor-pointer min-w-[140px] shrink-0 active:scale-95 transition-transform"
                                >
                                  <div className="w-full h-16 rounded-lg overflow-hidden mb-1.5 bg-tuki-mint-bg flex items-center justify-center">
                                    <span className="text-3xl">{a.emoji}</span>
                                  </div>
                                  <p className="text-[10px] font-medium text-gray-700 truncate">{a.emoji} {a.title}</p>
                                  <p className="text-[9px] text-gray-400">Aktivität · {a.duration} Min.</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>


      {/* Overall Stats */}
      <div className="mx-4 mb-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <h3 className="text-sm font-bold text-gray-800 mb-3">📊 Gesamtüberblick</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-xl font-bold text-purple-600">{achieved.length}</p>
              <p className="text-[10px] text-gray-500">Erreicht</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-amber-500">{milestones.length - achieved.length}</p>
              <p className="text-[10px] text-gray-500">Offen</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-green-600">{Math.round((achieved.length / milestones.length) * 100)}%</p>
              <p className="text-[10px] text-gray-500">Gesamt</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
