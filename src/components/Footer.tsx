import { Link } from 'react-router-dom';
import type { Language, Translation } from '../types';

interface FooterProps {
  lang: Language;
  t: Translation;
}

export function Footer({ lang, t }: FooterProps) {
  return (
    <footer className="bg-tuki-schwarz text-tuki-sand py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-semibold mb-2">TUKI</h3>
            <p className="text-tuki-blau/80 text-sm mb-4">{t.footer.tagline}</p>
            <p className="text-tuki-blau/60 text-xs">© {new Date().getFullYear()} Tuki Learning Tower</p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-medium text-tuki-weiss mb-3">
              {lang === 'de' ? 'Mehrwert' : lang === 'en' ? 'Resources' : 'Ressources'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/activities" className="text-tuki-blau/80 hover:text-tuki-rot">{t.activities}</Link></li>
              <li><Link to="/recipes" className="text-tuki-blau/80 hover:text-tuki-rot">{t.recipes}</Link></li>
              <li><Link to="/development" className="text-tuki-blau/80 hover:text-tuki-rot">{t.development}</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-medium text-tuki-weiss mb-3">{t.footer.contact}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:hello@tuki.ch" className="text-tuki-blau/80 hover:text-tuki-rot">hello@tuki.ch</a></li>
              <li><Link to="/" className="text-tuki-blau/80 hover:text-tuki-rot">{t.footer.support}</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
