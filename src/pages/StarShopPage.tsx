import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import { useApp } from '../context/AppContext'
import { useTranslation } from '../i18n/useTranslation'

interface Reward {
  id: string
  emoji: string
  cost: number
  category: 'badge' | 'title' | 'activity'
}

const rewards: Reward[] = [
  { id: 'badge-chef', emoji: '👨‍🍳', cost: 5, category: 'badge' },
  { id: 'badge-star', emoji: '🌟', cost: 10, category: 'badge' },
  { id: 'badge-rocket', emoji: '🚀', cost: 15, category: 'badge' },
  { id: 'badge-crown', emoji: '👑', cost: 25, category: 'badge' },
  { id: 'badge-rainbow', emoji: '🌈', cost: 8, category: 'badge' },
  { id: 'badge-heart', emoji: '💖', cost: 12, category: 'badge' },
  { id: 'title-explorer', emoji: '🗺️', cost: 20, category: 'title' },
  { id: 'title-superchef', emoji: '🏅', cost: 30, category: 'title' },
  { id: 'activity-baking', emoji: '🧁', cost: 15, category: 'activity' },
  { id: 'activity-painting', emoji: '🎨', cost: 10, category: 'activity' },
  { id: 'activity-garden', emoji: '🌱', cost: 20, category: 'activity' },
  { id: 'activity-music', emoji: '🎵', cost: 12, category: 'activity' },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
}

export default function StarShopPage() {
  const { t } = useTranslation()
  const { tukiStars, starBalance, spendStars, redeemedRewards } = useApp()
  const [showSuccess, setShowSuccess] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<'all' | 'badge' | 'title' | 'activity'>('all')

  const balance = starBalance()

  const handleRedeem = (reward: Reward) => {
    if (redeemedRewards.includes(reward.id)) return
    if (balance < reward.cost) return

    const ok = spendStars(reward.cost, reward.id)
    if (ok) {
      setShowSuccess(reward.id)
      setTimeout(() => setShowSuccess(null), 2000)
    }
  }

  const filteredRewards = activeCategory === 'all'
    ? rewards
    : rewards.filter(r => r.category === activeCategory)

  const categories = [
    { key: 'all' as const, label: t.starShop?.all ?? 'Alle' },
    { key: 'badge' as const, label: t.starShop?.badges ?? 'Badges' },
    { key: 'title' as const, label: t.starShop?.titles ?? 'Titel' },
    { key: 'activity' as const, label: t.starShop?.activities ?? 'Aktivitäten' },
  ]

  return (
    <div className="pb-24">
      <Header title={t.starShop?.title ?? 'Sterne-Shop'} />

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-4 mt-2 mb-6"
      >
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-5 border border-yellow-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{t.starShop?.yourBalance ?? 'Dein Guthaben'}</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                ⭐ {balance}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {t.starShop?.totalEarned ?? 'Insgesamt verdient'}: {tukiStars.total} | {t.starShop?.spent ?? 'Ausgegeben'}: {tukiStars.spent}
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <span className="text-3xl">🏪</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Category Filter */}
      <div className="flex gap-2 px-4 mb-4 overflow-x-auto no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat.key
                ? 'bg-tuki-rot text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-3 px-4"
      >
        {filteredRewards.map(reward => {
          const isRedeemed = redeemedRewards.includes(reward.id)
          const canAfford = balance >= reward.cost
          const justRedeemed = showSuccess === reward.id

          return (
            <motion.div
              key={reward.id}
              variants={item}
              className={`bg-white rounded-2xl p-4 border transition-all ${
                isRedeemed
                  ? 'border-green-200 bg-green-50/50'
                  : canAfford
                  ? 'border-gray-100 active:scale-95'
                  : 'border-gray-100 opacity-60'
              }`}
            >
              <div className="text-center">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 ${
                  isRedeemed ? 'bg-green-100' : 'bg-yellow-50'
                }`}>
                  <span className="text-3xl">{reward.emoji}</span>
                </div>
                <h3 className="font-semibold text-sm text-gray-800">
                  {t.starShop?.rewards?.[reward.id]?.name ?? reward.id}
                </h3>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {t.starShop?.rewards?.[reward.id]?.desc ?? ''}
                </p>

                <AnimatePresence mode="wait">
                  {justRedeemed ? (
                    <motion.div
                      key="success"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="mt-3 py-2 bg-green-100 text-green-700 rounded-xl text-xs font-medium"
                    >
                      ✅ {t.starShop?.redeemed ?? 'Eingelöst!'}
                    </motion.div>
                  ) : isRedeemed ? (
                    <div key="done" className="mt-3 py-2 bg-green-50 text-green-600 rounded-xl text-xs font-medium">
                      ✅ {t.starShop?.owned ?? 'Erhalten'}
                    </div>
                  ) : (
                    <button
                      key="buy"
                      onClick={() => handleRedeem(reward)}
                      disabled={!canAfford}
                      className={`mt-3 w-full py-2 rounded-xl text-xs font-semibold transition-colors ${
                        canAfford
                          ? 'bg-tuki-rot text-white active:bg-tuki-rot-dark'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      ⭐ {reward.cost} {t.common?.stars ?? 'Sterne'}
                    </button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Empty state if no stars */}
      {tukiStars.total === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-4 mt-6"
        >
          <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
            <span className="text-4xl block mb-3">🌟</span>
            <h3 className="font-semibold text-gray-800 mb-1">
              {t.starShop?.noStarsTitle ?? 'Noch keine Sterne'}
            </h3>
            <p className="text-xs text-gray-500">
              {t.starShop?.noStarsDesc ?? 'Schliesse Rezepte und Aktivitäten ab, um Sterne zu verdienen!'}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
