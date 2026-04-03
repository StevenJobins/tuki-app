import { Routes, Route } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { useApp } from './context/AppContext'
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
import LoginPage from './pages/LoginPage'
import OnboardingPage from './pages/OnboardingPage'
import WochenplanPage from './pages/WochenplanPage'
import ZutatenCheckPage from './pages/ZutatenCheckPage'
import FavoritenPage from './pages/FavoritenPage'
import StarShopPage from './pages/StarShopPage'
import InstallPrompt from './components/InstallPrompt'
import NotificationPrompt from './components/NotificationPrompt'

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-tuki-cream flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">{'\uD83D\uDC23'}</div>
        <p className="text-tuki-brown font-medium">Tuki lädt...</p>
      </div>
    </div>
  )
}

export default function App() {
  const { loading, user } = useAuth()

  if (loading) return <LoadingScreen />
  if (!user) return <LoginPage />

  return <AuthenticatedApp />
}

function AuthenticatedApp() {
  const { isOnboarded } = useApp()

  if (!isOnboarded) return <OnboardingPage />

  return (
    <div className="min-h-screen bg-tuki-cream flex overflow-hidden">
      {/* Sidebar \u2013 visible on desktop (md+) */}
      <SideNav />

      {/* Main content area */}
      <div className="flex-1 min-h-screen min-w-0 overflow-x-hidden max-w-lg mx-auto md:max-w-none md:mx-0 relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rezepte" element={<RecipesPage />} />
          <Route path="/rezept/:id" element={<RecipeDetailPage />} />
          <Route path="/aktivitaeten" element={<ActivitiesPage />} />
          <Route path="/aktivitaet/:id" element={<ActivityDetailPage />} />
          <Route path="/entwicklung" element={<DevelopmentPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/wochenplan" element={<WochenplanPage />} />
          <Route path="/zutaten-check" element={<ZutatenCheckPage />} />
          <Route path="/sterne-shop" element={<StarShopPage />} />
          <Route path="/favoriten" element={<FavoritenPage />} />
        </Routes>
        {/* Bottom nav \u2013 mobile only */}
        <BottomNav />
        <InstallPrompt />
        <NotificationPrompt />
      </div>
    </div>
  )
}
