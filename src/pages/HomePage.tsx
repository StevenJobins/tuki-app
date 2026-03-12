import { Link } from 'react-router-dom';
import type { Language, Translation } from '../types';
import { SEO } from '../components/SEO';

interface HomePageProps {
  lang: Language;
  t: Translation;
}

export function HomePage({ lang, t }: HomePageProps) {
  const badgeText = lang === 'de' ? 'Neu: Limited Edition 2026' : lang === 'en' ? 'New: Limited Edition 2026' : 'Nouveau: Édition Limitée 2026';

  return (
    <>
      <SEO lang={lang} />
      <div className="pt-24 lg:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-6 lg:space-y-8">
              <div className="inline-flex items-center gap-2 bg-tuki-mint/30 px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-tuki-rot rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-tuki-rot tracking-wide uppercase">{badgeText}</span>
              </div>
              <div className="space-y-3 lg:space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-tuki-schwarz leading-tight tracking-tight">{t.title}</h1>
                <p className="text-xl sm:text-2xl lg:text-3xl text-tuki-blau font-light">{t.subtitle}</p>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-semibold text-tuki-schwarz">{t.price}</span>
                <span className="text-base lg:text-lg text-tuki-blau/70">{t.shipping}</span>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/shop" className="group inline-flex items-center justify-center bg-tuki-rot text-tuki-weiss px-8 sm:px-10 py-4 rounded-full font-medium text-base sm:text-lg transition-all duration-300 hover:bg-tuki-rot-dark hover:shadow-xl hover:shadow-tuki-rot/20 hover:-translate-y-0.5">
                  {t.cta}
                  <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <Link to="#features" className="inline-flex items-center justify-center px-8 py-4 rounded-full font-medium text-base sm:text-lg text-tuki-schwarz border-2 border-tuki-schwarz/20 transition-all duration-300 hover:border-tuki-rot hover:text-tuki-rot hover:bg-white/50">
                  {t.learnMore}
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 text-sm text-tuki-blau">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-tuki-rot flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span>{t.features.freeShipping}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-tuki-rot flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span>{t.features.warranty}</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-tuki-mint/40 via-tuki-sand to-tuki-orange/20 flex items-center justify-center relative overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop" alt="Tuki Learning Tower" className="w-4/5 h-4/5 object-cover rounded-2xl shadow-xl" />
                <div className="absolute bottom-6 right-6 bg-tuki-mint text-tuki-schwarz text-sm font-bold px-4 py-2 rounded-full shadow-lg">{t.features.adjustableHeight}</div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div id="features" className="mt-20 lg:mt-32">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-tuki-schwarz mb-4">{lang === 'de' ? 'Entdecken Sie Tuki' : lang === 'en' ? 'Discover Tuki' : 'Découvrez Tuki'}</h2>
              <p className="text-lg text-tuki-blau/70">{lang === 'de' ? 'Die perfekte Lernumgebung für Ihr Kind' : lang === 'en' ? 'The perfect learning environment for your child' : 'L\'environnement d\'apprentissage parfait pour votre enfant'}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/activities" className="group bg-tuki-sand rounded-2xl p-6 lg:p-8 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-12 h-12 bg-tuki-rot/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-tuki-rot/20 transition-colors">
                  <svg className="w-6 h-6 text-tuki-rot" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                </div>
                <h3 className="text-xl font-semibold text-tuki-schwarz mb-2">{t.activities}</h3>
                <p className="text-tuki-blau/70">{t.activitiesDesc}</p>
              </Link>
              <Link to="/recipes" className="group bg-tuki-sand rounded-2xl p-6 lg:p-8 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-12 h-12 bg-tuki-rot/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-tuki-rot/20 transition-colors">
                  <svg className="w-6 h-6 text-tuki-rot" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <h3 className="text-xl font-semibold text-tuki-schwarz mb-2">{t.recipes}</h3>
                <p className="text-tuki-blau/70">{t.recipesDesc}</p>
              </Link>
              <Link to="/development" className="group bg-tuki-sand rounded-2xl p-6 lg:p-8 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-12 h-12 bg-tuki-rot/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-tuki-rot/20 transition-colors">
                  <svg className="w-6 h-6 text-tuki-rot" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-semibold text-tuki-schwarz mb-2">{t.development}</h3>
                <p className="text-tuki-blau/70">{t.developmentDesc}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
