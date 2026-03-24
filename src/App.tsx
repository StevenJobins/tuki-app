import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import BottomNav from './components/BottomNav'
import SideNav from './components/SideNav'
import HomePage from './pages/HomePage'
import RecipesPage from './pages/RecipesPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import ActivitiesPage from './pages/ActivitiesPage'
import ActivityDetailPage from './pages/ActivityDetailPage'
import DevelopmentPage from './pages/DevelopmentPage'
import CommunityPage from './pages/CommunityPage'
import ProfilePage from './pages/ProfilePage'

export default function App() {
  return (
    <div className="min-h-screen bg-tuki-cream flex">
      {/* Sidebar — visible on desktop (md+) */}
      <SideNav />

      {/* Main content area */}
      <div className="flex-1 min-h-screen max-w-lg mx-auto md:max-w-none md:mx-0 relative">
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
          </Routes>
        </AnimatePresence>
        {/* Bottom nav — mobile only */}
        <BottomNav />
      </div>
    </div>
  )
}
