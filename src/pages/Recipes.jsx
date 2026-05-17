import React, { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, ChefHat, Clock } from 'lucide-react'
import { useRecipes, useSearch, useUnsplashPool } from '../hooks'
import { useFavorites } from '../hooks/useFavorites'
import { SkeletonGrid } from '../components/Skeleton'
import FavoriteButton from '../components/FavoriteButton'
import { mealDBApi } from '../services/mealDBApi'
import { buildRecipesListQuery, pickPhotoFromPool } from '../services/unsplashApi'

const Recipes = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { recipes, loading: recipesLoading, getLatestRecipes, getByCategory } = useRecipes()
  const { search, results, loading: searchLoading } = useSearch()
  const [categories, setCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All')
  const [activeArea, setActiveArea] = useState(searchParams.get('area') || '')
  const [areaRecipes, setAreaRecipes] = useState([])
  const [areaLoading, setAreaLoading] = useState(false)
  const [visibleCount, setVisibleCount] = useState(20)

  useEffect(() => {
    loadCategories()
    
    // Handle initial load based on URL params
    const urlSearch = searchParams.get('search')
    const urlCategory = searchParams.get('category')
    const urlArea = searchParams.get('area')
    
    if (urlSearch) {
      setSearchQuery(urlSearch)
      search(urlSearch)
    } else if (urlCategory && urlCategory !== 'All') {
      setActiveCategory(urlCategory)
      getByCategory(urlCategory)
    } else if (urlArea) {
      setActiveArea(urlArea)
      loadByArea(urlArea)
    } else {
      getLatestRecipes()
    }
  }, [getLatestRecipes, getByCategory, search])

  const loadCategories = async () => {
    try {
      const cats = await mealDBApi.getCategories()
      setCategories([{ strCategory: 'All' }, ...cats])
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  const loadByArea = async (area) => {
    try {
      setAreaLoading(true)
      const data = await mealDBApi.getMealsByArea(area)
      setAreaRecipes(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to load by area:', error)
      setAreaRecipes([])
    } finally {
      setAreaLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery })
      search(searchQuery)
      setActiveCategory('All')
      setVisibleCount(20)
    }
  }

  const handleCategoryClick = (category) => {
    setActiveCategory(category)
    setSearchQuery('')
    setVisibleCount(20)
    if (category === 'All') {
      setSearchParams({})
      getLatestRecipes()
    } else {
      setSearchParams({ category })
      getByCategory(category)
    }
  }

  const displayRecipes = results.mealDB.length > 0 && searchQuery
    ? results.mealDB
    : activeArea && !searchQuery
    ? areaRecipes
    : Array.isArray(recipes) ? recipes : []

  const visibleRecipes = displayRecipes.slice(0, visibleCount)
  const hasMore = displayRecipes.length > visibleCount

  // Show area filter badge if active
  const showAreaBadge = activeArea && !searchQuery && activeCategory === 'All'
  const isLoading = recipesLoading || searchLoading || areaLoading

  const unsplashQuery = useMemo(
    () =>
      buildRecipesListQuery({
        activeCategory,
        activeArea,
        searchQuery,
      }),
    [activeCategory, activeArea, searchQuery]
  )
  const { photos: unsplashPhotos } = useUnsplashPool(unsplashQuery, { perPage: 30, orientation: 'squarish' })

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-(--text-primary) mb-4">
            Discover Delicious <span className="text-[#ff6b6b]">Recipes</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Browse the full catalog from TheMealDB—every category merged into one searchable grid.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes, ingredients, cuisines..."
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-(--text-primary) placeholder-(--text-tertiary) focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent"
            />
            <button
              type="submit"
              disabled={searchLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-[#ff6b6b] text-white rounded-full hover:bg-[#ff5252] transition-colors disabled:opacity-50"
            >
              <Search size={20} />
            </button>
          </div>
        </form>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.strCategory}
              onClick={() => handleCategoryClick(cat.strCategory)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.strCategory
                  ? 'bg-[#ff6b6b] text-white'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              {cat.strCategory}
            </button>
          ))}
        </div>

        {/* Area Filter Badge */}
        {showAreaBadge && (
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 rounded-full">
              <span className="text-2xl">{activeArea}</span>
              <span className="text-[#ff6b6b] font-medium">{activeArea} Cuisine</span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <SkeletonGrid count={8} />}

        {/* Recipes Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {visibleRecipes.map((recipe) => {
              const unsplash = pickPhotoFromPool(unsplashPhotos, recipe.idMeal)
              const cardImage = unsplash?.thumbUrl || recipe.strMealThumb
              return (
              <div
                key={recipe.idMeal}
                className="recipe-surface-card group flex flex-col h-full bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#ff6b6b]/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#ff6b6b]/10"
              >
                <Link to={`/recipe/${recipe.idMeal}`} className="block shrink-0">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={cardImage}
                      alt={unsplash?.alt || recipe.strMeal}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
                        {recipe.strCategory || activeCategory}
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
                  <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm mt-auto pt-2">
                    <span className="flex items-center gap-1">
                      <ChefHat size={14} />
                      {recipe.strArea || 'International'}
                    </span>
                    {recipe.strTags && (
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        Easy
                      </span>
                    )}
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        )}

        {/* Load More Button */}
        {!isLoading && hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setVisibleCount(prev => prev + 16)}
              className="px-8 py-3 bg-[#ff6b6b] hover:bg-[#ff5252] text-white rounded-full font-medium transition-colors"
            >
              Load More
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && displayRecipes.length === 0 && (
          <div className="text-center py-20">
            <ChefHat size={64} className="mx-auto text-(--text-secondary) mb-4" />
            <p className="text-slate-400 text-lg">No recipes found. Try a different search!</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default Recipes

