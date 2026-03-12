import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import type { Language } from '../types';

interface LayoutProps {
  lang: Language;
  onLangChange: (lang: Language) => void;
}

export function Layout({ lang, onLangChange }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} onLangChange={onLangChange} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer lang={lang} t={{}} />
    </div>
  );
}
