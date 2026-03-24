import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, categoryInfo } from '../data/activities'
import FavoriteButton from './FavoriteButton'

interface ActivityCardProps {
  activity: Activity
  size?: 'normal' | 'compact'
}

export default function ActivityCard({ activity, size = 'normal' }: ActivityCardProps) {
  const navigate = useNavigate()
  const cat = categoryInfo[activity.category]

  if (size === 'compact') {
    return (
      <motion.div
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate(`/aktivitaet/${activity.id}`)}
        className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 cursor-pointer flex items-center gap-3 min-w-[240px] snap-start"
      >
        <div className="w-12 h-12 rounded-xl bg-tuki-mint-bg flex items-center justify-center text-2xl shrink-0">
          {activity.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-gray-800 truncate">{activity.title}</h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${cat.color}`}>
              {cat.label}
            </span>
            <span className="text-[10px] text-gray-400">{activity.duration} Min.</span>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(`/aktivitaet/${activity.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
    >
      <div className="relative h-36">
        <img
          src={activity.image}
          alt={activity.title}
          className="w-full h-full object-cover"
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
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm text-gray-800">{activity.emoji} {activity.title}</h3>
        <p className="text-gray-500 text-xs mt-0.5">{activity.subtitle}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-[11px] text-gray-400 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {activity.duration} Min.
          </span>
          <span className="text-[11px] text-gray-400">
            {activity.ageRange[0]}-{activity.ageRange[1]} J.
          </span>
          <span className="text-[11px] text-gray-400">
            {'⭐'.repeat(activity.stars)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
