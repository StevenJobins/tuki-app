import { Link, useLocation } from 'react-router-dom';
import type { Language } from '../types';
import { useFavorites } from '../hooks/useFavorites';

interface HeaderProps {
  lang: Language;
  onLangChange: (lang: Language) => void;
}

const navItems: { path: string; labelKey: keyof LanguageNav }[] = [
  { path: '/', labelKey: 'home' },
  { path: '/activities', labelKey: 'activities' },
  { path: '/recipes', labelKey: 'recipes' },
  { path: '/favorites', labelKey: 'favorites' },
  { path: '/development', labelKey: 'development' },
];

type LanguageNav = {
  home: string;
  activities: string;
  recipes: string;
  development: string;
  favorites: string;
};

const navLabels: Record<Language, LanguageNav> = {
  de: { home: 'Start', activities: 'Aktivitäten', recipes: 'Rezepte', development: 'Entwicklung', favorites: 'Favoriten' },
  en: { home: 'Home', activities: 'Activities', recipes: 'Recipes', development: 'Development', favorites: 'Favorites' },
  fr: { home: 'Accueil', activities: 'Activités', recipes: 'Recettes', development: 'Développement', favorites: 'Favoris' },
};

export function Header({ lang, onLangChange }: HeaderProps) {
  const location = useLocation();
  const labels = navLabels[lang];
  const { favorites } = useFavorites();
  const favCount = favorites.length;

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-tuki-sand/95 backdrop-blur-sm border-b border-tuki-rot/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-baseline gap-2 group">
            <h1 className="text-xl lg:text-2xl font-semibold tracking-tight text-tuki-schwarz group-hover:text-tuki-rot transition-colors">
              TUKI
            </h1>
            <span className="text-xs text-tuki-blau font-medium tracking-widest uppercase hidden sm:inline">
              Learning Tower
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-tuki-rot text-tuki-weiss'
                    : 'text-tuki-blau hover:text-tuki-schwarz hover:bg-white/50'
                }`}
              >
                {item.path === '/favorites' && favCount > 0 ? (
                  <span className="flex items-center gap-1">
                    {labels[item.labelKey]}
                    <span className="bg-white text-tuki-rot text-xs px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
                      {favCount}
                    </span>
                  </span>
                ) : (
                  labels[item.labelKey]
                )}
              </Link>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-tuki-sand/50 p-1 rounded-full border border-tuki-rot/10">
            {(['de', 'en', 'fr'] as const).map((l) => (
              <button
                key={l}
                onClick={() => onLangChange(l)}
                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  lang === l
                    ? 'bg-tuki-rot text-tuki-weiss shadow-sm'
                    : 'text-tuki-blau hover:text-tuki-schwarz hover:bg-white/50'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden -mx-4 px-4 pb-3 overflow-x-auto">
          <nav className="flex items-center gap-2 min-w-max">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                  isActive(item.path)
                    ? 'bg-tuki-rot text-tuki-weiss'
                    : 'text-tuki-blau hover:text-tuki-schwarz hover:bg-white/50'
                }`}
              >
                {item.path === '/favorites' && favCount > 0
                  ? `${labels[item.labelKey]} (${favCount})`
                  : labels[item.labelKey]}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
