import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import Layout from './components/Layout'
import Home from './pages/Home'
import Activities from './pages/Activities'
import ActivityDetail from './pages/ActivityDetail'
import Recipes from './pages/Recipes'
import RecipeDetail from './pages/RecipeDetail'
import Development from './pages/Development'
import Product from './pages/Product'

function App() {
  useEffect(() => {
    // Check for saved language preference
    const savedLang = localStorage.getItem('tuki-language')
    if (savedLang && ['de', 'en', 'fr'].includes(savedLang)) {
      i18n.changeLanguage(savedLang)
    }
  }, [])

  return (
    <I18nextProvider i18n={i18n}>
      <Router basename="/tuki-app">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="activities" element={<Activities />} />
            <Route path="activities/:id" element={<ActivityDetail />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="recipes/:id" element={<RecipeDetail />} />
            <Route path="development" element={<Development />} />
            <Route path="product" element={<Product />} />
          </Route>
        </Routes>
      </Router>
    </I18nextProvider>
  )
}

export default App
