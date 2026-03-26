import Header from '../components/Header'
import SectionHeader from '../components/SectionHeader'
import RecipeCard from '../components/RecipeCard'
import ActivityCard from '../components/ActivityCard'
import { recipes, getRecipesByAge, getSeasonalRecipes } from '../data/recipes'
import { activities, getActivitiesByAge } from '../data/activities'
import { getMilestonesForAge, getPhaseForAge } from '../data/milestones'
import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
rray deterministically by day
function shuffleByDay<T>(arr: T[]): T[] {
  const day = new Date().getDate()
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (i * day + day) % (i + 1)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}nt-semibold text-gray-700">{completedActivities.length + completedRecipes.length}</p>
                  <p className="text-[10px] text-gray-500">Abgeschlossen</p>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/20" />
          <div className="absolute -right-2 bottom-0 w-20 h-20 rounded-full bg-white/15" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-4 md:grid-cols-4 gap-2 md:gap-3">
          {[
            { emoji: '🍳', label: 'Rezepte', path: '/rezepte' },
            { emoji: '🎮', label: 'Aktivitäten', path: '/aktivitaeten' },
            { emoji: '📊', label: 'Entwicklung', path: '/entwicklung' },
            { emoji: '👨‍👩‍👧', label: 'Community', path: '/community' },
          ].map(action => (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-1.5 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform"
            >
              <span className="text-2xl">{action.emoji}</span>
              <span className="text-[10px] font-medium text-gray-600">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tagesimpuls Card */}
      {childName && (dailyRecipe || dailyActivity) && (
        <div className="px-4 mb-6">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100/50">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">✨</span>
              <h3 className="font-semibold text-sm text-gray-800">Tagesimpuls</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {dailyRecipe && (
                <button
                  onClick={() => navigate(`/rezept/${dailyRecipe.id}`)}
                  className="bg-white rounded-xl p-3 text-left shadow-sm active:scale-95 transition-transform"
                >
                  <div className="text-2xl mb-2">{dailyRecipe.emoji}</div>
                  <h4 className="font-semibold text-xs text-gray-800 line-clamp-2">{dailyRecipe.title}</h4>
                  {dailyRecipe.duration && (
                    <p className="text-[10px] text-gray-500 mt-1">⏱️ {dailyRecipe.duration}</p>
                  )}
                  <p className="text-[10px] text-amber-600 font-medium mt-2">Heute kochen →</p>
                </button>
              )}
              {dailyActivity && (
                <button
                  onClick={() => navigate(`/aktivitaet/${dailyActivity.id}`)}
                  className="bg-white rounded-xl p-3 text-left shadow-sm active:scale-95 transition-transform"
                >
                  <div className="text-2xl mb-2">{dailyActivity.emoji}</div>
                  <h4 className="font-semibold text-xs text-gray-800 line-clamp-2">{dailyActivity.title}</h4>
                  {dailyActivity.duration && (
                    <p className="text-[10px] text-gray-500 mt-1">⏱️ {dailyActivity.duration}</p>
                  )}
                  <p className="text-[10px] text-amber-600 font-medium mt-2">Heute entdecken →</p>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Seasonal Banner */}
      <div className="px-4 mb-6">
        <button
          onClick={() => navigate(`/rezepte?season=${getSeasonKey()}`)}
          className="w-full bg-tuki-warm rounded-2xl p-4 border border-orange-100 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{getSeasonEmoji()}</span>
            <div>
              <h3 className="font-semibold text-sm text-gray-800">{getSeasonName()}s-Rezepte</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {allSeasonalRecipes.length} saisonale Ideen für euch entdecken
              </p>
            </div>
            <svg className="ml-auto" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8F5652" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </button>
      </div>

      {/* Featured Recipes — personalized by age */}
      <div>
        <SectionHeader
          title={childName ? `Rezepte für ${childName}` : 'Beliebte Rezepte'}
          emoji="🍳"
          linkTo={`/rezepte?season=${getSeasonKey()}`}
        />
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar snap-x">
          {featuredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} size="featured" />
          ))}
        </div>
      </div>

      {/* Activities — personalized by age */}
      <div className="mt-6">
        <SectionHeader
          title={childName ? `Aktivitäten für ${childName}` : 'Aktivitäten für heute'}
          emoji="🎯"
          linkTo="/aktivitaeten"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4">
          {featuredActivities.slice(0, 4).map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>

      {/* Phase Insight */}
      {child && phase && (
        <div className="mt-6 px-4">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 shadow-sm border border-emerald-100/50">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                <span className="text-emerald-700 text-lg">🌱</span>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-800">{childName} ist gerade in der Phase: {phase.title}</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  {phaseInsight}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Level Progress */}
      <div className="mt-6 px-4 mb-4">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm text-gray-800">🏆 {tukiStars.levelName}</h3>
            <span className="text-xs text-gray-500">Level {tukiStars.level + 1}/5</span>
          </div>
          <div className="w-full h-2 bg-yellow-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((tukiStars.total / 100) * 100, 100)}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-500 mt-1.5">
            Noch {Math.max(0, [10, 25, 50, 100][tukiStars.level] || 100 - tukiStars.total)} Sterne bis zum nächsten Level
          </p>
        </div>
      </div>
    </div>
  )
}
