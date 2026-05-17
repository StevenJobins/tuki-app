import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import AgeFilter from '../components/AgeFilter'
import ActivityCard from '../components/ActivityCard'
import { activities, getTranslatedActivity, getTranslatedCategoryInfo } from '../data/activities'
import { useApp } from '../context/AppContext'
import { useTranslation } from '../i18n/useTranslation'

function getAgeRange(age: number): string {
  if (age <= 1) return '1-2'
  if (age <= 2) return '1-2'
  if (age <= 3) return '2-3'
  if (age <= 5) return '3-5'
  return '5-8'
}

export default function ActivitiesPage() {
  const { t, language } = useTranslation()
  const { getChildAge, getActiveChild, children, activeChildId, setActiveChild } = useApp()
  const childAge = getChildAge()
  const activeChild = getActiveChild()

  const autoAgeFilter = childAge !== null ? getAgeRange(childAge) : 'all'
  const [ageFilter, setAgeFilter] = useState(autoAgeFilter)
  const [catFilter, setCatFilter] = useState('all')

  const translatedCategoryInfo = getTranslatedCategoryInfo(language)
  const categories = [
    { value: 'all', label: t.common.all, emoji: '🎯' },
    ...Object.entries(translatedCategoryInfo).map(([key, val]) => ({
      value: key,
      label: val.label,
      emoji: val.emoji,
    })),
  ]

  const filtered = activities.filter(a => {
    if (ageFilter !== 'all') {
      const [min, max] = ageFilter.split('-').map(Number)
      if (a.ageRange[0] > max || a.ageRange[1] < min) return false
    }
    if (catFilter !== 'all' && a.category !== catFilter) return false
    return true
  })

  return (
    <div className="pb-24">
      <Header title={t.activitiesPage.title} />

      {/* Child Switcher */}
      {children.length > 1 && (
        <div className="flex gap-2 px-4 mb-3 overflow-x-auto no-scrollbar py-1">
          {children.map(child => {
            const isActive = child.id === activeChildId
            return (
              <button
                key={child.id}
                onClick={() => {
                  setActiveChild(child.id)
                  const age = getChildAge(child.id)
                  if (age !== null) setAgeFilter(getAgeRange(age))
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-tuki-rot text-white'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                <span>{child.avatarEmoji}</span>
                {child.name}
              </button>
            )
          })}
        </div>
      )}

      {/* Category chips */}
      <div className="flex gap-2 px-4 mb-3 overflow-x-auto no-scrollbar py-1">
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setCatFilter(cat.value)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              catFilter === cat.value
                ? 'bg-tuki-rot text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-100'
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Age Filter */}
      <div className="mb-4">
        <AgeFilter selected={ageFilter} onChange={setAgeFilter} />
      </div>

      {/* Results */}
      <div className="px-4 mb-3">
        <p className="text-xs text-gray-400">
          {t.activitiesPage.resultsCount(filtered.length, activeChild?.name)}
        </p>
      </div>

      {/* Activity Grid */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4 px-4"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.05 } },
        }}
      >
        {filtered.map(activity => (
          <motion.div
            key={activity.id}
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          >
            <ActivityCard activity={getTranslatedActivity(activity, language)} />
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-12 px-4">
          <span className="text-4xl block mb-3">🎯</span>
          <p className="text-gray-500 text-sm">{t.activitiesPage.noResults}</p>
          <p className="text-gray-400 text-xs mt-1">{t.common.tryOtherFilter}</p>
        </div>
      )}
    </div>
  )
}
