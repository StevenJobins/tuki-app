import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'

export default function FavoriteButton({ id }: { id: string }) {
  const { toggleFavorite, isFavorite } = useApp()
  const fav = isFavorite(id)

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={(e) => {
        e.stopPropagation()
        toggleFavorite(id)
      }}
      className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
    >
      <motion.svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={fav ? '#8F5652' : 'none'}
        stroke={fav ? '#8F5652' : '#9CA3AF'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={fav ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </motion.svg>
    </motion.button>
  )
}
