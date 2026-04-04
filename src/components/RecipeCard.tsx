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
        <span className="text-5xl drop-shadow-lg animate-bounce">{emoji}</span>
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
        className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer min-w-[280px] h-[200px] snap-start active:scale-[0.96] transition-all duration-200"
      >
        <ImgWithFallback src={recipe.image} alt={recipe.title} emoji={recipe.emoji} className="w-full h-full object-cover" idx={idx} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-3 right-3">
          <FavoriteButton id={recipe.id} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xl">{recipe.emoji}</span>
            <span className="text-white/90 text-xs font-semibold bg-white/25 backdrop-blur-sm px-2.5 py-1 rounded-full">
              {recipe.duration} Min.
            </span>
          </div>
          <h3 className="text-white font-bold text-lg leading-tight drop-shadow-sm">{recipe.title}</h3>
          <p className="text-white/80 text-xs mt-1">{recipe.subtitle}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={() => navigate(`/rezept/${recipe.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100/80 cursor-pointer active:scale-[0.96] transition-all duration-200"
    >
      <div className="relative h-40">
        <ImgWithFallback src={recipe.image} alt={recipe.title} emoji={recipe.emoji} className="w-full h-full object-cover" idx={idx} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-2.5 right-2.5">
          <FavoriteButton id={recipe.id} />
        </div>
        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          {recipe.tags.slice(0, 2).map(tag => (
            <span key={tag} className="bg-white/95 backdrop-blur-sm text-gray-700 text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
              {tag}
            </span>
          ))}
        </div>
        <div className="absolute bottom-2.5 left-2.5">
          <span className="bg-black/50 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
            {recipe.duration} Min.
          </span>
        </div>
      </div>
      <div className="p-3.5">
        <h3 className="font-bold text-sm text-gray-800 leading-tight">{recipe.emoji} {recipe.title}</h3>
        <p className="text-gray-500 text-xs mt-1 line-clamp-1">{recipe.subtitle}</p>
        <div className="flex items-center gap-3 mt-2.5">
          <span className="text-[11px] text-gray-400 font-medium">
            {recipe.ageRange[0]}-{recipe.ageRange[1]} Jahre
          </span>
          <span className="text-[11px] text-amber-400 tracking-wider">
            {'⭐'.repeat(recipe.stars)}
          </span>
        </div>
      </div>
    </div>
  )
}
