import React, { useState, useEffect } from 'react'
import { Search, ChefHat, ArrowRight, Sparkles, X } from 'lucide-react'
import { spoonacularApi } from '../services/spoonacularApi'
import { Link } from 'react-router-dom'

const FridgeFinder = () => {
  useEffect(() => {
    document.title = 'Fridge Finder - Cooking Boss'
  }, [])
  const [ingredients, setIngredients] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!ingredients.trim()) return

    setLoading(true)
    setHasSearched(true)

    try {
      const ingredientList = ingredients.split(',').map(i => i.trim())
      const results = await spoonacularApi.searchByIngredients(ingredientList, 12)
      setRecipes(results || [])
    } catch (error) {
      console.error('Failed to search by ingredients:', error)
    } finally {
      setLoading(false)
    }
  }

  const clearSearch = () => {
    setIngredients('')
    setRecipes([])
    setHasSearched(false)
  }

  const suggestedIngredients = [
    'Chicken, Rice, Onion',
    'Pasta, Tomato, Cheese',
    'Eggs, Spinach, Mushroom',
    'Potato, Beef, Carrot',
  ]

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b6b]/10 rounded-full mb-4">
            <Sparkles className="text-[#ff6b6b]" size={18} />
            <span className="text-[#ff6b6b] font-medium">Powered by Spoonacular</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-(--text-primary) mb-3">
            What's in Your <span className="text-[#ff6b6b]">Fridge?</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Enter ingredients you have and we'll find recipes you can make right now
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g., chicken, rice, onion, garlic..."
              className="w-full px-6 py-4 pr-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-(--text-primary) placeholder-(--text-tertiary) focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
              {ingredients && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              )}
              <button
                type="submit"
                disabled={loading || !ingredients.trim()}
                className="px-5 py-2 bg-[#ff6b6b] text-white rounded-xl hover:bg-[#ff5252] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Search size={20} />
                )}
                Find
              </button>
            </div>
          </div>
        </form>

        {/* Suggested Inputs */}
        {!hasSearched && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="text-slate-500 text-sm py-2">Try:</span>
            {suggestedIngredients.map((item) => (
              <button
                key={item}
                onClick={() => setIngredients(item)}
                className="px-4 py-2 bg-white/5 text-slate-300 text-sm rounded-full hover:bg-white/10 hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        {hasSearched && (
          <div className="mt-10">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b6b]"></div>
              </div>
            ) : recipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#ff6b6b]/30 transition-all hover:-translate-y-1"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 bg-[#ff6b6b] text-white text-xs rounded-full font-medium">
                          {recipe.missedIngredientCount === 0
                            ? 'You have all!'
                            : `Missing ${recipe.missedIngredientCount}`}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-(--text-primary) font-semibold mb-3 line-clamp-2 group-hover:text-[#ff6b6b] transition-colors">
                        {recipe.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                          <ChefHat size={16} />
                          <span>Uses {recipe.usedIngredientCount} of your items</span>
                        </div>
                        <Link
                          to={`/recipe/${recipe.id}?source=spoonacular`}
                          className="flex items-center gap-1 text-[#ff6b6b] hover:text-[#ff5252] text-sm font-medium"
                        >
                          View
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ChefHat size={64} className="mx-auto text-(--text-secondary) mb-4" />
                <p className="text-slate-400 text-lg">
                  No recipes found. Try different ingredients!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

export default FridgeFinder

