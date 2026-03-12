import { Link } from 'react-router-dom';
import type { Language, Translation } from '../types';
import { SEO } from '../components/SEO';

interface ActivitiesPageProps {
  lang: Language;
  t: Translation;
}

const activities = [
  {
    id: 'apfel-schneiden',
    title: { de: 'Apfel schneiden', en: 'Cutting Apples', fr: 'Couper Pommes' },
    desc: { de: 'Erste Schnittübungen mit sicherem Messer', en: 'First cutting practice', fr: 'Premier exercice coupe' },
    age: '2-4',
    image: 'https://images.unsplash.com/photo-1568702846914-85f8fc3f27b3?w=600&h=400&fit=crop',
    skills: { de: ['Feinmotorik', 'Konzentration'], en: ['Fine motor', 'Focus'], fr: ['Motricité fine', 'Concentration'] }
  },
  {
    id: 'eier-aufschlagen',
    title: { de: 'Eier aufschlagen', en: 'Cracking Eggs', fr: 'Casser Œufs' },
    desc: { de: 'Perfekte Motorik mit beiden Händen', en: 'Two-hand coordination', fr: 'Coordination mains' },
    age: '2-5',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&h=400&fit=crop',
    skills: { de: ['Koordination', 'Geduld'], en: ['Coordination', 'Patience'], fr: ['Coordination', 'Patience'] }
  },
  {
    id: 'gemuese-waschen',
    title: { de: 'Gemüse waschen', en: 'Washing Vegetables', fr: 'Laver Légumes' },
    desc: { de: 'Sensorisches Erlebnis am Wasser', en: 'Sensory water play', fr: 'Expérience sensorielle' },
    age: '1-4',
    image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&h=400&fit=crop',
    skills: { de: ['Sinne', 'Lebenspraxis'], en: ['Senses', 'Practical life'], fr: ['Sens', 'Vie pratique'] }
  },
  {
    id: 'wasser-giessen',
    title: { de: 'Wasser gießen', en: 'Pouring Water', fr: 'Verser Eau' },
    desc: { de: 'Konzentration und Kontrolle üben', en: 'Focus and control', fr: 'Contrôle et focus' },
    age: '1-3',
    image: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=600&h=400&fit=crop',
    skills: { de: ['Gleichgewicht', 'Handkraft'], en: ['Balance', 'Strength'], fr: ['Équilibre', 'Force'] }
  }
];

export function ActivitiesPage({ lang, t }: ActivitiesPageProps) {
  const pageTitle = lang === 'de' ? 'Aktivitäten' : lang === 'en' ? 'Activities' : 'Activités';

  return (
    <>
      <SEO lang={lang} pageTitle={pageTitle} />
      <div className="pt-24 lg:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-tuki-schwarz mb-4">{pageTitle}</h1>
          <p className="text-tuki-blau/70 mb-8 max-w-2xl">{t.activitiesDesc}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities.map(activity => (
              <Link 
                key={activity.id}
                to={`/activities/${activity.id}`}
                className="group bg-tuki-sand rounded-2xl overflow-hidden hover:shadow-xl transition-all flex flex-col md:flex-row"
              >
                <div className="md:w-2/5 aspect-video md:aspect-auto overflow-hidden">
                  <img src={activity.image} alt={activity.title[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <div className="flex gap-2 mb-2">
                    <span className="text-xs bg-tuki-rot/10 text-tuki-rot px-2 py-1 rounded-full">{activity.age} Jahre</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{activity.title[lang]}</h3>
                  <p className="text-tuki-blau/70 mb-3">{activity.desc[lang]}</p>
                  <div className="flex flex-wrap gap-1">
                    {activity.skills[lang].map(skill => (
                      <span key={skill} className="text-xs bg-tuki-sand/50 text-tuki-blau px-2 py-1 rounded">{skill}</span>
                    ))}
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
