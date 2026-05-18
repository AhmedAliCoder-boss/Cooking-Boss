import React, { useState } from "react";
import { Search, Heart, ShoppingCart, Moon, Sun } from 'lucide-react'; 
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useFavorites } from '../hooks/useFavorites'
import { useShoppingList } from '../hooks/useShoppingList'
import { useTheme } from '../context/ThemeContext'
import PWAInstallButton from './PWAInstallButton'
import "../css/header.css";

const Header = ({ onShoppingListClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { favoritesCount } = useFavorites()
  const { totalItems } = useShoppingList()
  const { theme, toggleTheme } = useTheme()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <header className="app-header print:hidden">
      <div className="header-container">
        
        {/* Logo */}
        <div>
          <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
            <span>🍴</span>
            Cooking Boss
          </Link>
          <p className="text-xs text-slate-500 mt-1">Where taste meets mystry.</p>
        </div>

        {/* Desktop Navigation */}
        <nav>
          <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <li>
              <Link 
                to="/" 
                className={isActive('/') ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            
            <li>
              <Link 
                to="/recipes" 
                className={isActive('/recipes') ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                All Recipes
              </Link>
            </li>

            <li>
              <Link 
                to="/categories" 
                className={isActive('/categories') ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
            </li>

            <li>
              <Link 
                to="/fridge-finder" 
                className={isActive('/fridge-finder') ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                Fridge Finder
              </Link>
            </li>

            <li>
              <Link 
                to="/videos" 
                className={isActive('/videos') ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                Cooking Videos
              </Link>
            </li>

            <li>
              <Link 
                to="/favorites" 
                className={isActive('/favorites') ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                Favorites
              </Link>
            </li>

            <li>
              <Link 
                to="/about" 
                className={isActive('/about') ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          <PWAInstallButton />
          
          <div className="search-container">
            <input 
              type="text" 
              id="header-search"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
            />
            <button className="search-btn" onClick={handleSearch}>
              <Search size={18} />
            </button>
          </div>
          
          <Link 
            to="/favorites"
            className="favorites-btn relative"
          >
            <Heart size={20} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff6b6b] text-white text-xs rounded-full flex items-center justify-center">
                {favoritesCount > 9 ? '9+' : favoritesCount}
              </span>
            )}
          </Link>
          
          <button
            onClick={onShoppingListClick}
            className="favorites-btn relative"
            aria-label="Shopping list"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>

          <button
            onClick={toggleTheme}
            className="favorites-btn relative"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="nav-overlay active"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
