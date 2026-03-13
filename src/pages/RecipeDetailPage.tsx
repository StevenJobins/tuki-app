import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import type { Language, Translation } from '../types';
import { SEO } from '../components/SEO';
import { FavoriteButton } from '../components/FavoriteButton';

interface RecipeDetailPageProps {
  lang: Language;
  t: Translation;
}

interface RecipeDetail {
  id: string;
  title: Record<Language, string>;
  desc: Record<Language, string>;
  image: string;
  time: string;
  age: string;
  materials: Record<Language, string[]>;
  steps: Record<Language, string[]>;
}

const recipes: RecipeDetail[] = [
  {
    id: 'banana-pancakes',
    title: { de: 'Bananen-Pancakes', en: 'Banana Pancakes', fr: 'Pancakes' },
    desc: { de: 'Locker, süß und kinderleicht', en: 'Fluffy and easy', fr: 'Moelleux et facile' },
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop',
    time: '15 min',
    age: '2+',
    materials: { de: ['1 reife Banane', '1 Ei', '100g Mehl', '100ml Milch'], en: ['1 ripe banana', '1 egg', '100g flour', '100ml milk'], fr: ['1 banane mûre', '1 œuf', '100g farine', '100ml lait'] },
    steps: { de: ['Banane zerdrücken', 'Ei hinzugeben', 'Mehl mischen', 'In Pfanne backen'], en: ['Mash banana', 'Add egg', 'Mix flour', 'Cook in pan'], fr: ['Écraser banane', 'Ajouter œuf', 'Mélanger farine', 'Cuire à la poêle'] }
  },
  {
    id: 'vegetable-muffins',
    title: { de: 'Gemüse-Muffins', en: 'Veggie Muffins', fr: 'Muffins Légumes' },
    desc: { de: 'Mit Zucchini und Karotten', en: 'With zucchini and carrots', fr: 'Aux courgettes et carottes' },
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&h=600&fit=crop',
    time: '40 min',
    age: '2+',
    materials: { de: ['150g Zucchini', '100g Karotten', '250g Mehl', '2 Eier'], en: ['150g zucchini', '100g carrots', '250g flour', '2 eggs'], fr: ['150g courgettes', '100g carottes', '250g farine', '2 œufs'] },
    steps: { de: ['Gemüse raspeln', 'Mehl mischen', 'Eier verquirlen', 'Backen bei 200°C'], en: ['Grate veggies', 'Mix flour', 'Whisk eggs', 'Bake at 200°C'], fr: ['Râper légumes', 'Mélanger farine', 'Battre œufs', 'Cuire à 200°C'] }
  },
  {
    id: 'mini-pizza',
    title: { de: 'Mini-Pizza', en: 'Mini Pizza', fr: 'Mini Pizza' },
    desc: { de: 'Mit Hefeteig selbst gemacht', en: 'Homemade yeast dough', fr: 'Pâte maison' },
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    time: '60 min',
    age: '3+',
    materials: { de: ['300g Mehl', 'Hefe', '150ml Wasser', 'Tomatensoße', 'Käse'], en: ['300g flour', 'yeast', '150ml water', 'tomato sauce', 'cheese'], fr: ['300g farine', 'levure', '150ml eau', 'sauce tomate', 'fromage'] },
    steps: { de: ['Hefe auflösen', 'Teig kneten', '30 Min gehen lassen', 'Belegen und backen'], en: ['Dissolve yeast', 'Knead dough', 'Let rise 30 min', 'Add toppings and bake'], fr: ['Dissoudre levure', 'Pétrir pâte', 'Laisser lever 30 min', 'Garnir et cuire'] }
  }
];

export function RecipeDetailPage({ lang, t }: RecipeDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  useEffect(() => window.scrollTo(0, 0), [id]);
  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-2xl font-semibold mb-4">{lang === 'de' ? 'Nicht gefunden' : lang === 'en' ? 'Not found' : 'Introuvable'}</h1>
        <Link to="/recipes" className="text-tuki-rot">← {t.recipes}</Link>
      </div>
    );
  }

  return (
    <>
      <SEO lang={lang} pageTitle={recipe.title[lang]} />
      <div className="pt-24 lg:pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <Link to="/recipes" className="text-tuki-blau hover:text-tuki-rot mb-6 inline-block">← {t.recipes}</Link>
          <div className="relative">
            <img src={recipe.image} alt={recipe.title[lang]} className="w-full h-64 object-cover rounded-2xl mb-6" />
            <FavoriteButton id={recipe.id} type="recipe" title={recipe.title[lang]} image={recipe.image} size="md" className="absolute top-4 right-4" />
          </div>
          <h1 className="text-3xl font-semibold text-tuki-schwarz mb-2">{recipe.title[lang]}</h1>
          <p className="text-tuki-blau/70 mb-4">{recipe.desc[lang]}</p>
          <div className="flex gap-3 mb-8">
            <span className="bg-tuki-rot/10 text-tuki-rot px-3 py-1 rounded-full text-sm">⏱ {recipe.time}</span>
            <span className="bg-tuki-rot/10 text-tuki-rot px-3 py-1 rounded-full text-sm">👶 {recipe.age}</span>
          </div>
          <div className="bg-tuki-sand rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">📝 Zutaten</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recipe.materials[lang].map((m, i) => (
                <li key={i} className="flex items-center gap-2"><span className="w-2 h-2 bg-tuki-rot rounded-full" />{m}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">📋 Zubereitung</h2>
            <ol className="space-y-3">
              {recipe.steps[lang].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-tuki-rot text-white rounded-full flex items-center justify-center">{i+1}</span>
                  <p className="pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
