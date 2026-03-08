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
      recipes: 'Rezepte',
      development: 'Entwicklung',
    },
    en: {
      title: 'Tuki Learning Tower',
      subtitle: 'Help me do it myself',
      price: 'CHF 299',
      cta: 'Buy now',
      activities: 'Activities',
      recipes: 'Recipes',
      development: 'Development',
    },
    fr: {
      title: 'Tuki Learning Tower',
      subtitle: 'Aide-moi à le faire moi-même',
      price: 'CHF 299',
      cta: 'Acheter',
      activities: 'Activités',
      recipes: 'Recettes',
      development: 'Développement',
    }
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-tuki-sand">
      {/* Header */}
      <header className="bg-tuki-rot text-tuki-weiss px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-medium">TUKI</h1>
          <nav className="flex gap-4">
            <button 
              onClick={() => setLanguage('de')} 
              className={`px-3 py-1 rounded ${language === 'de' ? 'bg-tuki-mint text-tuki-schwarz' : ''}`}
            >
              DE
            </button>
            <button 
              onClick={() => setLanguage('en')} 
              className={`px-3 py-1 rounded ${language === 'en' ? 'bg-tuki-mint text-tuki-schwarz' : ''}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('fr')} 
              className={`px-3 py-1 rounded ${language === 'fr' ? 'bg-tuki-mint text-tuki-schwarz' : ''}`}
            >
              FR
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-tuki-rot text-tuki-weiss px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-medium mb-4">{t.title}</h2>
          <p className="text-2xl text-tuki-mint mb-8">{t.subtitle}</p>
          <p className="text-3xl font-medium mb-8">{t.price}</p>
          <button className="bg-tuki-mint text-tuki-schwarz px-8 py-3 rounded-lg font-medium text-lg hover:bg-tuki-mint-light transition-colors">
            {t.cta}
          </button>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-tuki-weiss rounded-xl p-6 shadow-lg border-2 border-tuki-mint">
            <div className="w-12 h-12 bg-tuki-mint rounded-full mb-4 flex items-center justify-center text-2xl">
              🎨
            </div>
            <h3 className="text-xl font-medium text-tuki-schwarz mb-2">{t.activities}</h3>
            <p className="text-tuki-blau">Montessori Aktivitäten für Kinder 0-8 Jahre</p>
          </div>

          <div className="bg-tuki-weiss rounded-xl p-6 shadow-lg border-2 border-tuki-orange">
            <div className="w-12 h-12 bg-tuki-orange rounded-full mb-4 flex items-center justify-center text-2xl">
              🍳
            </div>
            <h3 className="text-xl font-medium text-tuki-schwarz mb-2">{t.recipes}</h3>
            <p className="text-tuki-blau">Kindgerechte Rezepte zum Mitmachen</p>
          </div>

          <div className="bg-tuki-weiss rounded-xl p-6 shadow-lg border-2 border-tuki-rot">
            <div className="w-12 h-12 bg-tuki-rot rounded-full mb-4 flex items-center justify-center text-2xl">
              📈
            </div>
            <h3 className="text-xl font-medium text-tuki-schwarz mb-2">{t.development}</h3>
            <p className="text-tuki-blau">Entwicklungsmeilensteine nach Montessori</p>
          </div>
        </div>
      </section>

      {/* Color Showcase */}
      <section className="bg-tuki-schwarz text-tuki-weiss px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-medium mb-6">TUKI Farbwelt</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-lg bg-tuki-rot mb-2 border-2 border-tuki-weiss"></div>
              <span className="text-sm">TUKI ROT</span>
              <span className="text-xs text-gray-400">#8F5652</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-lg bg-tuki-mint mb-2 border-2 border-tuki-schwarz"></div>
              <span className="text-sm">TUKI MINT</span>
              <span className="text-xs text-gray-400">#AADBD7</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-lg bg-tuki-blau mb-2 border-2 border-tuki-weiss"></div>
              <span className="text-sm">BLAU</span>
              <span className="text-xs text-gray-400">#5E6578</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-lg bg-tuki-orange mb-2 border-2 border-tuki-schwarz"></div>
              <span className="text-sm">ORANGE</span>
              <span className="text-xs text-gray-400">#E18B63</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-tuki-rot text-tuki-weiss px-6 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-medium">TUKI</p>
          <p>Hilf mir, es selbst zu tun</p>
          <p className="text-sm text-tuki-mint mt-2">© 2026 Tuki. Swiss Design. Made in EU.</p>
        </div>
      </footer>
    </div>
  )
}

export default App