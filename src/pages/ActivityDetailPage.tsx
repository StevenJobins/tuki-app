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
    title: { de: 'Apfel schneiden', en: 'Cutting Apples', fr: 'Couper Pommes' },
    desc: { de: 'Erste Messererfahrung – sicher und selbstständig', en: 'First knife experience', fr: 'Première expérience couteau' },
    image: 'https://images.unsplash.com/photo-1568702846914-85f8fc3f27b3?w=800&h=600&fit=crop',
    age: '2-4',
    duration: '10 min',
    materials: ['Apfel', 'Kinder-Messer', 'Schneidebrett', 'Schale'],
    steps: ['Apfel waschen', 'Auf Brett legen', 'Mit beiden Händen schneiden', 'Stücke in Schale'],
    skills: ['Feinmotorik', 'Konzentration', 'Selbstständigkeit']
  },
  {
    id: 'eier-aufschlagen',
    title: { de: 'Eier aufschlagen', en: 'Cracking Eggs', fr: 'Casser Œufs' },
    desc: { de: 'Zwei-Hände-Koordination mit Erfolgserlebnis', en: 'Two-hand coordination', fr: 'Coordination deux mains' },
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&h=600&fit=crop',
    age: '2-5',
    duration: '5 min',
    materials: ['Eier', 'Schüssel', 'Feuchtes Tuch'],
    steps: ['Ei in beiden Händen halten', 'An Schüsselrand klopfen', 'Vorsichtig öffnen', 'In Schüssel gleiten lassen'],
    skills: ['Koordination', 'Geduld', 'Handkraft']
  },
  {
    id: 'gemuese-waschen',
    title: { de: 'Gemüse waschen', en: 'Washing Vegetables', fr: 'Laver Légumes' },
    desc: { de: 'Sensorisches Wassererlebnis am TUKI', en: 'Sensory water play', fr: 'Expérience eau sensorielle' },
    image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&h=600&fit=crop',
    age: '1-4',
    duration: '10 min',
    materials: ['Gemüse', 'Sieb', 'Bürste', 'Handtuch'],
    steps: ['Gemüse unter Wasser halten', 'Mit Bürste sanft reiben', 'Abspülen', 'Im Sieb abtropfen'],
    skills: ['Sinnesschulung', 'Lebenspraxis', 'Fürsorge']
  },
  {
    id: 'wasser-giessen',
    title: { de: 'Wasser gießen', en: 'Pouring Water', fr: 'Verser Eau' },
    desc: { de: 'Kon­zen­tration und Kontrolle üben', en: 'Focus and control', fr: 'Concentration et contrôle' },
    image: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=800&h=600&fit=crop',
    age: '1-3',
    duration: '5 min',
    materials: ['Kleine Kanne', 'Zwei Becher', 'Schwamm', 'Tablett'],
    steps: ['Tablett aufstellen', 'Kanne mit Wasser füllen', 'Langsam in Becher gießen', 'Umgekipptes aufwischen'],
    skills: ['Gleichgewicht', 'Handkraft', 'Ordnung']
  },
  {
    id: 'brot-schneiden',
    title: { de: 'Brot schneiden', en: 'Cutting Bread', fr: 'Couper Pain' },
    desc: { de: 'Frühstückstisch mitgestalten', en: 'Help with breakfast', fr: 'Aider au petit-déjeuner' },
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
    age: '2-5',
    duration: '10 min',
    materials: ['Brot', 'Kochmesser', 'Schneidebrett'],
    steps: ['Brot auf Brett legen', 'Messigriff zeigen', 'Sägebewegung üben', 'Scheiben servieren'],
    skills: ['Selbstversorgung', 'Förderschulung', 'Grossmotorik']
  },
  {
    id: 'tisch-decken',
    title: { de: 'Tisch decken', en: 'Setting Table', fr: 'Dresser Table' },
    desc: { de: 'Familienmitglied beim Essensritual', en: 'Family dinner ritual', fr: 'Rituel repas famille' },
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d71?w=800&h=600&fit=crop',
    age: '2-6',
    duration: '5 min',
    materials: ['Teller', 'Besteck', 'Servietten'],
    steps: ['Materialien vom TUKI holen', 'Teller auf Tisch tragen', 'Besteck rechts legen', 'Serviette falten'],
    skills: ['Sozialkompetenz', 'Sequenzieren', 'Selbstwertgefühl']
  }
];

export function ActivityDetailPage({ lang, t }: ActivityDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  useEffect(() => window.scrollTo(0, 0), [id]);
  
  const activity = activities.find(a => a.id === id);
  
  if (!activity) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-2xl font-semibold mb-4">
          {lang === 'de' ? 'Nicht gefunden' : lang === 'en' ? 'Not found' : 'Introuvable'}
        </h1>
        <Link to="/activities" className="text-tuki-rot">← {t.activities}</Link>
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
          
          <h1 className="text-3xl font-semibold mb-2">{activity.title[lang]}</h1>
          <p className="text-tuki-blau/70 mb-4">{activity.desc[lang]}</p>
          
          <div className="flex gap-3 mb-8">
            <span className="bg-tuki-rot/10 text-tuki-rot px-3 py-1 rounded-full text-sm">👶 {activity.age}</span>
            <span className="bg-tuki-rot/10 text-tuki-rot px-3 py-1 rounded-full text-sm">⏱ {activity.duration}</span>
          </div>
          
          <div className="bg-tuki-sand rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">📝 Materialien</h2>
            <ul className="grid grid-cols-2 gap-2">
              {activity.materials.map((m, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-tuki-rot rounded-full"></span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">📋 Anleitung</h2>
            <ol className="space-y-3">
              {activity.steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-tuki-rot text-white rounded-full flex items-center justify-center">{i+1}</span>
                  <p className="pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          
          <div className="bg-tuki-mint/20 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">🎯 Entwicklungsförderung</h2>
            <div className="flex flex-wrap gap-2">
              {activity.skills.map((skill, i) => (
                <span key={i} className="bg-white px-3 py-1 rounded-full text-sm">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
