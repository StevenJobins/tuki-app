import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import BottomNav from './components/BottomNav'
import HomePage from './pages/HomePage'
import RecipesPage from './pages/RecipesPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import ActivitiesPage from './pages/ActivitiesPage'
import ActivityDetailPage from './pages/ActivityDetailPage'
import DevelopmentPage from './pages/DevelopmentPage'
import CommunityPage from './pages/CommunityPage'
import ProfilePage from './pages/ProfilePage'
import AccountSettingsPage from './pages/AccountSettingsPage'

export default function App() {
  return (
    <div className="max-w-lg mx-auto min-h-screen bg-tuki-cream relative">
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
          <Route path="/konto" element={<AccountSettingsPage />} />
        </Routes>
      </AnimatePresence>
      <BottomNav />
    </div>
  )
}
