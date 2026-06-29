import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, getTranslatedCategoryInfo } from '../data/activities'
import FavoriteButton from './FavoriteButton'
import { useTranslation } from '../i18n/useTranslation'
import { useApp } from '../context/AppContext'

interface ActivityCardProps {
  activity: Activity
  size?: 'normal' | 'compact'
}

export default function ActivityCard({ activity, size = 'normal' }: ActivityCardProps) {
  const navigate = useNavigate()
  const { t, language } = useTranslation()
  const { completedActivities } = useApp()
  const catInfo = getTranslatedCategoryInfo(language)
  const cat = catInfo[activity.category]
  const isDone = completedActivities.includes(activity.id)

  if (size === 'compact') {
    return (
      <motion.div
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate(`/aktivitaet/${activity.id}`)}
        className={`bg-white rounded-xl p-3 shadow-sm border cursor-pointer flex items-center gap-3 min-w-[240px] snap-start ${
          isDone ? 'border-green-400 ring-1 ring-green-400' : 'border-gray-100'
        }`}
      >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${isDone ? 'bg-green-50' : 'bg-tuki-mint-bg'}`}>
          {isDone ? '✅' : activity.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-gray-800 truncate">{activity.title}</h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${cat.color}`}>
              {cat.label}
            </span>
            <span className="text-[10px] text-gray-400">{activity.duration} {t.common.min}</span>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(`/aktivitaet/${activity.id}`)}
      className={`bg-white rounded-2xl overflow-hidden shadow-sm border cursor-pointer ${
        isDone ? 'border-green-400 ring-2 ring-green-400' : 'border-gray-100'
      }`}
    >
      <div className="relative h-36">
        <img
          src={activity.image}
          alt={activity.title}
          className={`w-full h-full object-cover ${isDone ? 'opacity-90' : ''}`}
          loading="lazy"
        />
        <div className="absolute top-2 right-2">
          <FavoriteButton id={activity.id} />
        </div>
        <div className="absolute top-2 left-2">
          <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${cat.color}`}>
            {cat.emoji} {cat.label}
          </span>
        </div>
        {isDone && (
          <div className="absolute bottom-2 left-2">
            <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full bg-green-500 text-white shadow-sm">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              {t.activitiesPage.done}
            </span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm text-gray-800">{activity.emoji} {activity.title}</h3>
        <p className="text-gray-500 text-xs mt-0.5">{activity.subtitle}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-[11px] text-gray-400 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {activity.duration} {t.common.min}
          </span>
          <span className="text-[11px] text-gray-400">
            {activity.ageRange[0]}-{activity.ageRange[1]} {t.common.yearsShort}
          </span>
          <span className="text-[11px] text-gray-400">
            {'⭐'.repeat(activity.stars)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
