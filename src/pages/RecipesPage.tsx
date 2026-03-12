import { type Translation } from '../types';
import { SEO } from '../components/SEO';

interface RecipesPageProps {
  lang: 'de' | 'en' | 'fr';
  t: Translation;
}

const recipes = [
  {
    id: 'banana-pancakes',
    title: { de: 'Bananen Pancakes', en: 'Banana Pancakes', fr: 'Pancakes à la Banane' },
    time: '15 min',
    difficulty: { de: 'Einfach', en: 'Easy', fr: 'Facile' },
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop'
  },
  {
    id: 'fruit-smoothie',
    title: { de: 'Frucht Smoothie', en: 'Fruit Smoothie', fr: 'Smoothie aux Fruits' },
    time: '5 min',
    difficulty: { de: 'Einfach', en: 'Easy', fr: 'Facile' },
    image: 'https://images.unsplash.com/photo-1505253716362-afaea1d559d8?w=600&h=400&fit=crop'
  },
  {
    id: 'pizza',
    title: { de: 'Mini Pizza', en: 'Mini Pizza', fr: 'Mini Pizza' },
    time: '30 min',
    difficulty: { de: 'Mittel', en: 'Medium', fr: 'Moyen' },
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop'
  },
  {
    id: 'salad',
    title: { de: 'Bunter Salat', en: 'Colorful Salad', fr: 'Salade Colorée' },
    time: '10 min',
    difficulty: { de: 'Einfach', en: 'Easy', fr: 'Facile' },
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop'
  }
];

export function RecipesPage({ lang, t }: RecipesPageProps) {
  const pageTitle = lang === 'de' ? 'Rezepte' : lang === 'en' ? 'Recipes' : 'Recettes';
  
  return (
    <>
      <SEO lang={lang} pageTitle={pageTitle} />
      
      <div className="pt-24 lg:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-tuki-schwarz mb-4">
              {t.recipes}
            </h1>
            <p className="text-lg text-tuki-blau/70">{t.recipesDesc}</p>
          </div>

          {/* Recipes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="bg-tuki-sand rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title[lang]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-tuki-schwarz mb-3">{recipe.title[lang]}</h3>
                  <div className="flex items-center gap-4 text-sm text-tuki-blau/70">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {recipe.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      {recipe.difficulty[lang]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon */}
          <div className="mt-16 text-center">
            <p className="text-tuki-blau/60">
              {lang === 'de' 
                ? 'Mehr Rezepte werden bald hinzugefügt...' 
                : lang === 'en' 
                  ? 'More recipes coming soon...'
                  : 'Plus de recettes bientôt...'
              }
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
