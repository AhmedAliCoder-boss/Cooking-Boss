import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ArrowRight, Trash2, ChefHat } from 'lucide-react'
import { useFavorites } from '../hooks/useFavorites'
import { SkeletonGrid } from '../components/Skeleton'

const FavoritesPage = () => {
  useEffect(() => {
    document.title = 'Favorites - Cooking Boss'
  }, [])
  const { favorites, removeFromFavorites, clearFavorites, favoritesCount } = useFavorites()

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-(--text-primary) mb-2">
              Your <span className="text-[#ff6b6b]">Favorites</span>
            </h1>
            <p className="text-slate-400">
              {favoritesCount} {favoritesCount === 1 ? 'recipe' : 'recipes'} saved
            </p>
          </div>
          
          {favoritesCount > 0 && (
            <button
              onClick={clearFavorites}
              className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-full transition-colors self-start sm:self-auto"
            >
              <Trash2 size={18} />
              Clear All
            </button>
          )}
        </div>

        {/* Empty State */}
        {favoritesCount === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={48} className="text-slate-600" />
            </div>
            <h2 className="text-2xl font-semibold text-(--text-primary) mb-3">
              No favorites yet
            </h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Start exploring recipes and save your favorites to find them quickly later
            </p>
            <Link
              to="/recipes"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff6b6b] text-white rounded-full hover:bg-[#ff5252] transition-colors"
            >
              Browse Recipes
              <ArrowRight size={18} />
            </Link>
          </div>
        )}

        {/* Favorites Grid */}
        {favoritesCount > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((recipe) => (
              <div
                key={recipe.idMeal}
                className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#ff6b6b]/30 transition-all hover:-translate-y-2"
              >
                <Link to={`/recipe/${recipe.idMeal}`} className="block">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
                        {recipe.strCategory}
                      </span>
                    </div>
                  </div>
                </Link>
                
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <Link to={`/recipe/${recipe.idMeal}`} className="flex-1">
                      <h3 className="text-(--text-primary) font-semibold text-lg group-hover:text-[#ff6b6b] transition-colors line-clamp-2">
                        {recipe.strMeal}
                      </h3>
                    </Link>
                    <button
                      onClick={() => removeFromFavorites(recipe.idMeal)}
                      className="p-2 text-[#ff6b6b] hover:bg-[#ff6b6b]/10 rounded-full transition-colors shrink-0"
                    >
                      <Heart size={20} fill="#ff6b6b" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-slate-400 text-sm">
                    <ChefHat size={16} />
                    <span>{recipe.strArea} Cuisine</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default FavoritesPage

