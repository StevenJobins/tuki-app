import { Link } from 'react-router-dom';
import type { Language, Translation } from '../types';

interface FooterProps {
  lang: Language;
  t: Translation;
}

export function Footer({ lang, t }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-tuki-schwarz text-tuki-sand py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">TUKI</h3>
            <p className="text-tuki-blau/80 text-sm">{t.footer.tagline}</p>
            <p className="text-tuki-blau/60 text-xs">
              © {currentYear} Tuki Learning Tower
            </p>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="font-medium text-tuki-weiss">Produkte</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop" className="text-tuki-blau/80 hover:text-tuki-rot transition-colors">
                  Learning Tower
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-tuki-blau/80 hover:text-tuki-rot transition-colors">
                  Zubehör
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-medium text-tuki-weiss">
              {lang === 'de' ? 'Ressourcen' : lang === 'fr' ? 'Ressources' : 'Resources'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/activities" className="text-tuki-blau/80 hover:text-tuki-rot transition-colors">
                  {t.activities}
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="text-tuki-blau/80 hover:text-tuki-rot transition-colors">
                  {t.recipes}
                </Link>
              </li>
              <li>
                <Link to="/development" className="text-tuki-blau/80 hover:text-tuki-rot transition-colors">
                  {t.development}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-medium text-tuki-weiss">{t.footer.contact}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:hello@tuki.ch" className="text-tuki-blau/80 hover:text-tuki-rot transition-colors">
                  hello@tuki.ch
                </a>
              </li>
              <li>
                <Link to="/support" className="text-tuki-blau/80 hover:text-tuki-rot transition-colors">
                  {t.footer.support}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-tuki-blau/80 hover:text-tuki-rot transition-colors">
                  {t.footer.privacy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-tuki-blau/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-tuki-blau/60 text-xs">
            Made with ♥ in Switzerland
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/tuki"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tuki-blau/60 hover:text-tuki-weiss transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
