import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { useTranslation } from '../i18n/useTranslation'
import Header from '../components/Header'

interface Reward {
  id: string
  emoji: string
  key: 'stickerSet' | 'recipeBook' | 'freeShipping' | 'snackBox' | 'discount10' | 'surprise'
  price: number
  category: 'rabatt' | 'produkt' | 'digital'
}

const REWARDS: Reward[] = [
  { id: 'sticker-set', emoji: '⭐', key: 'stickerSet', price: 8, category: 'produkt' },
  { id: 'rezeptbuch', emoji: '📖', key: 'recipeBook', price: 10, category: 'digital' },
  { id: 'gratis-versand', emoji: '🚚', key: 'freeShipping', price: 12, category: 'rabatt' },
  { id: 'snack-box', emoji: '🎁', key: 'snackBox', price: 15, category: 'produkt' },
  { id: 'rabatt-10', emoji: '🏷️', key: 'discount10', price: 20, category: 'rabatt' },
  { id: 'ueberraschung', emoji: '🎉', key: 'surprise', price: 30, category: 'produkt' },
]

export default function StarShopPage() {
  const { tukiStars, redeemedRewards, starBalance, spendStars, getActiveChild } = useApp()
  const t = useTranslation()
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)
  const [justRedeemed, setJustRedeemed] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('alle')

  const balance = starBalance()
  const child = getActiveChild()

  const handleRedeem = (reward: Reward) => {
    if (redeemedRewards.includes(reward.id)) return
    if (balance < reward.price) return
    setSelectedReward(reward)
  }

  const confirmRedeem = () => {
    if (!selectedReward) return
    const success = spendStars(selectedReward.price, selectedReward.id)
    if (success) {
      setJustRedeemed(selectedReward.id)
      setTimeout(() => setJustRedeemed(null), 2000)
    }
    setSelectedReward(null)
  }

  const filtered = filter === 'alle' ? REWARDS : REWARDS.filter(r => r.category === filter)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-24 overflow-x-hidden">
      <Header title={t.starShop.title} />
      <div className="mx-4 mt-4 bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-400 rounded-2xl p-6 text-white shadow-lg">
        <div className="text-center">
          <div className="text-4xl mb-2">{'⭐'}</div>
          <div className="text-5xl font-bold mb-1">{balance}</div>
          <div className="text-white/90 text-sm">{child ? child.name + 's ' + t.starShop.balance : t.starShop.balance}</div>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-white/80">
            <span>{tukiStars.total} {t.starShop.earned}</span><span>{'·'}</span><span>{tukiStars.spent} {t.starShop.spent}</span>
          </div>
        </div>
      </div>

      <div className="mx-4 mt-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="text-sm font-medium text-gray-700 mb-2">{t.starShop.howToEarn}</div>
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2"><span className="text-tuki-rot font-bold">+3</span> {t.starShop.completeActivity}</div>
          <div className="flex items-center gap-2"><span className="text-tuki-rot font-bold">+2</span> {t.starShop.withPhoto}</div>
        </div>
      </div>

      <div className="mx-4 mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { key: 'alle', label: t.starShop.filterAll },
          { key: 'produkt', label: t.starShop.filterProducts },
          { key: 'rabatt', label: t.starShop.filterDiscounts },
          { key: 'digital', label: t.starShop.filterDigital },
        ].map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filter === f.key ? 'bg-tuki-rot text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200'}`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="mx-4 mt-4 grid grid-cols-2 gap-3">
        {filtered.map(reward => {
          const isRedeemed = redeemedRewards.includes(reward.id)
          const canAfford = balance >= reward.price
          const justGot = justRedeemed === reward.id
          const rewardT = t.starShop.rewards[reward.key]
          return (
            <motion.div key={reward.id} layout whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => handleRedeem(reward)}
              className={`relative bg-white rounded-xl p-4 shadow-sm border transition-all ${isRedeemed ? 'opacity-60 border-green-200' : canAfford ? 'border-amber-200 cursor-pointer hover:shadow-md' : 'opacity-75 border-gray-100'}`}>
              {justGot && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">{'✓'}</motion.div>}
              <div className="text-3xl mb-2">{reward.emoji}</div>
              <div className="font-medium text-sm text-gray-800 mb-1">{rewardT.name}</div>
              <div className="text-xs text-gray-500 mb-3">{rewardT.description}</div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-amber-600">{'⭐'} {reward.price}</span>
                {isRedeemed && <span className="text-xs text-green-600 font-medium">{t.starShop.redeemed}</span>}
              </div>
            </motion.div>
          )
        })}
      </div>

      {redeemedRewards.length > 0 && (
        <div className="mx-4 mt-8">
          <h3 className="text-sm font-medium text-gray-500 mb-3">{t.starShop.redeemedRewards}</h3>
          <div className="space-y-2">
            {REWARDS.filter(r => redeemedRewards.includes(r.id)).map(r => {
              const rT = t.starShop.rewards[r.key]
              return (
                <div key={r.id} className="flex items-center gap-3 bg-green-50 rounded-lg p-3">
                  <span className="text-xl">{r.emoji}</span>
                  <div>
                    <div className="text-sm font-medium text-green-800">{rT.name}</div>
                    <div className="text-xs text-green-600">{rT.description}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <AnimatePresence>
        {selectedReward && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedReward(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
              <div className="text-center">
                <div className="text-5xl mb-4">{selectedReward.emoji}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{t.starShop.rewards[selectedReward.key].name}</h3>
                <p className="text-gray-500 text-sm mb-4">{t.starShop.rewards[selectedReward.key].description}</p>
                <div className="text-2xl font-bold text-amber-600 mb-6">{'⭐'} {selectedReward.price} {t.starShop.stars}</div>
                <div className="flex gap-3">
                  <button onClick={() => setSelectedReward(null)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium">
                    {t.common.cancel}
                  </button>
                  <button onClick={confirmRedeem} className="flex-1 py-3 rounded-xl bg-tuki-rot text-white font-medium shadow-md">
                    {t.starShop.redeem}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
