import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shuffle, ChefHat } from 'lucide-react'
import { mealDBApi } from '../../services/mealDBApi'

const FeaturedRecipes = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadRecipes = useCallback(async () => {
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
    }
  }, [])

  useEffect(() => {
    loadRecipes()
  }, [loadRecipes])

  return (
    <section className="home-featured-band py-16 text-(--text-primary)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-semibold">Featured Recipes</h2>
            <div className="flex items-center gap-1 px-3 py-1 bg-[#ff6b6b]/10 rounded-full">
              <Shuffle size={14} className="text-[#ff6b6b]" />
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
              <Shuffle size={18} />
              <span>Shuffle</span>
            </button>
            <Link to="/recipes" className="flex items-center gap-2 text-[#ff6b6b] hover:text-[#ff5252] transition-colors font-medium">
              Browse All <ArrowRight size={20} />
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
              <Link
                key={recipe.idMeal}
                to={`/recipe/${recipe.idMeal}`}
                className="recipe-surface-card group flex flex-col h-full bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#ff6b6b]/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-900/20">
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 max-w-[70%]">
                    <span className="block truncate px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
                      {recipe.strCategory || 'Recipe'}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1 min-h-0">
                  <h3 className="text-(--text-primary) font-semibold text-base group-hover:text-[#ff6b6b] transition-colors line-clamp-2">
                    {recipe.strMeal}
                  </h3>
                  <p className="text-slate-400 text-sm mt-2 flex items-center gap-1.5">
                    <ChefHat size={14} className="shrink-0 opacity-80" />
                    <span className="truncate">{recipe.strArea || 'International'}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedRecipes
