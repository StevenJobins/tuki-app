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
  desc: Record<Language, string>;
  image: string;
  time: string;
  age: string;
  materials: string[];
  steps: string[];
}

const recipes: RecipeDetail[] = [
  {
    id: 'banana-pancakes',
    title: { de: 'Bananen-Pancakes', en: 'Banana Pancakes', fr: 'Pancakes' },
    desc: { 
      de: 'Locker, süß und kinderleicht. Banane zerd drücken, rühren, backen!',
      en: 'Fluffy and easy. Mash, stir, bake!',
      fr: 'Moelleux et facile. Écraser, mélanger, cuire!'
    },
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop',
    time: '15 min',
    age: '2+',
    materials: ['1 reife Banane', '1 Ei', '100g Mehl', '100ml Milch', '1/2 TL Backpulver'],
    steps: [
      'Banane mit Gabel zerdrücken',
      'Ei hinzugeben und verrühren',
      'Mehl und Backpulver mischen',
      'Milch langsam einrühren',
      'In Pfanne kleine Pancakes backen'
    ]
  },
  {
    id: 'vegetable-muffins',
    title: { de: 'Gemüse-Muffins', en: 'Veggie Muffins', fr: 'Muffins Légumes' },
    desc: { 
      de: 'Mit Zucchini und Möhren – perfekt für unterwegs',
      en: 'With zucchini and carrots',
      fr: 'Aux courgettes et carottes'
    },
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&h=600&fit=crop',
    time: '40 min',
    age: '2+',
    materials: ['150g Zucchini', '100g Karotten', '250g Mehl', '2 Eier', '100ml Öl', '100g Käse'],
    steps: [
      'Gemüse raspeln',
      'Mehl mit Backpulver mischen',
      'Eier, Öl und Milch verquirlen',
      'Alles vermischen',
      '20 Minuten bei 200°C backen'
    ]
  },
  {
    id: 'mini-pizza',
    title: { de: 'Mini-Pizza', en: 'Mini Pizza', fr: 'Mini Pizza' },
    desc: { 
      de: 'Selbstgemacht mit Hefeteig – Kinder lieben Beläge auswählen!',
      en: 'Homemade with yeast dough',
      fr: 'Pâte maison – les enfants adorent!'
    },
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    time: '60 min',
    age: '3+',
    materials: ['300g Mehl', '1/2 Würfel Hefe', '150ml Wasser', 'Tomatensoße', 'Käse', 'Beliebige Beläge'],
    steps: [
      'Hefe in warmem Wasser auflösen',
      'Mit Mehl zu Teig kneten',
      '30 Minuten gehen lassen',
      'Ausrollen und belegen',
      '15 Minuten bei 220°C backen'
    ]
  },
  {
    id: 'apple-muffins',
    title: { de: 'Apfel-Zimt-Muffins', en: 'Apple Cinnamon Muffins', fr: 'Muffins Pomme Cannelle' },
    desc: { 
      de: 'Saftige Apfelstücke mit warmer Zimtnote – perfekt für Herbsttage',
      en: 'Juicy apple pieces with cinnamon',
      fr: 'Morceaux de pomme juteux'
    },
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop',
    time: '35 min',
    age: '2+',
    materials: ['2 Äpfel', '250g Mehl', '1 TL Backpulver', '1 TL Zimt', '100g Zucker', '2 Eier', '100ml Öl'],
    steps: [
      'Äpfel würfeln',
      'Trockene Zutaten mischen',
      'Eier und Öl verquirlen',
      'Alles vermischen',
      '25 Minuten backen'
    ]
  },
  {
    id: 'banana-bread',
    title: { de: 'Bananenbrot', en: 'Banana Bread', fr: 'Pain à la Banane' },
    desc: { 
      de: 'Saftiger Kuchen – auch am nächsten Tag noch lecker',
      en: 'Moist cake – still delicious next day',
      fr: 'Gâteau moelleux – délicieux le lendemain'
    },
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&h=600&fit=crop',
    time: '60 min',
    age: '2+',
    materials: ['3 reife Bananen', '200g Mehl', '100g Butter', '2 Eier', '1/2 TL Backpulver', 'Vanille'],
    steps: [
      'Butter mit Eiern schaumig rühren',
      'Bananen zerdrücken hinzugeben',
      'Mehl und Backpulver unterheben',
      'In Kastenform füllen',
      '50 Minuten bei 170°C backen'
    ]
  }
];

export function RecipeDetailPage({ lang, t }: RecipeDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  useEffect(() => window.scrollTo(0, 0), [id]);
  
  const recipe = recipes.find(r => r.id === id);
  
  if (!recipe) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-2xl font-semibold mb-4">
          {lang === 'de' ? 'Rezept nicht gefunden' : lang === 'en' ? 'Recipe not found' : 'Recette introuvable'}
        </h1>
        <Link to="/recipes" className="text-tuki-rot hover:underline">← {t.recipes}</Link>
      </div>
    );
  }
  
  return (
    <>
      <SEO lang={lang} pageTitle={recipe.title[lang]} />
      <div className="pt-24 lg:pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <Link to="/recipes" className="text-tuki-blau hover:text-tuki-rot mb-6 inline-block">← {t.recipes}</Link>
          
          <img src={recipe.image} alt={recipe.title[lang]} className="w-full h-64 object-cover rounded-2xl mb-6" />
          
          <h1 className="text-3xl font-semibold text-tuki-schwarz mb-2">{recipe.title[lang]}</h1>
          <p className="text-tuki-blau/70 mb-4">{recipe.desc[lang]}</p>
          
          <div className="flex gap-3 mb-8">
            <span className="bg-tuki-rot/10 text-tuki-rot px-3 py-1 rounded-full text-sm">⏱ {recipe.time}</span>
            <span className="bg-tuki-rot/10 text-tuki-rot px-3 py-1 rounded-full text-sm">👶 {recipe.age}</span>
          </div>
          
          <div className="bg-tuki-sand rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">📝 Zutaten</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recipe.materials.map((m, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-tuki-rot rounded-full"></span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">📋 Zubereitung</h2>
            <ol className="space-y-3">
              {recipe.steps.map((step, i) => (
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
