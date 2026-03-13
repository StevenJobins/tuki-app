import { useFavorites } from '../hooks/useFavorites';
import type { Language } from '../types';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';
import { FavoriteButton } from '../components/FavoriteButton';

interface FavoritesPageProps {
  lang: Language;
}

export function FavoritesPage({ lang }: FavoritesPageProps) {
  const { favorites, getFavoritesByType } = useFavorites();
  const recipes = getFavoritesByType('recipe');
  const activities = getFavoritesByType('activity');

  const pageTitle = lang === 'de' ? 'Meine Favoriten' : lang === 'en' ? 'My Favorites' : 'Mes Favoris';
  const emptyText = lang === 'de' 
    ? 'Noch keine Favoriten gespeichert. Entdecken Sie Rezepte und Aktivitäten!'
    : lang === 'en'
    ? 'No favorites saved yet. Discover recipes and activities!'
    : 'Pas encore de favoris. Découvrez recettes et activités!';

  return (
    <>
      <SEO lang={lang} pageTitle={pageTitle} />
      <div className="pt-24 lg:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-tuki-schwarz mb-4">{pageTitle}</h1>
          <p className="text-tuki-blau/70 mb-8 max-w-2xl">
            {lang === 'de' ? 'Ihre gespeicherten Rezepte und Aktivitäten' : lang === 'en' ? 'Your saved recipes and activities' : 'Vos recettes et activités sauvegardées'}
          </p>

          {favorites.length === 0 ? (
            <div className="text-center py-16 bg-tuki-sand/30 rounded-2xl">
              <span className="text-4xl mb-4 block">💔</span>
              <p className="text-tuki-blau/70">{emptyText}</p>
              <div className="flex gap-4 justify-center mt-6">
                <Link to="/recipes" className="bg-tuki-rot text-white px-6 py-3 rounded-full hover:bg-tuki-rot-dark transition-all">
                  {lang === 'de' ? 'Rezepte entdecken' : lang === 'en' ? 'Discover recipes' : 'Découvrir recettes'}
                </Link>
                <Link to="/activities" className="border-2 border-tuki-schwarz/20 px-6 py-3 rounded-full hover:border-tuki-rot hover:text-tuki-rot transition-all">
                  {lang === 'de' ? 'Aktivitäten' : lang === 'en' ? 'Activities' : 'Activités'}
                </Link>
              </div>
            </div>
          ) : (
            <>
              {activities.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span>👶</span>
                    {lang === 'de' ? 'Aktivitäten' : lang === 'en' ? 'Activities' : 'Activités'}
                    <span className="text-sm font-normal text-tuki-blau/60">({activities.length})</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activities.map(item => (
                      <Link key={item.id} to={`/activities/${item.id}`} className="group bg-tuki-sand rounded-2xl overflow-hidden hover:shadow-xl transition-all flex flex-col sm:flex-row">
                        <div className="sm:w-2/5 aspect-video sm:aspect-auto overflow-hidden relative">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <FavoriteButton
                            id={item.id}
                            type="activity"
                            title={item.title}
                            image={item.image}
                            size="sm"
                            className="absolute top-3 left-3"
                          />
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-center">
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {recipes.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span>🍳</span>
                    {lang === 'de' ? 'Rezepte' : lang === 'en' ? 'Recipes' : 'Recettes'}
                    <span className="text-sm font-normal text-tuki-blau/60">({recipes.length})</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map(item => (
                      <Link key={item.id} to={`/recipes/${item.id}`} className="group bg-tuki-sand rounded-2xl overflow-hidden hover:shadow-xl transition-all">
                        <div className="aspect-[4/3] overflow-hidden relative">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <FavoriteButton
                            id={item.id}
                            type="recipe"
                            title={item.title}
                            image={item.image}
                            size="sm"
                            className="absolute top-3 left-3"
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
