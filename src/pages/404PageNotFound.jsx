import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { House, ChefHat, ArrowLeft } from 'lucide-react'
import Noodle404 from '../components/404noodle'
import '../css/404.css'

const PageNotFound = () => {
  useEffect(() => {
    document.title = 'Page Not Found - Cooking Boss'
  }, [])
  return (
    <main className="not-found-page">
      <section className="not-found-container">
       
        <div className="not-found-visual">
          <Noodle404 />
        </div>
        <div className="not-found-code">404</div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-text">
          Oops! Looks like this recipe got lost in the kitchen.
          The page you're looking for doesn't exist.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="not-found-btn">
            <House size={20} />
            Back Home
          </Link>
          <Link to="/recipes" className="not-found-link">
            <ArrowLeft size={18} />
            Browse Recipes
          </Link>
        </div>
      </section>
    </main>
  )
}

export default PageNotFound

