import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaSync, FaUtensils } from 'react-icons/fa'
import { mealDBApi } from '../../services/mealDBApi'
import FavoriteButton from '../FavoriteButton'

const FeaturedRecipes = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const isLoadingRef = useRef(false)

  const loadRecipes = async () => {
    if (isLoadingRef.current) return
    isLoadingRef.current = true

    try {
      setLoading(true)
      setError(null)
      const data = await mealDBApi.getFeaturedMealsRandom(12)
      setRecipes(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error('Failed to load featured recipes:', e)
      setError('Could not load recipes right now.')
      setRecipes([])
    } finally {
      setLoading(false)
      isLoadingRef.current = false
    }
  }

  useEffect(() => {
    loadRecipes()
  }, [])

  return (
    <section className="home-featured-band py-16 text-(--text-primary)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-semibold">Featured Recipes</h2>
            <div className="flex items-center gap-1 px-3 py-1 bg-[#ff6b6b]/10 rounded-full">
              <FaSync className="text-[#ff6b6b] text-sm" />
              <span className="text-[#ff6b6b] text-sm font-medium">From TheMealDB</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto justify-start sm:justify-end">
            <button
              type="button"
              onClick={loadRecipes}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-[#ff6b6b] hover:bg-[#ff5252] disabled:opacity-60 disabled:pointer-events-none rounded-lg transition-colors text-white"
            >
              <FaSync className="text-lg" />
              <span>Shuffle</span>
            </button>
            <Link to="/recipes" className="flex items-center gap-2 text-[#ff6b6b] hover:text-[#ff5252] transition-colors font-medium">
              Browse All <FaArrowRight className="text-xl" />
            </Link>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#ff6b6b] border-t-transparent" aria-hidden />
          </div>
        )}

        {!loading && error && (
          <p className="text-center text-slate-400 py-8">
            {error}{' '}
            <button type="button" onClick={loadRecipes} className="text-[#ff6b6b] hover:underline font-medium">
              Try again
            </button>
          </p>
        )}

        {!loading && !error && recipes.length === 0 && (
          <p className="text-center text-slate-400 py-8">
            No recipes yet.{' '}
            <Link to="/recipes" className="text-[#ff6b6b] hover:underline font-medium">
              Open the recipe catalog
            </Link>
          </p>
        )}

        {!loading && recipes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {recipes.map((recipe) => (
              <div
                key={recipe.idMeal}
                className="recipe-surface-card group flex flex-col h-full bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#ff6b6b]/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#ff6b6b]/10"
              >
                <Link to={`/recipe/${recipe.idMeal}`} className="block shrink-0">
                  <div className="relative aspect-video overflow-hidden bg-slate-900/20">
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="block truncate px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
                        {recipe.strCategory || 'Recipe'}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="p-5 flex flex-col flex-1 min-h-0">
                  <div className="flex items-start justify-between gap-3 mb-2 flex-1">
                    <Link to={`/recipe/${recipe.idMeal}`} className="flex-1 min-w-0">
                      <h3 className="text-(--text-primary) font-semibold text-lg line-clamp-2 group-hover:text-[#ff6b6b] transition-colors">
                        {recipe.strMeal}
                      </h3>
                    </Link>
                    <FavoriteButton 
                      recipe={recipe} 
                      size={20}
                      className="shrink-0 mt-0.5"
                    />
                  </div>
                  <p className="text-slate-400 text-sm mt-auto pt-2 flex items-center gap-1.5">
                    <FaUtensils className="shrink-0 opacity-80 text-sm" />
                    <span className="truncate">{recipe.strArea || 'International'}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedRecipes
