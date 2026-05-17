import React, { useState, useEffect } from 'react'
import { useRecipes, useSearch, useNutrition, useVideos, useIngredients } from '../hooks'

const ExampleRecipeSearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [ingredients, setIngredients] = useState('')

  const { recipes, loading: recipesLoading, getLatestRecipes, searchRecipes } = useRecipes()
  const { results, loading: searchLoading, search, searchByFridge } = useSearch()
  const { nutritionData, loading: nutritionLoading, getNutrition } = useNutrition()
  const { videos, loading: videosLoading, searchVideos } = useVideos()
  const { ingredients: ingredientResults, loading: ingredientsLoading, findIngredients, findRecipesByIngredient } = useIngredients()

  useEffect(() => {
    // Load initial recipes
    getLatestRecipes()
  }, [getLatestRecipes])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      search(searchQuery)
    }
  }

  const handleFridgeSearch = (e) => {
    e.preventDefault()
    if (ingredients.trim()) {
      const ingredientList = ingredients.split(',').map(i => i.trim())
      searchByFridge(ingredientList)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Recipe Search Example</h1>

      {/* Smart Search */}
      <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Smart Search (Spoonacular + TheMealDB)</h2>
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]"
          />
          <button
            type="submit"
            disabled={searchLoading}
            className="px-6 py-2 bg-[#ff6b6b] text-white rounded-lg hover:bg-[#ff5252] disabled:opacity-50"
          >
            {searchLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
        {results.mealDB.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.mealDB.map((recipe) => (
              <div key={recipe.idMeal} className="p-4 border rounded-lg">
                <h3 className="font-medium">{recipe.strMeal}</h3>
                <p className="text-sm text-gray-600">{recipe.strCategory}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Search by Ingredients */}
      <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">What's in Your Fridge? (Spoonacular)</h2>
        <form onSubmit={handleFridgeSearch} className="flex gap-2 mb-4">
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients (comma separated)..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-[#ff6b6b] text-white rounded-lg hover:bg-[#ff5252]"
          >
            Find Recipes
          </button>
        </form>
      </section>

      {/* TheMealDB Recipes */}
      <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Latest Recipes (TheMealDB)</h2>
        {recipesLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recipes.slice(0, 8).map((recipe) => (
              <div key={recipe.idMeal} className="text-center">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <h3 className="text-sm font-medium truncate">{recipe.strMeal}</h3>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Videos */}
      <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Cooking Videos (Tasty API)</h2>
        <button
          onClick={() => searchVideos('pasta')}
          className="px-6 py-2 bg-[#ff6b6b] text-white rounded-lg hover:bg-[#ff5252]"
        >
          Load Videos
        </button>
      </section>

      {/* Nutrition Analysis */}
      <section className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Nutrition Analysis (Edamam)</h2>
        <button
          onClick={() => getNutrition(['1 cup rice', '100g chicken breast'])}
          className="px-6 py-2 bg-[#ff6b6b] text-white rounded-lg hover:bg-[#ff5252]"
        >
          Analyze Ingredients
        </button>
      </section>
    </div>
  )
}

export default ExampleRecipeSearch

