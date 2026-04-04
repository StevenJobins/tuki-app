import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Recipe } from '../data/recipes'
import FavoriteButton from './FavoriteButton'

interface RecipeCardProps {
  recipe: Recipe
  size?: 'normal' | 'featured'
}

const gradients = [
  'from-orange-400 to-rose-400',
  'from-emerald-400 to-teal-500',
  'from-violet-400 to-purple-500',
  'from-amber-400 to-orange-500',
  'from-sky-400 to-blue-500',
  'from-pink-400 to-fuchsia-500',
]

function ImgWithFallback({ src, alt, emoji, className, idx = 0 }: { src: string; alt: string; emoji: string; className?: string; idx?: number }) {
  const [err, setErr] = useState(false)
  const grad = gradients[idx % gradients.length]
  if (err || !src) {
    return (
      <div className={`${className} bg-gradient-to-br ${grad} flex items-center justify-center`}>
        <span className="text-5xl drop-shadow-lg animate-float">{emoji}</span>
      </div>
    )
  }
  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setErr(true)} />
}

export default function RecipeCard({ recipe, size = 'normal' }: RecipeCardProps) {
  const navigate = useNavigate()
  const idx = recipe.id.charCodeAt(0) + recipe.id.length

  if (size === 'featured') {
    return (
      <div
        onClick={() => navigate(`/rezept/${recipe.id}`)}
        className="relative rounded-2xl overflow-hidden shadow-md cursor-pointer min-w-[280px] h-[200px] snap-start active:scale-[0.98] transition-transform"
      >
        <ImgWithFallback src={recipe.image} alt={recipe.title} emoji={recipe.emoji} className="w-full h-full object-cover" idx={idx} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute top-3 right-3">
          <FavoriteButton id={recipe.id} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{recipe.emoji}</span>
            <span className="text-white/80 text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full">
              {recipe.duration} Min.
            </span>
          </div>
          <h3 className="text-white font-semibold text-lg leading-tight">{recipe.title}</h3>
          <p className="text-white/70 text-xs mt-0.5">{recipe.subtitle}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={() => navigate(`/rezept/${recipe.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer active:scale-[0.97] transition-transform card-lift"
    >
      <div className="relative h-36">
        <ImgWithFallback src={recipe.image} alt={recipe.title} emoji={recipe.emoji} className="w-full h-full object-cover" idx={idx} />
        <div className="absolute top-2 right-2">
          <FavoriteButton id={recipe.id} />
        </div>
        <div className="absolute top-2 left-2 flex gap-1">
          {recipe.tags.slice(0, 2).map(tag => (
            <span key={tag} className="bg-white/90 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-sm text-gray-800 leading-tight">{recipe.emoji} {recipe.title}</h3>
            <p className="text-gray-500 text-xs mt-0.5">{recipe.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-[11px] text-gray-400 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {recipe.duration} Min.
          </span>
          <span className="text-[11px] text-gray-400">
            {recipe.ageRange[0]}-{recipe.ageRange[1]} Jahre
          </span>
          <span className="text-[11px] text-gray-400">
            {'⭐'.repeat(recipe.stars)}
          </span>
        </div>
      </div>
    </div>
  )
}
