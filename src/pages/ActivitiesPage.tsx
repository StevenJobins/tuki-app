import { Link } from 'react-router-dom';
import type { Language, Translation } from '../types';
import { SEO } from '../components/SEO';
import { FavoriteButton } from '../components/FavoriteButton';

interface ActivitiesPageProps {
  lang: Language;
  t: Translation;
}

const activities = [
  { id: 'apfel-schneiden', title: { de: 'Apfel schneiden', en: 'Cutting Apples', fr: 'Couper Pommes' }, desc: { de: 'Erste Messererfahrung – sicher und selbstständig', en: 'First knife experience', fr: 'Première expérience couteau' }, image: 'https://images.unsplash.com/photo-1568702846914-85f8fc3f27b3?w=600&h=400&fit=crop', age: '2-4', skills: ['Feinmotorik', 'Konzentration'] },
  { id: 'eier-aufschlagen', title: { de: 'Eier aufschlagen', en: 'Cracking Eggs', fr: 'Casser Œufs' }, desc: { de: 'Zwei-Hände-Koordination', en: 'Two-hand coordination', fr: 'Coordination deux mains' }, image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&h=400&fit=crop', age: '2-5', skills: ['Koordination', 'Geduld'] },
  { id: 'gemuese-waschen', title: { de: 'Gemüse waschen', en: 'Washing Vegetables', fr: 'Laver Légumes' }, desc: { de: 'Sensorisches Wassererlebnis', en: 'Sensory water play', fr: 'Expérience eau' }, image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&h=400&fit=crop', age: '1-4', skills: ['Sinne', 'Lebenspraxis'] },
  { id: 'wasser-giessen', title: { de: 'Wasser gießen', en: 'Pouring Water', fr: 'Verser Eau' }, desc: { de: 'Konzentration und Kontrolle', en: 'Focus and control', fr: 'Concentration' }, image: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=600&h=400&fit=crop', age: '1-3', skills: ['Gleichgewicht', 'Handkraft'] },
  { id: 'brot-schneiden', title: { de: 'Brot schneiden', en: 'Cutting Bread', fr: 'Couper Pain' }, desc: { de: 'Frühstück mitgestalten', en: 'Help with breakfast', fr: 'Aider petit-déj' }, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop', age: '2-5', skills: ['Selbstständigkeit'] },
  { id: 'tisch-decken', title: { de: 'Tisch decken', en: 'Setting Table', fr: 'Dresser Table' }, desc: { de: 'Familienritual teilen', en: 'Family ritual', fr: 'Rituel famille' }, image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d71?w=600&h=400&fit=crop', age: '2-6', skills: ['Sozialkompetenz'] }
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
              <Link key={activity.id} to={`/activities/${activity.id}`} className="group bg-tuki-sand rounded-2xl overflow-hidden hover:shadow-xl transition-all flex flex-col sm:flex-row">
                <div className="sm:w-2/5 aspect-video sm:aspect-auto overflow-hidden relative">
                  <img src={activity.image} alt={activity.title[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <FavoriteButton
                    id={activity.id}
                    type="activity"
                    title={activity.title[lang]}
                    image={activity.image}
                    size="sm"
                    className="absolute top-3 right-3"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-center">
                  <span className="text-xs bg-tuki-rot/10 text-tuki-rot px-2 py-1 rounded-full w-fit">{activity.age}</span>
                  <h3 className="text-xl font-semibold mt-2 mb-1">{activity.title[lang]}</h3>
                  <p className="text-tuki-blau/70 text-sm">{activity.desc[lang]}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
