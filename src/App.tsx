import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { ActivityDetailPage } from './pages/ActivityDetailPage';
import { RecipesPage } from './pages/RecipesPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { DevelopmentPage } from './pages/DevelopmentPage';
import { translations } from './data/translations';
import type { Language } from './types';

function App() {
  const [language, setLanguage] = useState<Language>('de');
  const t = translations[language];

  const handleLangChange = (lang: Language) => {
    setLanguage(lang);
    const path = window.location.pathname;
    const currentLang = path.split('/')[2];
    const newPath = lang === 'de' 
      ? path.replace(new RegExp(`^/tuki-app/${currentLang}`), '/tuki-app')
      : path.replace(/^\/tuki-app(\/|$)/, `/tuki-app/${lang}/`);
    if (newPath !== path) {
      window.history.pushState({}, '', newPath);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Layout lang={language} t={t} onLangChange={handleLangChange} />}>
        <Route index element={<HomePage lang={language} t={t} />} />
        <Route path="activities" element={<ActivitiesPage lang={language} t={t} />} />
        <Route path="activities/:id" element={<ActivityDetailPage lang={language} t={t} />} />
        <Route path="recipes" element={<RecipesPage lang={language} t={t} />} />
        <Route path="recipes/:id" element={<RecipeDetailPage lang={language} t={t} />} />
        <Route path="development" element={<DevelopmentPage lang={language} t={t} />} />
        <Route path="*" element={<HomePage lang={language} t={t} />} />
      </Route>
    </Routes>
  );
}

export default App;
