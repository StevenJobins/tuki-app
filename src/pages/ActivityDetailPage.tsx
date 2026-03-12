import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import type { Language, Translation } from '../types';
import { SEO } from '../components/SEO';

interface ActivityDetailPageProps {
  lang: Language;
  t: Translation;
}

const activities = [
  {
    id: 'apfel-schneiden',
    title: { de: 'Apfel schneiden', en: 'Cutting Apples', fr: 'Couper des Pommes' },
    desc: { de: 'Kindern beibringen, Äpfel sicher zu schneiden', en: 'Teaching children to cut apples safely', fr: 'Apprendre aux enfants à couper' },
    image: 'https://images.unsplash.com/photo-1568702846914-85f8fc3f27b3?w=600&h=400&fit=crop',
    age: '2-4',
    time: '10 min',
    materials: ['Apfel', 'Kinder-Messer', 'Schneidebrett', 'Schüssel'],
    steps: ['Apfel waschen', 'Auf Schneidebrett legen', 'Mit Erwachsenen schneiden', 'Stücke in Schale'],
    tips: ['Immer Aufsicht', 'Zwei Hände am Messer', 'Feinmotorik trainieren']
  },
  {
    id: 'eier-aufschlagen',
    title: { de: 'Eier aufschlagen', en: 'Cracking Eggs', fr: 'Casser des Œufs' },
    desc: { de: 'Perfekte Motorik-Übung für kleine Hände', en: 'Perfect motor skills practice', fr: 'Parfait pour motricité' },
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&h=400&fit=crop',
    age: '2-5',
    time: '5 min',
    materials: ['Eier', 'Kleine Schüssel', 'Tuch zum Abwischen'],
    steps: ['Ei in beiden Händen halten', 'An den Schalen klopfen', 'Vorsichtig öffnen', 'In Schüssel geben'],
    tips: ['Über Schüssel arbeiten', 'Keine Eierschalen essen', 'Hände danach waschen']
  },
  {
    id: 'gemuese-waschen',
    title: { de: 'Gemüse waschen', en: 'Washing Vegetables', fr: 'Laver les Légumes' },
    desc: { de: 'Sensorisches Erlebnis unter fließendem Wasser', en: 'Sensory experience at the sink', fr: 'Expérience sensorielle' },
    image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&h=400&fit=crop',
    age: '1-4',
    time: '10 min',
    materials: ['Gemüse', 'Sieb', 'Kleines Handtuch', 'Abtropfschale'],
    steps: ['Waschbecken mit Hocker erreichen', 'Gemüse unter Wasser halten', 'Mit Bürstereiben', 'Im Sieb abtropfen'],
    tips: ['Wasser-Temperatur checken', 'Kein Spritzen', 'Dreh-Hahn benutzen']
  },
  {
    id: 'wasser-giessen',
    title: { de: 'Wasser gießen', en: 'Pouring Water', fr: 'Verser de l\'Eau' },
    desc: { de: 'Practical Life Skill: Konzentration und Kontrolle', en: 'Practical Life: Focus and control', fr: 'Vie pratique' },
    image: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=600&h=400&fit=crop',
    age: '1-3',
    time: '5 min',
    materials: ['Kleine Kanne', 'Zwei Becher', 'Handtuch', 'Tablett'],
    steps: ['Tablett aufstellen', 'Kanne mit Wasser füllen', 'Von links nach rechts gießen', 'Umgestülpte Tropfen wischen'],
    tips: ['Becher-hälfte nur füllen', 'Langsam gießen', 'Tropfen normalisieren']
  }
];

export function ActivityDetailPage({ lang, t }: ActivityDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  useEffect(() => window.scrollTo(0, 0), [id]);
  
  const activity = activities.find(a => a.id === id);
  
  if (!activity) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-2xl font-semibold mb-4">Nicht gefunden</h1>
        <Link to="/activities" className="text-tuki-rot">← Zurück</Link>
      </div>
    );
  }
  
  return (
    <>
      <SEO lang={lang} pageTitle={activity.title[lang]} />
      <div className="pt-24 lg:pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <Link to="/activities" className="text-tuki-blau hover:text-tuki-rot mb-6 inline-block">← {t.activities}</Link>
          
          <img src={activity.image} alt={activity.title[lang]} className="w-full h-64 object-cover rounded-2xl mb-6" />
          
          <h1 className="text-3xl font-semibold text-tuki-schwarz mb-2">{activity.title[lang]}</h1>
          <p className="text-tuki-blau/70 mb-4">{activity.desc[lang]}</p>
          
          <div className="flex gap-3 mb-8">
            <span className="bg-tuki-rot/10 text-tuki-rot px-3 py-1 rounded-full text-sm">{activity.age} Jahre</span>
            <span className="bg-tuki-rot/10 text-tuki-rot px-3 py-1 rounded-full text-sm">{activity.time}</span>
          </div>
          
          {/* Materials */}
          <div className="bg-tuki-sand rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">📝 {lang === 'de' ? 'Materialien' : 'Materials'}</h2>
            <ul className="grid grid-cols-2 gap-2">
              {activity.materials.map((m, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-tuki-rot rounded-full"></span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Steps */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">📋 {lang === 'de' ? 'Anleitung' : 'Instructions'}</h2>
            <ol className="space-y-3">
              {activity.steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-tuki-rot text-white rounded-full flex items-center justify-center">{i+1}</span>
                  <p className="pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          
          {/* Tips */}
          <div className="bg-tuki-mint/20 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">💡 Tipps</h2>
            <ul className="space-y-2">
              {activity.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-tuki-rot">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
