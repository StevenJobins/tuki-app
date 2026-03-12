import { useState } from 'react'

function App() {
  const [language, setLanguage] = useState<'de' | 'en' | 'fr'>('de')

  const translations = {
    de: {
      title: 'Tuki Learning Tower',
      subtitle: 'Hilf mir, es selbst zu tun',
      price: 'CHF 299',
      cta: 'Jetzt kaufen',
      activities: 'Aktivitäten',
      activitiesDesc: 'Montessori Aktivitäten für Kinder 0-8 Jahre, entwickelt von Experten',
      recipes: 'Rezepte',
      recipesDesc: 'Kindgerechte Rezepte zum Mitmachen – kochen Sie gemeinsam',
      development: 'Entwicklung',
      developmentDesc: 'Entwicklungsmeilensteine nach Montessori für jede Altersstufe',
      footerTagline: 'Swiss Design. Made in EU.',
      footerNav: { contact: 'Kontakt', support: 'Support', privacy: 'Datenschutz' }
    },
    en: {
      title: 'Tuki Learning Tower',
      subtitle: 'Help me do it myself',
      price: 'CHF 299',
      cta: 'Buy now',
      activities: 'Activities',
      activitiesDesc: 'Montessori activities for children 0-8 years, developed by experts',
      recipes: 'Recipes',
      recipesDesc: 'Child-friendly recipes to make together – cook as a team',
      development: 'Development',
      developmentDesc: 'Development milestones following Montessori for every age',
      footerTagline: 'Swiss Design. Made in EU.',
      footerNav: { contact: 'Contact', support: 'Support', privacy: 'Privacy' }
    },
    fr: {
      title: 'Tuki Learning Tower',
      subtitle: 'Aide-moi à le faire moi-même',
      price: 'CHF 299',
      cta: 'Acheter',
      activities: 'Activités',
      activitiesDesc: 'Activités Montessori pour enfants 0-8 ans, développées par des experts',
      recipes: 'Recettes',
      recipesDesc: 'Recettes adaptées aux enfants pour cuisiner ensemble',
      development: 'Développement',
      developmentDesc: 'Jalons de développement selon Montessori pour chaque âge',
      footerTagline: 'Design Suisse. Fabriqué en EU.',
      footerNav: { contact: 'Contact', support: 'Support', privacy: 'Confidentialité' }
    }
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-tuki-sand font-tuki">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-tuki-sand/95 backdrop-blur-sm border-b border-tuki-rot/10">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-tuki-schwarz">TUKI</h1>
            <span className="text-xs text-tuki-blau font-medium tracking-widest uppercase">Learning Tower</span>
          </div>
          <nav className="flex gap-1 bg-tuki-sand/50 p-1 rounded-full border border-tuki-rot/10">
            {(['de', 'en', 'fr'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  language === lang
                    ? 'bg-tuki-rot text-tuki-weiss shadow-sm'
                    : 'text-tuki-blau hover:text-tuki-schwarz hover:bg-white/50'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section - Split Layout */}
      <section className="pt-32 pb-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-tuki-mint/30 px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-tuki-rot rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-tuki-rot tracking-wide uppercase">Neu: Limited Edition 2026</span>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-6xl lg:text-7xl font-semibold text-tuki-schwarz leading-[1.1] tracking-tight">
                  {t.title}
                </h2>
                <p className="text-2xl lg:text-3xl text-tuki-blau font-light">
                  {t.subtitle}
                </p>
              </div>
              
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-semibold text-tuki-schwarz">{t.price}</span>
                <span className="text-lg text-tuki-blau/70">inkl. Versand</span>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="group bg-tuki-rot text-tuki-weiss px-10 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:bg-tuki-rot-dark hover:shadow-xl hover:shadow-tuki-rot/20 hover:-translate-y-0.5">
                  {t.cta}
                  <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
                <button className="px-8 py-4 rounded-full font-medium text-lg text-tuki-schwarz border-2 border-tuki-schwarz/20 transition-all duration-300 hover:border-tuki-rot hover:text-tuki-rot hover:bg-white/50">
                  Mehr erfahren
                </button>
              </div>
              
              <div className="flex items-center gap-6 pt-4 text-sm text-tuki-blau">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-tuki-rot" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Kostenloser Versand</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-tuki-rot" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>5 Jahre Garantie</span>
                </div>
              </div>
            </div>
            
            {/* Product Image Placeholder */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-tuki-mint/40 via-tuki-sand to-tuki-orange/20 flex items-center justify-center relative overflow-hidden">
                {/* Product Placeholder */}
                <div className="relative w-4/5 h-4/5 bg-white/80 rounded-2xl shadow-2xl flex flex-col items-center justify-center border border-white/50">
                  {/* Learning Tower Icon */}
                  <div className="relative">
                    {/* Tower base */}
                    <div className="w-32 h-40 bg-tuki-rot rounded-lg flex items-center justify-center relative">
                      <div className="absolute inset-2 border-2 border-tuki-mint/50 rounded"></div>
                      <span className="text-4xl">👶</span>
                    </div>
                    {/* Platform */}
                    <div className="absolute -top-4 left-0 right-0 h-4 bg-tuki-rot-dark rounded-t-lg"></div>
                    {/* Steps indication */}
                    <div className="absolute -bottom-2 -right-2 bg-tuki-mint text-tuki-schwarz text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      Höhenverstellbar
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-8 right-8 w-20 h-20