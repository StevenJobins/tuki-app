import { useState } from 'react';
import { type Language, type Translation } from '../types';
import { SEO } from '../components/SEO';

interface DevelopmentPageProps {
  lang: Language;
  t: Translation;
}

type MilestoneStatus = 'completed' | 'inProgress' | 'notStarted';

interface Milestone {
  age: string;
  months: Record<Language, string>;
  items: Record<Language, string[]>;
  status: MilestoneStatus;
  completedDate?: string;
}

const initialMilestones: Milestone[] = [
  {
    age: '12-18',
    months: { de: 'Monate', en: 'months', fr: 'mois' },
    items: {
      de: ['Greifreflex verbessert', 'Objekte erkunden', 'Erste Wörter'], 
      en: ['Grasping reflex improved', 'Exploring objects', 'First words'], 
      fr: ['Réflexe de préhension amélioré', 'Explorer les objets', 'Premiers mots'] 
    },
    status: 'completed',
    completedDate: '2024-06-15',
  },
  {
    age: '18-24',
    months: { de: 'Monate', en: 'months', fr: 'mois' },
    items: {
      de: ['Selbstständiges Gehen', 'Einfache Aufgaben', 'Hilfsbereitschaft'], 
      en: ['Independent walking', 'Simple tasks', 'Helping behavior'], 
      fr: ['Marche indépendante', 'Tâches simples', 'Comportement aidant'] 
    },
    status: 'completed',
    completedDate: '2024-12-10',
  },
  {
    age: '2-3',
    months: { de: 'Jahre', en: 'years', fr: 'ans' },
    items: {
      de: ['Sprachentwicklung', 'Feinmotorik', 'Soziales Lernen'],
      en: ['Language development', 'Fine motor skills', 'Social learning'],
      fr: ['Développement du langage', 'Motricité fine', 'Apprentissage social']
    },
    status: 'inProgress',
  },
  {
    age: '3-5',
    months: { de: 'Jahre', en: 'years', fr: 'ans' },
    items: {
      de: ['Zählen lernen', 'Schreiben vorbereiten', 'Selbstständigkeit'], 
      en: ['Learning to count', 'Pre-writing', 'Independence'], 
      fr: ['Apprendre à compter', 'Pré-écriture', 'Indépendance'] 
    },
    status: 'notStarted',
  },
  {
    age: '5-8',
    months: { de: 'Jahre', en: 'years', fr: 'ans' },
    items: {
      de: ['Lesen lernen', 'Komplexe Aufgaben', 'Teamarbeit'], 
      en: ['Learning to read', 'Complex tasks', 'Teamwork'], 
      fr: ['Apprendre à lire', 'Tâches complexes', 'Travail d\'équipe'] 
    },
    status: 'notStarted',
  },
];

export function DevelopmentPage({ lang, t }: DevelopmentPageProps) {
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);
  const pageTitle = lang === 'de' ? 'Entwicklung' : lang === 'en' ? 'Development' : 'Développement';
  const completedCount = milestones.filter((m) => m.status === 'completed').length;

  const markComplete = (index: number) => {
    setMilestones((prev) =>
      prev.map((m, i) =>
        i === index ? { ...m, status: 'completed', completedDate: new Date().toISOString().split('T')[0] } : m
      )
    );
  };

  return (
    <>
      <SEO lang={lang} pageTitle={pageTitle} />
      <div className="pt-24 lg:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-tuki-schwarz mb-4">{t.development}</h1>
            <p className="text-lg text-tuki-blau/70">{t.developmentDesc}</p>
          </div>

          <div className="bg-tuki-sand/50 rounded-2xl p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-tuki-rot">{completedCount}</div>
                  <div className="text-sm text-tuki-blau/70">{t.achievements}</div>
                </div>
                <div className="w-px h-12 bg-tuki-blau/20"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-tuki-blau">{Math.round((completedCount / milestones.length) * 100)}%</div>
                  <div className="text-sm text-tuki-blau/70">Total progress</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={milestone.age} className={`rounded-2xl p-6 lg:p-8 border-2 ${milestone.status === 'completed' ? 'bg-green-50 border-green-200' : milestone.status === 'inProgress' ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="w-20 h-20 bg-tuki-rot rounded-2xl flex flex-col items-center justify-center text-tuki-weiss flex-shrink-0">
                    <span className="text-2xl font-bold">{milestone.age}</span>
                    <span className="text-xs opacity-80">{milestone.months[lang]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">{milestone.status === 'completed' ? '✓' : milestone.status === 'inProgress' ? '→' : '○'}</span>
                      <span className={`text-sm font-medium ${milestone.status === 'completed' ? 'text-green-600' : milestone.status === 'inProgress' ? 'text-yellow-600' : 'text-gray-500'}`}>
                        {milestone.status === 'completed' ? `Completed ${milestone.completedDate}` : milestone.status === 'inProgress' ? 'In progress' : 'Pending'}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {milestone.items[lang].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-tuki-schwarz">
                          <svg className="w-5 h-5 text-tuki-rot flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className={milestone.status === 'completed' ? 'line-through opacity-60' : ''}>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {milestone.status === 'inProgress' && (
                      <button onClick={() => markComplete(index)} className="mt-4 px-4 py-2 rounded-full text-sm font-medium bg-tuki-rot text-tuki-weiss hover:bg-tuki-rot-dark transition-colors">
                        {t.markComplete}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
