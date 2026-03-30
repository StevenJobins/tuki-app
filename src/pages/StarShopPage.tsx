import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import Header from '../components/Header'

interface Reward {
  id: string
  emoji: string
  name: string
  description: string
  price: number
  category: 'rabatt' | 'produkt' | 'digital'
}

const REWARDS: Reward[] = [
  { id: 'sticker-set', emoji: '\u2B50', name: 'Tuki Sticker-Set', description: '12 suesse Tuki-Sticker fuer das Kinderzimmer', price: 8, category: 'produkt' },
  { id: 'rezeptbuch', emoji: '\uD83D\uDCD6', name: 'Rezeptbuch Download', description: '20 exklusive Familienrezepte als PDF', price: 10, category: 'digital' },
  { id: 'gratis-versand', emoji: '\uD83D\uDE9A', name: 'Gratis Versand', description: 'Kostenloser Versand bei deiner naechsten Bestellung', price: 12, category: 'rabatt' },
  { id: 'snack-box', emoji: '\uD83C\uDF81', name: 'Tuki Snack-Box', description: 'Gesunde Snacks fuer die ganze Familie', price: 15, category: 'produkt' },
  { id: 'rabatt-10', emoji: '\uD83C\uDFF7\uFE0F', name: '10% Rabatt', description: '10% auf deine naechste Tuki-Bestellung', price: 20, category: 'rabatt' },
  { id: 'ueberraschung', emoji: '\uD83C\uDF89', name: 'Ueberraschungspaket', description: 'Lass dich ueberraschen mit tollen Tuki-Produkten', price: 30, category: 'produkt' },
]

export default function StarShopPage() {
  const { tukiStars, redeemedRewards, starBalance, spendStars, getActiveChild } = useApp()
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24 overflow-x-hidden"
    >
      <Header title="Sterne-Shop" />

      {/* Star Balance Hero */}
      <div className="mx-4 mt-4 bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-400 rounded-2xl p-6 text-white shadow-lg">
        <div className="text-center">
          <div className="text-4xl mb-2">{'\u2B50'}</div>
          <div className="text-5xl font-bold mb-1">{balance}</div>
          <div className="text-white/90 text-sm">
            {child ? `${child.name}s Sterne-Guthaben` : 'Dein Sterne-Guthaben'}
          </div>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-white/80">
            <span>{tukiStars.total} verdient</span>
            <span>{'\u00B7'}</span>
            <span>{tukiStars.spent} ausgegeben</span>
          </div>
          <div className="mt-2 bg-white/20 rounded-full px-3 py-1 inline-block text-xs">
            {tukiStars.levelName}
          </div>
        </div>
      </div>

      {/* How to earn */}
      <div className="mx-4 mt-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-tuki-brown text-sm mb-2">{'\u2728'} So verdienst du Sterne</h3>
        <div className="flex gap-3">
          <div className="flex-1 bg-green-50 rounded-lg p-3 text-center">
            <div className="text-lg mb-1">{'\u2705'}</div>
            <div className="text-xs font-medium text-green-800">Aktivitaet / Rezept abschliessen</div>
            <div className="text-green-600 font-bold text-sm mt-1">+1 {'\u2B50'}</div>
          </div>
          <div className="flex-1 bg-purple-50 rounded-lg p-3 text-center">
            <div className="text-lg mb-1">{'\uD83D\uDCF8'}</div>
            <div className="text-xs font-medium text-purple-800">Mit Foto abschliessen</div>
            <div className="text-purple-600 font-bold text-sm mt-1">+3 {'\u2B50'}</div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 px-4 mt-5 mb-3 overflow-x-auto no-scrollbar">
        {[
          { key: 'alle', label: 'Alle' },
          { key: 'produkt', label: '\uD83C\uDF81 Produkte' },
          { key: 'rabatt', label: '\uD83C\uDFF7\uFE0F Rabatte' },
          { key: 'digital', label: '\uD83D\uDCF1 Digital' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filter === f.key
                ? 'bg-tuki-brown text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {filtered.map(reward => {
          const isRedeemed = redeemedRewards.includes(reward.id)
          const canAfford = balance >= reward.price
          const wasJustRedeemed = justRedeemed === reward.id

          return (
            <motion.div
              key={reward.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-xl p-4 shadow-sm border transition-all ${
                isRedeemed
                  ? 'border-green-200 bg-green-50/50'
                  : canAfford
                  ? 'border-gray-100 hover:border-amber-300 hover:shadow-md cursor-pointer'
                  : 'border-gray-100 opacity-60'
              }`}
              onClick={() => !isRedeemed && canAfford && handleRedeem(reward)}
            >
              <div className="text-3xl mb-2">{reward.emoji}</div>
              <h3 className="font-semibold text-tuki-brown text-sm leading-tight">{reward.name}</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{reward.description}</p>
              <div className="mt-3 flex items-center justify-between">
                {isRedeemed ? (
                  <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                    {wasJustRedeemed ? '\uD83C\uDF89' : '\u2705'} Eingeloest
                  </span>
                ) : (
                  <>
                    <span className={`text-sm font-bold ${canAfford ? 'text-amber-600' : 'text-gray-400'}`}>
                      {reward.price} {'\u2B50'}
                    </span>
                    {canAfford && (
                      <span className="text-xs text-amber-600 font-medium">Einloesen</span>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Empty state for redeemed */}
      {redeemedRewards.length > 0 && (
        <div className="mx-4 mt-6 mb-4">
          <h3 className="text-sm font-semibold text-tuki-brown mb-2">
            {'\uD83C\uDF1F'} Eingeloeste Belohnungen ({redeemedRewards.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {redeemedRewards.map(rId => {
              const r = REWARDS.find(rew => rew.id === rId)
              if (!r) return null
              return (
                <div key={rId} className="bg-green-50 border border-green-200 rounded-full px-3 py-1 text-xs text-green-700 flex items-center gap-1">
                  {r.emoji} {r.name}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      <AnimatePresence>
        {selectedReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedReward(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full maw-w-sm shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-5xl mb-3">{selectedReward.emoji}</div>
                <h3 className="text-lg font-bold text-tuki-brown">{selectedReward.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedReward.description}</p>
                <div className="mt-4 bg-amber-50 rounded-xl p-3">
                  <span className="text-amber-700 font-medium">
                    {selectedReward.price} {'\u2B50'} einloesen?
                  </span>
                  <div className="text-xs text-amber-600 mt-1">
                    Verbleibendes Guthaben: {balance - selectedReward.price} Sterne
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => setSelectedReward(null)}
                    className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium"
                  >
                    Abbrechen
                  </button>
                  <button
                    onClick={confirmRedeem}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium shadow-md"
                  >
                    Einloesen {'\u2B50'}
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
