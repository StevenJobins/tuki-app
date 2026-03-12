import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import type { Language, Translation } from '../types';
import { SEO } from '../components/SEO';

interface RecipeDetailPageProps {
  lang: Language;
  t: Translation;
}

interface RecipeDetail {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  image: string;
  time: string;
  difficulty: Record<Language, string>;
  servings: number;
  tags: Record<Language, string[]>;
  ingredients: { amount: string; de: string; en: string; fr: string }[];
  steps: { de: string; en: string; fr: string }[];
  tips: { de: string; en: string; fr: string }[];
}

const recipes: RecipeDetail[] = [
  {
    id: 'banana-pancakes',
    title: { de: 'Bananen-Pancakes', en: 'Banana Pancakes', fr: 'Pancakes à la Banane' },
    description: {
      de: 'Lockere Pancakes mit natürlicher Süße von reifen Bananen. Ein Kinderliebling!',
      en: 'Fluffy pancakes with natural sweetness. A kid favorite!',
      fr: 'Pancakes moelleux avec douceur naturelle. Un favori!'
    },
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop',
    time: '15 min',
    difficulty: { de: 'Einfach', en: 'Easy', fr: 'Facile' },
    servings: 2,
    tags: { de: ['Zuckerfrei', 'Schnell'], en: ['Sugar-free', 'Quick'], fr: ['Sans sucre', 'Rapide'] },
    ingredients: [
      { amount: '1', de: 'reife Banane', en: 'ripe banana', fr: 'banane mûre' },
      { amount: '1', de: 'Ei', en: 'egg', fr: 'œuf' },
      { amount: '100g', de: 'Mehl', en: 'flour', fr: 'farine' },
      { amount: '100ml', de: 'Milch', en: 'milk', fr: 'lait' },
      { amount: '1/2 TL', de: 'Backpulver', en: 'baking powder', fr: 'levure' },
      { amount: 'Prise', de: 'Salz', en: 'salt', fr: 'sel' }
    ],
    steps: [
      { de: 'Banane mit Gabel zerdrücken', en: 'Mash banana with fork', fr: 'Écraser banane' },
      { de: 'Ei hinzugeben und verquirlen', en: 'Add egg and whisk', fr: 'Ajouter œuf et fouetter' },
      { de: 'Mehl und Backpulver unterrühren', en: 'Mix in flour', fr: 'Incorporer farine' },
      { de: 'Milch langsam einrühren', en: 'Slowly add milk', fr: 'Ajouter lait lentement' },
      { de: 'In Pfanne goldbraun braten', en: 'Fry until golden', fr: 'Faire dorer' }
    ],
    tips: [
      { de: 'Je reifer die Banane, desto süßer', en: 'Riper banana = sweeter', fr: 'Plus mûre = plus sucré' },
      { de: 'Kind kann Banane zerdrücken', en: 'Child can mash banana', fr: 'Enfant peut écraser' }
    ]
  }
];

export function RecipeDetailPage({ lang, t }: RecipeDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  useEffect(() => window.scrollTo(0, 0), [id]);
  const recipe = recipes.find(r => r.id === id);
  
  if (!recipe) return (
    <div className="pt-32 pb-16 text-center">
      <h1 className="text-2xl font-semibold mb-4">Rezept nicht gefunden</h1>
      <Link to="/recipes" className="text-tuki-rot hover:underline">Zurück</Link>
    </div>
  );
  
  return (
    <>
      <SEO lang={lang} pageTitle={recipe.title[lang]} />
      <div className="pt-24 lg:pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/recipes" className="inline-flex items-center gap-2 text-tuki-blau hover:text-tuki-rot mb-6">← {t.recipes}</Link>
          
          <div className="bg-tuki-sand rounded-3xl overflow-hidden mb-8">
            <img src={recipe.image} alt={recipe.title[lang]} className="w-full h-64 md:h-96 object-cover" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-semibold text-tuki-schwarz mb-4">{recipe.title[lang]}</h1>
          <p className="text-tuki-blau/70 text-lg mb-6">{recipe.description[lang]}</p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <span className="bg-tuki-rot/10 text-tuki-rot px-4 py-2 rounded-full text-sm font-medium">⏱ {recipe.time}</span>
            <span className="bg-tuki-rot/10 text-tuki-rot px-4 py-2 rounded-full text-sm font-medium">📊 {recipe.difficulty[lang]}</span>
            <span className="bg-tuki-rot/10 text-tuki-rot px-4 py-2 rounded-full text-sm font-medium">👥 {recipe.servings} Portionen</span>
          </div>
          
          {/* Ingredients */}
          <div className="bg-tuki-sand rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">{lang === 'de' ? 'Zutaten' : lang === 'en' ? 'Ingredients' : 'Ingrédients'}</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="font-medium text-tuki-rot min-w-[80px]">{ing.amount}</span>
                  <span className="text-tuki-schwarz">{ing[lang]}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Steps */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{lang === 'de' ? 'Zubereitung' : lang === 'en' ? 'Instructions' : 'Préparation'}</h2>
            <ol className="space-y-4">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-tuki-rot text-tuki-weiss rounded-full flex items-center justify-center font-medium">{i + 1}</span>
                  <p className="text-tuki-schwarz pt-1">{step[lang]}</p>
                </li>
              ))}
            </ol>
          </div>
          
          {/* Tips */}
          <div className="bg-tuki-mint/20 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">💡 {lang === 'de' ? 'Tipps' : lang === 'en' ? 'Tips' : 'Conseils'}</h2>
            <ul className="space-y-2">
              {recipe.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-tuki-rot mt-1">•</span>
                  <span className="text-tuki-schwarz">{tip[lang]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
