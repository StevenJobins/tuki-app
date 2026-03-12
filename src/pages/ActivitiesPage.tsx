import { type Translation } from '../types';
import { SEO } from '../components/SEO';

interface ActivitiesPageProps {
  lang: 'de' | 'en' | 'fr';
  t: Translation;
}

const activities = [
  {
    id: 'baking',
    title: { de: 'Gemeinsam Backen', en: 'Baking Together', fr: 'Pâtisserie Ensemble' },
    desc: { 
      de: 'Einfache Rezepte für Kekse, Muffins und Brot',
      en: 'Simple recipes for cookies, muffins, and bread',
      fr: 'Recettes simples pour biscuits, muffins et pain'
    },
    age: '2-6',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop'
  },
  {
    id: 'water',
    title: { de: 'Wasserspiele', en: 'Water Play', fr: 'Jeux d\'eau' },
    desc: {
      de: 'Spielerisch Wasser gießen und Flaschen füllen',
      en: 'Playful water pouring and bottle filling',
      fr: 'Versage d\'eau ludique et remplissage de bouteilles'
    },
    age: '1-4',
    image: 'https://images.unsplash.com/photo-1544779493-aa344fd8ee4d?w=600&h=400&fit=crop'
  },
  {
    id: 'vegetables',
    title: { de: ' Gemüse waschen', en: 'Washing Vegetables', fr: 'Légumes' },
    desc: {
      de: 'Gemüse unter fließendem Wasser abwaschen',
      en: 'Wash vegetables under running water',
      fr: 'Bien nettoyer les légumes dans l\'eau'
    },
    age: '2-5',
    image: 'https://images.unsplash.com/photo-1590779033100-b0d4d92c95e1?w=600&h=400&fit=crop'
  },
  {
    id: 'arranging',
    title: { de: 'Tisch decken', en: 'Setting the Table', fr: 'Dressage de table' },
    desc: {
      de: 'Teller, Besteck und Servietten in Montessori-Manier anrichten',
      en: 'Arrange plates, cutlery and napkins Montessori-style',
      fr: 'Disposer assiettes, couverts et serviettes façon Montessori'
    },
    age: '2-6',
    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=400&fit=crop'
  }
];

export function ActivitiesPage({ lang, t }: ActivitiesPageProps) {
  const pageTitle = lang === 'de' ? 'Aktivitäten' : lang === 'en' ? 'Activities' : 'Activités';
  
  return (
    <>
      <SEO lang={lang} pageTitle={pageTitle} />
      
      <div className="pt-24 lg:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-tuki-schwarz mb-4">
              {t.activities}
            </h1>
            <p className="text-lg text-tuki-blau/70">{t.activitiesDesc}</p>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {activities.map((activity) => (
              <div key={activity.id} className="bg-tuki-sand rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title[lang]}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-tuki-schwarz">{activity.title[lang]}</h3>
                    <span className="text-xs font-medium bg-tuki-rot/10 text-tuki-rot px-3 py-1 rounded-full">
                      {activity.age} Jahre
                    </span>
                  </div>
                  <p className="text-tuki-blau/70">{activity.desc[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
