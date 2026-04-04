import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Activity, categoryInfo } from '../data/activities'
import FavoriteButton from './FavoriteButton'

interface ActivityCardProps {
  activity: Activity
  size?: 'normal' | 'compact'
}

const gradients = [
  'from-teal-400 to-emerald-500',
  'from-blue-400 to-indigo-500',
  'from-amber-400 to-orange-500',
  'from-rose-400 to-pink-500',
  'from-violet-400 to-purple-500',
  'from-cyan-400 to-sky-500',
]

function ImgWithFallback({ src, alt, emoji, className, idx = 0 }: { src: string; alt: string; emoji: string; className?: string; idx?: number }) {
  const [err, setErr] = useState(false)
  const grad = gradients[idx % gradients.length]
  if (err || !src) {
    return (
      <div className={`${className} bg-gradient-to-br ${grad} flex items-center justify-center`}>
        <span className="text-5xl drop-shadow-lg animate-bounce">{emoji}</span>
      </div>
    )
  }
  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setErr(true)} />
}

export default function ActivityCard({ activity, size = 'normal' }: ActivityCardProps) {
  const navigate = useNavigate()
  const cat = categoryInfo[activity.category]
  const idx = activity.id.charCodeAt(0) + activity.id.length

  if (size === 'compact') {
    return (
      <div
        onClick={() => navigate(`/aktivitaet/${activity.id}`)}
        className="bg-white rounded-xl p-3 shadow-md border border-gray-100/80 cursor-pointer flex items-center gap-3 min-w-[240px] snap-start active:scale-[0.96] transition-all duration-200"
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-tuki-mint to-emerald-100 flex items-center justify-center text-2xl shrink-0 shadow-sm">
          {activity.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-gray-800 truncate">{activity.title}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cat.color}`}>
              {cat.label}
            </span>
            <span className="text-[10px] text-gray-400 font-medium">{activity.duration} Min.</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={() => navigate(`/aktivitaet/${activity.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100/80 cursor-pointer active:scale-[0.96] transition-all duration-200"
    >
      <div className="relative h-40">
        <ImgWithFallback src={activity.image} alt={activity.title} emoji={activity.emoji} className="w-full h-full object-cover" idx={idx} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-2.5 right-2.5">
          <FavoriteButton id={activity.id} />
        </div>
        <div className="absolute top-2.5 left-2.5">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm ${cat.color}`}>
            {cat.emoji} {cat.label}
          </span>
        </div>
        <div className="absolute bottom-2.5 left-2.5">
          <span className="bg-black/50 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
            {activity.duration} Min.
          </span>
        </div>
      </div>
      <div className="p-3.5">
        <h3 className="font-bold text-sm text-gray-800">{activity.emoji} {activity.title}</h3>
        <p className="text-gray-500 text-xs mt-1 line-clamp-1">{activity.subtitle}</p>
        <div className="flex items-center gap-3 mt-2.5">
          <span className="text-[11px] text-gray-400 font-medium">
            {activity.ageRange[0]}-{activity.ageRange[1]} J.
          </span>
          <span className="text-[11px] text-amber-400 tracking-wider">
            {'⭐'.repeat(activity.stars)}
          </span>
        </div>
      </div>
    </div>
  )
}
