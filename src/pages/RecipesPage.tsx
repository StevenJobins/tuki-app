import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Language, Translation } from '../types';
import { SEO } from '../components/SEO';

interface RecipesPageProps {
  lang: Language;
  t: Translation;
}

interface Recipe {
  id: string;
  title: Record<Language, string>;
  desc: Record<Language, string>;
  time: string;
  difficulty: Record<Language, string>;
  image: string;
  tags: Record<Language, string[]>;
}

const recipes: Recipe[] = [
  {
    id: 'banana-pancakes',
    title: { de: 'Bananen-Pancakes', en: 'Banana Pancakes', fr: 'Pancakes à la Banane' },
    desc: { 
      de: 'Natürlich süß, ohne Zucker – Kinder lieben sie!',
      en: 'Naturally sweet, no sugar – kids love them!',
      fr: 'Naturellement sucré, sans sucre – les enfants adorent!'
    },
    time: '15 min',
    difficulty: { de: 'Einfach', en: 'Easy', fr: 'Facile' },
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop',
    tags: { de: ['Zuckerfrei', 'Frühstück'], en: ['Sugar-free', 'Breakfast'], fr: ['Sans sucre', 'Petit-déj'] }
  },
  {
    id: 'vegetable-muffins',
    title: { de: 'Gemüse-Muffins', en: 'Veggie Muffins', fr: 'Muffins Légumes' },
    desc: {
      de: 'Mit Zucchini und Möhren – perfekt für unterwegs',
      en: 'With zucchini and carrots – perfect for on-the-go',
      fr: 'Aux courgettes et carottes – parfait à emporter'
    },
    time: '35 min',
    difficulty: { de: 'Mittel', en: 'Medium', fr: 'Moyen' },
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&h=400&fit=crop',
    tags: { de: ['Gemüse', 'Snacks'], en: ['Vegetables', 'Snacks'], fr: ['Légumes', 'Snacks'] }
  },
  {
    id: 'oat-cookies',
    title: { de: 'Haferflocken-Kekse', en: 'Oat Cookies', fr: 'Cookies Avoine' },
    desc: {
      de: 'Gesund, knackig und kinderleicht zu backen',
      en: 'Healthy, crunchy and easy to bake',
      fr: 'Sains, croustillants et faciles à faire'
    },
    time: '25 min',
    difficulty: { de: 'Einfach', en: 'Easy', fr: 'Facile' },
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&h=400&fit=crop',
    tags: { de: ['Zuckerfrei', 'Snack'], en: ['Sugar-free', 'Snack'], fr: ['Sans sucre', 'Snack'] }
  },
  {
    id: 'mini-pizza',
    title: { de: 'Mini-Pizza', en: 'Mini Pizza', fr: 'Mini Pizza' },
    desc: {
      de: 'Selbstgemachter Teig, beliebte Beläge',
      en: 'Homemade dough, favorite toppings',
      fr: 'Pâte maison, garnitures favorites'
    },
    time: '45 min',
    difficulty: { de: 'Mittel', en: 'Medium', fr: 'Moyen' },
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
    tags: { de: ['Abendessen', 'Spass'], en: ['Dinner', 'Fun'], fr: ['Dîner', 'Fun'] }
  }
];

export function RecipesPage({ lang, t }: RecipesPageProps) {
  const [filter, setFilter] = useState<string | null>(null);
  const pageTitle = lang === 'de' ? 'Rezepte' : lang === 'en' ? 'Recipes' : 'Recettes';

  const filteredRecipes = filter 
    ? recipes.filter(r => r.tags[lang].includes(filter))
    : recipes;

  const allTags = [...new Set(recipes.flatMap(r => r.tags[lang]))];

  return (
    <>
      <SEO lang={lang} pageTitle={pageTitle} />
      <div className="pt-24 lg:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-tuki-schwarz mb-4">{pageTitle}</h1>
          <p className="text-tuki-blau/70 mb-6">{t.recipesDesc}</p>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button 
              onClick={() => setFilter(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!filter ? 'bg-tuki-rot text-white' : 'bg-tuki-sand hover:bg-tuki-sand/80'}`}
            >
              {lang === 'de' ? 'Alle' : lang === 'en' ? 'All' : 'Tous'}
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === tag ? 'bg-tuki-rot text-white' : 'bg-tuki-sand hover:bg-tuki-sand/80'}`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredRecipes.map(recipe => (
              <Link 
                key={recipe.id} 
                to={`/recipes/${recipe.id}`}
                className="group bg-tuki-sand rounded-2xl overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={recipe.image} alt={recipe.title[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-5">
                  <div className="flex gap-2 mb-2">
                    {recipe.tags[lang].slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs bg-tuki-rot/10 text-tuki-rot px-2 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{recipe.title[lang]}</h3>
                  <p className="text-sm text-tuki-blau/70 mb-3">{recipe.desc[lang]}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-tuki-blau">⏱ {recipe.time}</span>
                    <span className="text-sm text-tuki-blau/70">{recipe.difficulty[lang]}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
