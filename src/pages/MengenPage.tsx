import Header from '../components/Header'
import { useTranslation } from '../i18n/useTranslation'
import { useApp } from '../context/AppContext'

// Daily-amount reference by age stage. Values are orientation ranges based on
// common Swiss / paediatric feeding guidance — NOT medical instructions.

type Lang = 'de' | 'en' | 'fr'

interface Stage {
  id: string
  emoji: string
  minM: number
  maxM: number
}

const stages: Stage[] = [
  { id: 'milk_only', emoji: '🍼', minM: 0, maxM: 4 },
  { id: 'start', emoji: '🥄', minM: 4, maxM: 7 },
  { id: 'build', emoji: '🥕', minM: 7, maxM: 10 },
  { id: 'three', emoji: '🍽️', minM: 10, maxM: 13 },
  { id: 'family', emoji: '👨‍👩‍👧', minM: 13, maxM: 36 },
]

interface StageText {
  age: string
  milk: string
  meals: string
  water: string
  note: string
}

const labels: Record<Lang, {
  title: string
  intro: string
  milkLabel: string
  mealsLabel: string
  waterLabel: string
  yourChild: string
  disclaimer: string
  stageTitles: Record<string, string>
  stages: Record<string, StageText>
}> = {
  de: {
    title: 'Tagesmengen',
    intro: 'Wie viel Milch, Beikost und Wasser pro Tag? Diese Richtwerte geben dir Orientierung — dein Kind zeigt dir am besten, wann es satt ist.',
    milkLabel: 'Milch / Schoppen',
    mealsLabel: 'Mahlzeiten',
    waterLabel: 'Wasser',
    yourChild: 'Aktuelle Stufe',
    disclaimer: 'Alle Angaben sind unverbindliche Richtwerte, keine medizinische Beratung. Jedes Kind isst unterschiedlich. Folge dem Hunger- und Sättigungsgefühl deines Kindes und besprich Unsicherheiten mit Kinderarzt:in oder Still-/Ernährungsberatung. Für Säuglingsmilch gilt immer die Dosierung auf der Verpackung.',
    stageTitles: {
      milk_only: 'Nur Milch',
      start: 'Beikoststart',
      build: 'Beikost ausbauen',
      three: 'Drei Mahlzeiten',
      family: 'Familienkost',
    },
    stages: {
      milk_only: {
        age: '0–4 Monate',
        milk: 'Muttermilch nach Bedarf, oder Säuglingsmilch ca. 6× 90–120 ml (langsam steigend)',
        meals: 'Noch keine Beikost — Milch deckt alles ab',
        water: 'Nicht nötig',
        note: 'Stillen/Schoppen nach Bedarf, kein fester Plan.',
      },
      start: {
        age: '4–6 Monate',
        milk: '4–5 Milchmahlzeiten bleiben die Hauptnahrung',
        meals: '1 Beikost-Mahlzeit, klein beginnen: 2–3 EL Brei/Püree, langsam steigern',
        water: 'Ein paar Schlucke zur Beikost',
        note: 'Frühestens ab 17 Wochen, spätestens ab 26 Wochen mit Beikost starten — wenn dein Kind bereit ist.',
      },
      build: {
        age: '7–9 Monate',
        milk: 'Ca. 500–600 ml / 3–4 Schoppen pro Tag',
        meals: '2–3 Beikost-Mahlzeiten, je ca. 1 Kinderhand Gemüse + 1 Kinderhand Kohlenhydrate + etwas Protein',
        water: 'Zu den Mahlzeiten, ca. 100–200 ml',
        note: 'Mehr Konsistenz: stückiger werden lassen, Fingerfood anbieten.',
      },
      three: {
        age: '10–12 Monate',
        milk: 'Ca. 400–500 ml / 2–3 Schoppen pro Tag',
        meals: '3 Hauptmahlzeiten + 1–2 kleine Zwischenmahlzeiten',
        water: 'Zu jeder Mahlzeit, ca. 200–300 ml',
        note: 'Kann am Familientisch mitessen, vieles selbst greifen.',
      },
      family: {
        age: '12–24 Monate',
        milk: 'Ca. 300–500 ml Milch/Milchprodukte pro Tag',
        meals: '3 Mahlzeiten + 2 Zwischenmahlzeiten — normale Familienkost',
        water: 'Nach Durst, ca. 300–500 ml',
        note: 'Wasser oder ungesüsster Tee als Getränk, keine Süssgetränke.',
      },
    },
  },
  fr: {
    title: 'Quantités par jour',
    intro: "Combien de lait, de solides et d'eau par jour ? Ces valeurs te donnent un repère — c'est ton enfant qui te montre le mieux quand il a assez mangé.",
    milkLabel: 'Lait / biberons',
    mealsLabel: 'Repas',
    waterLabel: 'Eau',
    yourChild: 'Étape actuelle',
    disclaimer: "Toutes les valeurs sont indicatives et ne remplacent pas un avis médical. Chaque enfant mange différemment. Suis les signaux de faim et de satiété de ton enfant et parle de tes doutes avec le/la pédiatre ou une conseillère en allaitement/nutrition. Pour le lait infantile, respecte toujours le dosage sur l'emballage.",
    stageTitles: {
      milk_only: 'Lait uniquement',
      start: 'Début de la diversification',
      build: 'Diversification élargie',
      three: 'Trois repas',
      family: 'Repas en famille',
    },
    stages: {
      milk_only: {
        age: '0–4 mois',
        milk: 'Lait maternel à la demande, ou lait infantile env. 6× 90–120 ml (en augmentant)',
        meals: 'Pas encore de solides — le lait suffit',
        water: 'Pas nécessaire',
        note: 'Sein/biberon à la demande, sans plan fixe.',
      },
      start: {
        age: '4–6 mois',
        milk: '4–5 repas de lait restent la base',
        meals: '1 repas solide, commencer petit : 2–3 c. à soupe de purée, augmenter doucement',
        water: 'Quelques gorgées avec le repas',
        note: 'Commencer au plus tôt à 17 semaines, au plus tard à 26 semaines — quand ton enfant est prêt.',
      },
      build: {
        age: '7–9 mois',
        milk: 'Env. 500–600 ml / 3–4 biberons par jour',
        meals: '2–3 repas solides : env. 1 main de légumes + 1 main de féculents + un peu de protéines',
        water: 'Aux repas, env. 100–200 ml',
        note: 'Plus de texture : proposer des morceaux et du finger food.',
      },
      three: {
        age: '10–12 mois',
        milk: 'Env. 400–500 ml / 2–3 biberons par jour',
        meals: '3 repas principaux + 1–2 petites collations',
        water: 'À chaque repas, env. 200–300 ml',
        note: 'Peut manger à table en famille et attraper seul.',
      },
      family: {
        age: '12–24 mois',
        milk: 'Env. 300–500 ml de lait/produits laitiers par jour',
        meals: '3 repas + 2 collations — repas en famille',
        water: 'Selon la soif, env. 300–500 ml',
        note: "Eau ou tisane non sucrée, pas de boissons sucrées.",
      },
    },
  },
  en: {
    title: 'Daily Amounts',
    intro: "How much milk, solids and water per day? These are orientation ranges — your child shows you best when they are full.",
    milkLabel: 'Milk / bottles',
    mealsLabel: 'Meals',
    waterLabel: 'Water',
    yourChild: 'Current stage',
    disclaimer: 'All values are orientation ranges, not medical advice. Every child eats differently. Follow your child’s hunger and fullness cues and discuss any concerns with your paediatrician or a breastfeeding/nutrition counsellor. For infant formula, always follow the dosage on the packaging.',
    stageTitles: {
      milk_only: 'Milk only',
      start: 'Starting solids',
      build: 'Expanding solids',
      three: 'Three meals',
      family: 'Family food',
    },
    stages: {
      milk_only: {
        age: '0–4 months',
        milk: 'Breast milk on demand, or formula approx. 6× 90–120 ml (gradually increasing)',
        meals: 'No solids yet — milk covers everything',
        water: 'Not needed',
        note: 'Breast/bottle on demand, no fixed plan.',
      },
      start: {
        age: '4–6 months',
        milk: '4–5 milk feeds remain the main nutrition',
        meals: '1 solid meal, start small: 2–3 tbsp puree, increase slowly',
        water: 'A few sips with the meal',
        note: 'Start no earlier than 17 weeks, no later than 26 weeks — when your child is ready.',
      },
      build: {
        age: '7–9 months',
        milk: 'Approx. 500–600 ml / 3–4 bottles per day',
        meals: '2–3 solid meals: about 1 child-hand veg + 1 child-hand carbs + some protein',
        water: 'With meals, approx. 100–200 ml',
        note: 'More texture: move to lumps and offer finger food.',
      },
      three: {
        age: '10–12 months',
        milk: 'Approx. 400–500 ml / 2–3 bottles per day',
        meals: '3 main meals + 1–2 small snacks',
        water: 'With each meal, approx. 200–300 ml',
        note: 'Can eat at the family table and grab food themselves.',
      },
      family: {
        age: '12–24 months',
        milk: 'Approx. 300–500 ml milk/dairy per day',
        meals: '3 meals + 2 snacks — normal family food',
        water: 'By thirst, approx. 300–500 ml',
        note: 'Water or unsweetened tea, no sugary drinks.',
      },
    },
  },
}

function ageInMonths(birthDate?: string): number | null {
  if (!birthDate) return null
  const b = new Date(birthDate)
  if (isNaN(b.getTime())) return null
  const now = new Date()
  let months = (now.getFullYear() - b.getFullYear()) * 12 + (now.getMonth() - b.getMonth())
  if (now.getDate() < b.getDate()) months--
  return Math.max(0, months)
}

export default function MengenPage() {
  const { language } = useTranslation()
  const { getActiveChild } = useApp()
  const lang = (language || 'de') as Lang
  const l = labels[lang] || labels.de

  const activeChild = getActiveChild()
  const months = ageInMonths(activeChild?.birthDate)
  const activeStageId = months === null
    ? null
    : (stages.find(s => months >= s.minM && months < s.maxM)?.id ?? null)

  return (
    <div className="pb-24">
      <Header title={l.title} />

      <div className="px-4 mb-5">
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{l.intro}</p>
      </div>

      <div className="px-4 space-y-3">
        {stages.map(stage => {
          const st = l.stages[stage.id]
          const isActive = stage.id === activeStageId
          return (
            <div
              key={stage.id}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden border-2 ${
                isActive ? 'border-tuki-rot' : 'border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 p-4 pb-3">
                <span className="text-2xl">{stage.emoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">
                    {l.stageTitles[stage.id]}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{st.age}</p>
                </div>
                {isActive && (
                  <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-tuki-rot text-white">
                    {l.yourChild}
                    {activeChild ? ` · ${activeChild.name}` : ''}
                  </span>
                )}
              </div>

              <div className="px-4 pb-4 space-y-2">
                <Row emoji="🍼" label={l.milkLabel} value={st.milk} />
                <Row emoji="🍽️" label={l.mealsLabel} value={st.meals} />
                <Row emoji="💧" label={l.waterLabel} value={st.water} />
                <p className="text-xs text-gray-500 dark:text-gray-400 italic pt-1">💡 {st.note}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Disclaimer */}
      <div className="px-4 mt-5">
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
          <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
            ⚠️ {l.disclaimer}
          </p>
        </div>
      </div>
    </div>
  )
}

function Row({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <div className="flex gap-2.5">
      <span className="text-base shrink-0">{emoji}</span>
      <div className="flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">{label}</p>
        <p className="text-sm text-gray-700 dark:text-gray-200 leading-snug">{value}</p>
      </div>
    </div>
  )
}
