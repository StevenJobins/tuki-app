import { Link } from 'react-router-dom';
import type { Language, Translation } from '../types';
import { SEO } from '../components/SEO';

interface RecipesPageProps {
  lang: Language;
  t: Translation;
}

const recipes = [
  {
    id: 'banana-pancakes',
    title: { de: 'Bananen-Pancakes', en: 'Banana Pancakes', fr: 'Pancakes' },
    desc: { de: 'Natürlich süß, kinderleicht', en: 'Naturally sweet, easy', fr: 'Naturellement sucré' },
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop',
    time: '15 min',
    age: '2+',
    tag: { de: 'Zuckerfrei', en: 'Sugar-free', fr: 'Sans sucre' }
  },
  {
    id: 'vegetable-muffins',
    title: { de: 'Gemüse-Muffins', en: 'Veggie Muffins', fr: 'Muffins Légumes' },
    desc: { de: 'Mit Zucchini und Karotten', en: 'With zucchini', fr: 'Aux légumes' },
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&h=400&fit=crop',
    time: '40 min',
    age: '2+',
    tag: { de: 'Gemüse', en: 'Vegetables', fr: 'Légumes' }
  },
  {
    id: 'mini-pizza',
    title: { de: 'Mini-Pizza', en: 'Mini Pizza', fr: 'Mini Pizza' },
    desc: { de: 'Mit Hefeteig selbst gemacht', en: 'Homemade yeast dough', fr: 'Pâte maison' },
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
    time: '60 min',
    age: '3+',
    tag: { de: 'Abendessen', en: 'Dinner', fr: 'Dîner' }
  },
  {
    id: 'apple-muffins',
    title: { de: 'Apfel-Zimt-Muffins', en: 'Apple Muffins', fr: 'Muffins Pomme' },
    desc: { de: 'Saftig, perfekt für Herbst', en: 'Juicy, perfect for fall', fr: 'Juteux, parfait automne' },
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop',
    time: '35 min',
    age: '2+',
    tag: { de: 'Saisonal', en: 'Seasonal', fr: 'Saisonnier' }
  },
  {
    id: 'banana-bread',
    title: { de: 'Bananenbrot', en: 'Banana Bread', fr: 'Pain Banane' },
    desc: { de: 'Saftig – auch nächster Tag lecker', en: 'Moist – good next day', fr: 'Moelleux – bon lendemain' },
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&h=400&fit=crop',
    time: '60 min',
    age: '2+',
    tag: { de: 'Vorrat', en: 'Batch', fr: 'Batch' }
  }
];

export function RecipesPage({ lang, t }: RecipesPageProps) {
  const pageTitle = lang === 'de' ? 'Rezepte' : lang === 'en' ? 'Recipes' : 'Recettes';

  return (
    <>
      <SEO lang={lang} pageTitle={pageTitle} />
      <div className="pt-24 lg:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-tuki-schwarz mb-4">{pageTitle}</h1>
          <p className="text-tuki-blau/70 mb-8 max-w-2xl">{t.recipesDesc}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map(recipe => (
              <Link 
                key={recipe.id}
                to={`/recipes/${recipe.id}`}
                className="group bg-tuki-sand rounded-2xl overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={recipe.image} alt={recipe.title[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-5">
                  <span className="text-xs bg-tuki-rot/10 text-tuki-rot px-2 py-1 rounded-full">{recipe.tag[lang]}</span>
                  <h3 className="text-lg font-semibold mt-2 mb-1">{recipe.title[lang]}</h3>
                  <p className="text-sm text-tuki-blau/70 mb-3">{recipe.desc[lang]}</p>
                  <div className="flex items-center gap-4 text-sm text-tuki-blau">
                    <span>⏱ {recipe.time}</span>
                    <span>👶 {recipe.age}</span>
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
