import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastProvider } from './components/ToastProvider'
import ErrorBoundary from './components/ErrorBoundary'
import ShoppingListPanel from './components/ShoppingListPanel'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/home.jsx'
import Recipes from './pages/Recipes'
import RecipeDetail from './pages/RecipeDetail'
import Categories from './pages/Categories'
import About from './pages/About'
import FridgeFinder from './pages/FridgeFinder'
import Videos from './pages/Videos'
import Offline from './pages/offline.jsx'
import PageNotFound from './pages/404PageNotFound'
import FavoritesPage from './pages/FavoritesPage'
import { ThemeProvider } from './context/ThemeContext'
import './css/animations.css'
import './css/theme.css'

const App = () => {
  const [shoppingListOpen, setShoppingListOpen] = useState(false)

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <div className="min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <Header onShoppingListClick={() => setShoppingListOpen(true)} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/fridge-finder" element={<FridgeFinder />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/offline" element={<Offline />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
            <ScrollToTop />
            <ShoppingListPanel 
              isOpen={shoppingListOpen} 
              onClose={() => setShoppingListOpen(false)} 
            />
          </div>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App

