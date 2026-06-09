import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import { useTranslation } from '../i18n/useTranslation'
import { useApp } from '../context/AppContext'

// ---- Data ---------------------------------------------------------------

interface FoodItem {
  id: string
  emoji: string
}

interface FoodCategory {
  id: string
  emoji: string
  items: FoodItem[]
}

const foodCategories: FoodCategory[] = [
  {
    id: 'obst',
    emoji: '🍎',
    items: [
      { id: 'apfel', emoji: '🍎' },
      { id: 'birne', emoji: '🍐' },
      { id: 'banane', emoji: '🍌' },
      { id: 'erdbeere', emoji: '🍓' },
      { id: 'blaubeere', emoji: '🫐' },
      { id: 'mango', emoji: '🥭' },
      { id: 'pfirsich', emoji: '🍑' },
      { id: 'melone', emoji: '🍈' },
      { id: 'traube', emoji: '🍇' },
      { id: 'kiwi', emoji: '🥝' },
      { id: 'orange', emoji: '🍊' },
      { id: 'pflaume', emoji: '🫒' },
    ],
  },
  {
    id: 'gemuese',
    emoji: '🥕',
    items: [
      { id: 'karotte', emoji: '🥕' },
      { id: 'kartoffel', emoji: '🥔' },
      { id: 'suesskartoffel', emoji: '🍠' },
      { id: 'zucchini', emoji: '🥒' },
      { id: 'kuerbis', emoji: '🎃' },
      { id: 'brokkoli', emoji: '🥦' },
      { id: 'erbsen', emoji: '🟢' },
      { id: 'spinat', emoji: '🥬' },
      { id: 'tomate', emoji: '🍅' },
      { id: 'gurke', emoji: '🥒' },
      { id: 'paprika', emoji: '🫑' },
      { id: 'avocado', emoji: '🥑' },
    ],
  },
  {
    id: 'getreide',
    emoji: '🌾',
    items: [
      { id: 'reis', emoji: '🍚' },
      { id: 'haferflocken', emoji: '🥣' },
      { id: 'hirse', emoji: '🌾' },
      { id: 'dinkel', emoji: '🌾' },
      { id: 'mais', emoji: '🌽' },
      { id: 'quinoa', emoji: '🫘' },
      { id: 'nudeln', emoji: '🍝' },
      { id: 'brot', emoji: '🍞' },
    ],
  },
  {
    id: 'milch',
    emoji: '🧀',
    items: [
      { id: 'joghurt', emoji: '🥛' },
      { id: 'quark', emoji: '🥛' },
      { id: 'kaese', emoji: '🧀' },
      { id: 'butter', emoji: '🧈' },
    ],
  },
  {
    id: 'protein',
    emoji: '🍗',
    items: [
      { id: 'poulet', emoji: '🍗' },
      { id: 'rind', emoji: '🥩' },
      { id: 'lachs', emoji: '🐟' },
      { id: 'forelle', emoji: '🐟' },
      { id: 'ei', emoji: '🥚' },
    ],
  },
  {
    id: 'huelsen',
    emoji: '🫘',
    items: [
      { id: 'linsen', emoji: '🫘' },
      { id: 'kichererbsen', emoji: '🫘' },
      { id: 'bohnen', emoji: '🫘' },
      { id: 'tofu', emoji: '🧈' },
    ],
  },
]

// ---- i18n labels --------------------------------------------------------

type Lang = 'de' | 'en' | 'fr'

const labels: Record<Lang, {
  title: string
  subtitle: string
  progress: string
  tried: string
  categories: Record<string, string>
  foods: Record<string, string>
}> = {
  de: {
    title: 'Lebensmittel-Tracker',
    subtitle: 'Was hat dein Kind schon probiert?',
    progress: 'probiert',
    tried: 'Schon probiert',
    categories: {
      obst: 'Obst',
      gemuese: 'Gemüse',
      getreide: 'Getreide & Beilagen',
      milch: 'Milchprodukte',
      protein: 'Fleisch, Fisch & Ei',
      huelsen: 'Hülsenfrüchte',
    },
    foods: {
      apfel: 'Apfel', birne: 'Birne', banane: 'Banane', erdbeere: 'Erdbeere',
      blaubeere: 'Blaubeere', mango: 'Mango', pfirsich: 'Pfirsich', melone: 'Melone',
      traube: 'Traube', kiwi: 'Kiwi', orange: 'Orange', pflaume: 'Pflaume',
      karotte: 'Karotte', kartoffel: 'Kartoffel', suesskartoffel: 'Süsskartoffel',
      zucchini: 'Zucchini', kuerbis: 'Kürbis', brokkoli: 'Brokkoli', erbsen: 'Erbsen',
      spinat: 'Spinat', tomate: 'Tomate', gurke: 'Gurke', paprika: 'Paprika', avocado: 'Avocado',
      reis: 'Reis', haferflocken: 'Haferflocken', hirse: 'Hirse', dinkel: 'Dinkel',
      mais: 'Mais', quinoa: 'Quinoa', nudeln: 'Nudeln', brot: 'Brot',
      joghurt: 'Joghurt', quark: 'Quark', kaese: 'Käse', butter: 'Butter',
      poulet: 'Poulet', rind: 'Rind', lachs: 'Lachs', forelle: 'Forelle', ei: 'Ei',
      linsen: 'Linsen', kichererbsen: 'Kichererbsen', bohnen: 'Bohnen', tofu: 'Tofu',
    },
  },
  fr: {
    title: 'Suivi alimentaire',
    subtitle: "Qu'a déjà goûté ton enfant?",
    progress: 'goûtés',
    tried: 'Déjà goûté',
    categories: {
      obst: 'Fruits',
      gemuese: 'Légumes',
      getreide: 'Céréales & Accompagnements',
      milch: 'Produits laitiers',
      protein: 'Viande, Poisson & Oeuf',
      huelsen: 'Légumineuses',
    },
    foods: {
      apfel: 'Pomme', birne: 'Poire', banane: 'Banane', erdbeere: 'Fraise',
      blaubeere: 'Myrtille', mango: 'Mangue', pfirsich: 'Pêche', melone: 'Melon',
      traube: 'Raisin', kiwi: 'Kiwi', orange: 'Orange', pflaume: 'Prune',
      karotte: 'Carotte', kartoffel: 'Pomme de terre', suesskartoffel: 'Patate douce',
      zucchini: 'Courgette', kuerbis: 'Courge', brokkoli: 'Brocoli', erbsen: 'Petits pois',
      spinat: 'Épinards', tomate: 'Tomate', gurke: 'Concombre', paprika: 'Poivron', avocado: 'Avocat',
      reis: 'Riz', haferflocken: "Flocons d'avoine", hirse: 'Millet', dinkel: 'Épeautre',
      mais: 'Maïs', quinoa: 'Quinoa', nudeln: 'Pâtes', brot: 'Pain',
      joghurt: 'Yaourt', quark: 'Fromage blanc', kaese: 'Fromage', butter: 'Beurre',
      poulet: 'Poulet', rind: 'Boeuf', lachs: 'Saumon', forelle: 'Truite', ei: 'Oeuf',
      linsen: 'Lentilles', kichererbsen: 'Pois chiches', bohnen: 'Haricots', tofu: 'Tofu',
    },
  },
  en: {
    title: 'Food Tracker',
    subtitle: 'What has your child tried?',
    progress: 'tried',
    tried: 'Already tried',
    categories: {
      obst: 'Fruit',
      gemuese: 'Vegetables',
      getreide: 'Grains & Sides',
      milch: 'Dairy',
      protein: 'Meat, Fish & Egg',
      huelsen: 'Legumes',
    },
    foods: {
      apfel: 'Apple', birne: 'Pear', banane: 'Banana', erdbeere: 'Strawberry',
      blaubeere: 'Blueberry', mango: 'Mango', pfirsich: 'Peach', melone: 'Melon',
      traube: 'Grape', kiwi: 'Kiwi', orange: 'Orange', pflaume: 'Plum',
      karotte: 'Carrot', kartoffel: 'Potato', suesskartoffel: 'Sweet Potato',
      zucchini: 'Zucchini', kuerbis: 'Pumpkin', brokkoli: 'Broccoli', erbsen: 'Peas',
      spinat: 'Spinach', tomate: 'Tomato', gurke: 'Cucumber', paprika: 'Bell Pepper', avocado: 'Avocado',
      reis: 'Rice', haferflocken: 'Oats', hirse: 'Millet', dinkel: 'Spelt',
      mais: 'Corn', quinoa: 'Quinoa', nudeln: 'Pasta', brot: 'Bread',
      joghurt: 'Yogurt', quark: 'Quark', kaese: 'Cheese', butter: 'Butter',
      poulet: 'Chicken', rind: 'Beef', lachs: 'Salmon', forelle: 'Trout', ei: 'Egg',
      linsen: 'Lentils', kichererbsen: 'Chickpeas', bohnen: 'Beans', tofu: 'Tofu',
    },
  },
}

// ---- Storage ------------------------------------------------------------

const STORAGE_KEY = 'tuki-food-tracker'

function loadChecked(): Record<string, boolean> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return {}
}

function saveChecked(data: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {}
}

// ---- Component ----------------------------------------------------------

export default function FoodTrackerPage() {
  const { language } = useTranslation()
  const { getActiveChild } = useApp()
  const activeChild = getActiveChild()
  const lang = (language || 'de') as Lang
  const l = labels[lang] || labels.de

  const [checked, setChecked] = useState<Record<string, boolean>>(loadChecked)
  const [openCat, setOpenCat] = useState<string | null>('obst')

  useEffect(() => {
    saveChecked(checked)
  }, [checked])

  const toggleFood = (foodId: string) => {
    setChecked(prev => ({ ...prev, [foodId]: !prev[foodId] }))
  }

  const totalItems = foodCategories.reduce((sum, cat) => sum + cat.items.length, 0)
  const totalChecked = Object.values(checked).filter(Boolean).length
  const overallPercent = Math.round((totalChecked / totalItems) * 100)

  return (
    <div className="pb-24">
      <Header title={l.title} />

      {/* Overall Progress */}
      <div className="px-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {l.subtitle}
                {activeChild ? ` (${activeChild.name})` : ''}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {totalChecked} / {totalItems} {l.progress}
              </p>
            </div>
            <div className="text-2xl font-bold text-tuki-rot">{overallPercent}%</div>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-tuki-rot to-amber-400"
              initial={{ width: 0 }}
              animate={{ width: `${overallPercent}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 space-y-3">
        {foodCategories.map(cat => {
          const catChecked = cat.items.filter(item => checked[item.id]).length
          const catPercent = Math.round((catChecked / cat.items.length) * 100)
          const isOpen = openCat === cat.id

          return (
            <div key={cat.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => setOpenCat(isOpen ? null : cat.id)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cat.emoji}</span>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100 text-sm">
                      {l.categories[cat.id] || cat.id}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {catChecked} / {cat.items.length} {l.progress}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-tuki-rot transition-all duration-300"
                      style={{ width: `${catPercent}%` }}
                    />
                  </div>
                  <span className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    {'▾'}
                  </span>
                </div>
              </button>

              {/* Food Items */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                      {cat.items.map(item => {
                        const isChecked = !!checked[item.id]
                        return (
                          <button
                            key={item.id}
                            onClick={() => toggleFood(item.id)}
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-sm transition-all ${
                              isChecked
                                ? 'bg-green-50 dark:bg-green-900/30 border-2 border-green-400 dark:border-green-600 text-green-800 dark:text-green-300'
                                : 'bg-gray-50 dark:bg-gray-700 border-2 border-transparent text-gray-600 dark:text-gray-300'
                            }`}
                          >
                            <span className="text-lg">{item.emoji}</span>
                            <span className="flex-1 truncate">{l.foods[item.id] || item.id}</span>
                            {isChecked && <span className="text-green-500 text-xs">{'✓'}</span>}
                          </button>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
