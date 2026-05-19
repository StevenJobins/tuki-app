import { Routes, Route } from 'react-router-dom'
import { useApp } from './context/AppContext'
import { useAuth } from './context/AuthContext'
import { AnimatePresence } from 'framer-motion'
import BottomNav from './components/BottomNav'
import Sidebar from './components/Sidebar'
import HomePage from './pages/HomePage'
import RecipesPage from './pages/RecipesPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import ActivitiesPage from './pages/ActivitiesPage'
import ActivityDetailPage from './pages/ActivityDetailPage'
import DevelopmentPage from './pages/DevelopmentPage'
import CommunityPage from './pages/CommunityPage'
import ProfilePage from './pages/ProfilePage'
import FavoritenPage from './pages/FavoritenPage'
import WochenplanPage from './pages/WochenplanPage'
import ZutatenCheckPage from './pages/ZutatenCheckPage'
import StarShopPage from './pages/StarShopPage'
import OnboardingPage from './pages/OnboardingPage'
import LoginPage from './pages/LoginPage'

export default function App() {
  const { user, loading } = useAuth()
  const { isOnboarded } = useApp()

  // Show loading screen while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-tuki-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl gradient-rot flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
          <p className="text-gray-400 text-sm">Laden...</p>
        </div>
      </div>
    )
  }

  // Not logged in -> show login/register page
  if (!user) {
    return <LoginPage />
  }

  // Logged in but not onboarded -> show onboarding (child setup)
  if (!isOnboarded) {
    return <OnboardingPage />
  }

  return (
    <div className="min-h-screen bg-tuki-cream flex overflow-x-hidden w-full">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 min-h-screen w-full lg:max-w-none mx-auto lg:mx-0 lg:ml-60 xl:ml-64 lg:px-8 xl:px-12 relative overflow-x-hidden">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rezepte" element={<RecipesPage />} />
            <Route path="/rezept/:id" element={<RecipeDetailPage />} />
            <Route path="/aktivitaeten" element={<ActivitiesPage />} />
            <Route path="/aktivitaet/:id" element={<ActivityDetailPage />} />
            <Route path="/entwicklung" element={<DevelopmentPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/profil" element={<ProfilePage />} />
            <Route path="/favoriten" element={<FavoritenPage />} />
            <Route path="/wochenplan" element={<WochenplanPage />} />
            <Route path="/zutaten-check" element={<ZutatenCheckPage />} />
            <Route path="/sterne-shop" element={<StarShopPage />} />
          </Routes>
        </AnimatePresence>
        <BottomNav />
      </main>
    </div>
  )
}
