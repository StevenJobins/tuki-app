import { Link } from 'react-router-dom';
import type { Language, Translation } from '../types';
import { SEO } from '../components/SEO';

interface HomePageProps {
  lang: Language;
  t: Translation;
}

export function HomePage({ lang, t }: HomePageProps) {
  const welcomeText = lang === 'de' ? 'Willkommen in Ihrer Tuki-Welt!' : lang === 'en' ? 'Welcome to your Tuki world!' : 'Bienvenue dans votre monde Tuki!';
  const ctaPrimary = lang === 'de' ? 'Rezepte entdecken' : lang === 'en' ? 'Discover recipes' : 'Découvrir recettes';
  const ctaSecondary = lang === 'de' ? 'Aktivitäten' : lang === 'en' ? 'Activities' : 'Activités';

  return (
    <>
      <SEO lang={lang} />
      <div className="pt-24 lg:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-tuki-mint/30 px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-tuki-rot rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-tuki-rot">{welcomeText}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-tuki-schwarz leading-tight">{t.title}</h1>
              <p className="text-xl text-tuki-blau font-light">{t.subtitle}</p>
              <p className="text-tuki-blau/80">
                {lang === 'de' ? 'Rezepte, Aktivitäten und Entwicklungstipps speziell für Tuki-Familien.' : 
                 lang === 'en' ? 'Recipes, activities and development tips for Tuki families.' : 
                 'Recettes, activités et conseils pour familles Tuki.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/recipes" className="inline-flex items-center bg-tuki-rot text-white px-8 py-4 rounded-full font-medium hover:bg-tuki-rot-dark transition-all">
                  {ctaPrimary} →
                </Link>
                <Link to="/activities" className="inline-flex items-center px-8 py-4 rounded-full border-2 border-tuki-schwarz/20 hover:border-tuki-rot hover:text-tuki-rot transition-all">
                  {ctaSecondary}
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-tuki-mint/40 to-tuki-orange/20 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop" alt="Tuki" className="w-4/5 h-4/5 object-cover rounded-2xl shadow-xl" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/activities" className="group bg-tuki-sand rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-tuki-rot/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-tuki-rot/20">
                <span className="text-2xl">👶</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.activities}</h3>
              <p className="text-tuki-blau/70">{t.activitiesDesc}</p>
            </Link>
            <Link to="/recipes" className="group bg-tuki-sand rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-tuki-rot/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-tuki-rot/20">
                <span className="text-2xl">🍳</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.recipes}</h3>
              <p className="text-tuki-blau/70">{t.recipesDesc}</p>
            </Link>
            <Link to="/development" className="group bg-tuki-sand rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-tuki-rot/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-tuki-rot/20">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.development}</h3>
              <p className="text-tuki-blau/70">{t.developmentDesc}</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
