import { type Translation } from '../types';
import { SEO } from '../components/SEO';

interface DevelopmentPageProps {
  lang: 'de' | 'en' | 'fr';
  t: Translation;
}

const milestones = [
  {
    age: '12-18',
    months: { de: 'Monate', en: 'months', fr: 'mois' },
    items: {
      de: ['Greifreflex', 'Objekte erkunden', 'Erste Wörter'],
      en: ['Grasping reflex', 'Exploring objects', 'First words'],
      fr: ['Réflexe de préhension', 'Explorer les objets', 'Premiers mots']
    }
  },
  {
    age: '18-24',
    months: { de: 'Monate', en: 'months', fr: 'mois' },
    items: {
      de: ['Selbstständiges Gehen', 'Einfache Aufgaben', 'Hilfsbereitschaft'],
      en: ['Independent walking', 'Simple tasks', 'Helping behavior'],
      fr: ['Marche indépendante', 'Tâches simples', 'Comportement aidant']
    }
  },
  {
    age: '2-3',
    months: { de: 'Jahre', en: 'years', fr: 'ans' },
    items: {
      de: ['Sprachentwicklung', 'Feinmotorik', 'Soziales Lernen'],
      en: ['Language development', 'Fine motor skills', 'Social learning'],
      fr: ['Développement du langage', 'Motricité fine', 'Apprentissage social']
    }
  },
  {
    age: '3-5',
    months: { de: 'Jahre', en: 'years', fr: 'ans' },
    items: {
      de: ['Zählen', 'Schreiben vorbereiten', 'Selbstständigkeit'],
      en: ['Counting', 'Pre-writing', 'Independence'],
      fr: ['Compter', 'Pré-écriture', 'Indépendance']
    }
  },
  {
    age: '5-8',
    months: { de: 'Jahre', en: 'years', fr: 'ans' },
    items: {
      de: ['Lesen lernen', 'Komplexe Aufgaben', 'Teamarbeit'],
      en: ['Learning to read', 'Complex tasks', 'Teamwork'],
      fr: ['Apprendre à lire', 'Tâches complexes', 'Travail d\'équipe']
    }
  }
];

export function DevelopmentPage({ lang, t }: DevelopmentPageProps) {
  const pageTitle = lang === 'de' ? 'Entwicklung' : lang === 'en' ? 'Development' : 'Développement';
  
  return (
    <>
      <SEO lang={lang} pageTitle={pageTitle} />
      
      <div className="pt-24 lg:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-tuki-schwarz mb-4">
              {t.development}
            </h1>
            <p className="text-lg text-tuki-blau/70">{t.developmentDesc}</p>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={milestone.age} className="bg-tuki-sand rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Age Badge */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-tuki-rot rounded-2xl flex flex-col items-center justify-center text-tuki-weiss">
                    <span className="text-2xl font-bold">{milestone.age}</span>
                    <span className="text-xs opacity-80">{milestone.months[lang]}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <ul className="space-y-2">
                    {milestone.items[lang].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-tuki-schwarz">
                        <svg className="w-5 h-5 text-tuki-rot flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
