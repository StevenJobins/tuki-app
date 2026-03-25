import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import BottomNav from './components/BottomNav'
import SideNav from './components/SideNav'
import InstallPrompt from './components/InstallPrompt'
import HomePage from './pages/HomePage'
import RecipesPage from './pages/RecipesPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import ActivitiesPage from './pages/ActivitiesPage'
import ActivityDetailPage from './pages/ActivityDetailPage'
import DevelopmentPage from './pages/DevelopmentPage'
import CommunityPage from './pages/CommunityPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import OnboardingPage from './pages/OnboardingPage'

function LoadingScreen() {
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

export default function App() {
  const { user, loading } = useAuth()
  const hasOnboarded = localStorage.getItem('tuki_onboarded') === 'true'

  if (loading) return <LoadingScreen />
  if (!hasOnboarded) return <OnboardingPage />
  if (!user) return <LoginPage />

  return (
    <div className="min-h-screen bg-tuki-cream flex">
      {/* Sidebar - visible on desktop (md+) */}
      <SideNav />

      {/* Main content area */}
      <div className="flex-1 min-h-screen max-w-lg mx-auto md:max-w-none md:mx-0 relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rezepte" element={<RecipesPage />} />
          <Route path="/rezept/:id" element={<RecipeDetailPage />} />
          <Route path="/aktivitaeten" element={<ActivitiesPage />} />
          <Route path="/aktivitaet/:id" element={<ActivityDetailPage />} />
          <Route path="/entwicklung" element={<DevelopmentPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Bottom Nav - visible on mobile only */}
        <BottomNav />

        {/* PWA Install Prompt */}
        <InstallPrompt />
      </div>
    </div>
  )
}
