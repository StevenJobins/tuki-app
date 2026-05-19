import { Routes, Route } from 'react-router-dom'
import { useApp } from './context/AppContext'
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

export default function App() {
  const { isOnboarded } = useApp()

  if (!isOnboarded) {
    return <OnboardingPage />
  }

  return (
    <div className="min-h-screen bg-tuki-cream flex overflow-x-hidden w-full">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 min-h-screen max-w-lg lg:max-w-none mx-auto lg:mx-0 lg:ml-60 xl:ml-64 lg:px-8 xl:px-12 relative">
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
