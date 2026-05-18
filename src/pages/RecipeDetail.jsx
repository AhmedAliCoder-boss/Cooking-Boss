import React, { useEffect, useState } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Clock, Users, ChefHat, Heart, Printer, Flame } from 'lucide-react'
import { useRecipes } from '../hooks'
import { useFavorites } from '../hooks/useFavorites'
import { useShoppingList } from '../hooks/useShoppingList'
import { useUnsplashHero } from '../hooks/useUnsplashHero'
import ShareButton from '../components/ShareButton'
import UnsplashAttribution from '../components/UnsplashAttribution'
import { SkeletonRecipeDetail } from '../components/Skeleton'
import RecipeIngredients from '../components/recipe/RecipeIngredients'
import RecipeInstructions from '../components/recipe/RecipeInstructions'

const RecipeDetail = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const isSpoonacular = searchParams.get('source') === 'spoonacular'
  const { currentRecipe, getRecipe, getSpoonacularRecipe, loading: recipeLoading } = useRecipes()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { addToList, addMultipleItems } = useShoppingList()
  const [recipeStats, setRecipeStats] = useState({ duration: 30, servings: 2, calories: 0 })
  const [checkedIngredients, setCheckedIngredients] = useState(new Set())
  const { photo: unsplashHero } = useUnsplashHero(currentRecipe)

  useEffect(() => {
    if (isSpoonacular) {
      getSpoonacularRecipe(id)
    } else {
      getRecipe(id)
    }
  }, [id, getRecipe, getSpoonacularRecipe, isSpoonacular])

  useEffect(() => {
    if (currentRecipe) {
      document.title = `${currentRecipe.strMeal || 'Recipe'} - Cooking Boss`
    }
  }, [currentRecipe])

  useEffect(() => {
    if (currentRecipe) {
      // Generate realistic random values based on ingredient count
      const ingredients = []
      for (let i = 1; i <= 20; i++) {
        const ingredient = currentRecipe[`strIngredient${i}`]
        if (ingredient && ingredient.trim()) {
          ingredients.push(ingredient)
        }
      }
      
      // Realistic ranges based on ingredient count
      const ingredientCount = ingredients.length
      const duration = Math.floor(Math.random() * (60 - 20) + 20) + (ingredientCount * 2) // 20-60 mins + 2 mins per ingredient
      const servings = Math.floor(Math.random() * (6 - 2) + 2) // 2-6 servings
      const calories = Math.floor(Math.random() * (800 - 200) + 200) + (ingredientCount * 50) // 200-800 + 50 per ingredient
      
      setRecipeStats({
        duration: Math.min(duration, 120), // Cap at 2 hours
        servings,
        calories: Math.min(calories, 2000), // Cap at 2000
      })
    }
  }, [currentRecipe])

  const getIngredients = () => {
    if (!currentRecipe) return []
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
      const ingredient = currentRecipe[`strIngredient${i}`]
      const measure = currentRecipe[`strMeasure${i}`]
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure })
      }
    }
    return ingredients
  }

  const getInstructions = () => {
    if (!currentRecipe?.strInstructions) return []
    return currentRecipe.strInstructions
      .split(/\r\n|\n/)
      .filter(step => step.trim().length > 0)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleAddToShoppingList = (ingredient, measure) => {
    addToList({
      ingredient,
      measure,
      recipeId: currentRecipe.idMeal,
      recipeName: currentRecipe.strMeal,
    })
  }

  const handleAddAllToShoppingList = () => {
    const items = ingredients.map(({ ingredient, measure }) => ({
      ingredient,
      measure,
      recipeId: currentRecipe.idMeal,
      recipeName: currentRecipe.strMeal,
    }))
    addMultipleItems(items)
  }

  const toggleIngredientCheck = (index) => {
    const newChecked = new Set(checkedIngredients)
    if (newChecked.has(index)) {
      newChecked.delete(index)
    } else {
      newChecked.add(index)
    }
    setCheckedIngredients(newChecked)
  }

  if (recipeLoading || !currentRecipe) {
    return <SkeletonRecipeDetail />
  }

  const ingredients = getIngredients()
  const instructions = getInstructions()

  const heroSrc = unsplashHero?.heroUrl || currentRecipe.strMealThumb
  const heroAlt = unsplashHero?.alt || currentRecipe.strMeal

  return (
    <main className="recipe-print-root min-h-screen bg-slate-950 pt-24 pb-16">
      {/* Hero Image (also used when printing / saving as PDF) */}
      <div className="relative h-96 md:h-[500px] overflow-hidden print:h-64">
        <img
          src={heroSrc}
          alt={heroAlt}
          className="recipe-print-hero w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        
        {/* Action Buttons */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
          <Link
            to="/recipes"
            className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm text-white rounded-full hover:bg-black/60 transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Back to Recipes</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm text-white rounded-full hover:bg-black/60 transition-colors print:hidden"
            >
              <Printer size={18} />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={() => toggleFavorite(currentRecipe)}
              className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition-colors print:hidden"
            >
              <Heart 
                size={20} 
                className={isFavorite(currentRecipe.idMeal) ? 'text-[#ff6b6b] fill-[#ff6b6b]' : 'text-white'}
                fill={isFavorite(currentRecipe.idMeal) ? '#ff6b6b' : 'none'}
              />
            </button>
            {currentRecipe && (
              <span className="print:hidden">
                <ShareButton recipe={currentRecipe} />
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1 bg-[#ff6b6b] text-white text-sm rounded-full">
                {currentRecipe.strCategory}
              </span>
              <span className="px-4 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full">
                {currentRecipe.strArea}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {currentRecipe.strMeal}
            </h1>
            
            {/* Quick Info */}
            <div className="flex flex-wrap items-center gap-6 text-slate-300">
              <span className="flex items-center gap-2">
                <Clock size={18} className="text-[#ff6b6b]" />
                {recipeStats.duration} mins
              </span>
              <span className="flex items-center gap-2">
                <Users size={18} className="text-[#ff6b6b]" />
                {recipeStats.servings} servings
              </span>
              <span className="flex items-center gap-2">
                <Flame size={18} className="text-[#ff6b6b]" />
                {recipeStats.calories} cal
              </span>
            </div>
          </div>
        </div>
      </div>

      {unsplashHero && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 print:pt-1">
          <UnsplashAttribution photo={unsplashHero} />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Ingredients */}
          <div className="md:col-span-1">
            <RecipeIngredients 
              ingredients={ingredients}
              checkedIngredients={checkedIngredients}
              onToggleCheck={toggleIngredientCheck}
              onAddToShoppingList={handleAddToShoppingList}
              onAddAllToShoppingList={handleAddAllToShoppingList}
            />
          </div>

          {/* Right Column - Instructions */}
          <div className="md:col-span-2">
            <RecipeInstructions instructions={instructions} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default RecipeDetail

