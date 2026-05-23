import React, { useEffect, useState } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { FaArrowLeft, FaClock, FaUsers, FaUtensils, FaHeart, FaPrint, FaFire, FaPlayCircle, FaTimes, FaPlay } from 'react-icons/fa'
import { useRecipes } from '../hooks'
import { useFavorites } from '../hooks/useFavorites'
import { useShoppingList } from '../hooks/useShoppingList'
import { useUnsplashHero } from '../hooks/useUnsplashHero'
import ShareButton from '../components/ShareButton'
import UnsplashAttribution from '../components/UnsplashAttribution'
import { SkeletonRecipeDetail } from '../components/Skeleton'
import RecipeIngredients from '../components/recipe/RecipeIngredients'
import RecipeInstructions from '../components/recipe/RecipeInstructions'
import { youtubeApi } from '../services/youtubeApi'

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
  const [mainRecipeVideo, setMainRecipeVideo] = useState(null)
  const [relatedRecipeVideos, setRelatedRecipeVideos] = useState([])
  const [videosLoading, setVideosLoading] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

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
    const loadRecipeVideos = async () => {
      if (!currentRecipe?.strMeal) return
      
      setVideosLoading(true)
      try {
        // Fetch main recipe video
        const mainVideos = await youtubeApi.searchRecipeVideo(currentRecipe.strMeal, 1)
        setMainRecipeVideo(mainVideos[0] || null)

        // Fetch 3 related recipe videos
        const relatedVideos = await youtubeApi.searchRelatedRecipeVideos(currentRecipe.strMeal, 3)
        setRelatedRecipeVideos(relatedVideos)
      } catch (error) {
        console.error('Failed to load recipe videos, using fallback:', error)
        // Fallback to hardcoded videos if API fails
        const fallbackVideos = getYouTubeFallbackVideos()
        setMainRecipeVideo(fallbackVideos[0] || null)
        setRelatedRecipeVideos(fallbackVideos.slice(1, 4))
      } finally {
        setVideosLoading(false)
      }
    }

    loadRecipeVideos()
  }, [currentRecipe])

  const getYouTubeFallbackVideos = () => {
    return [
      {
        id: 'yt1',
        name: 'Perfect Steak Recipe',
        video_id: 'sP-NNiqC1gE',
        thumbnail_url: null,
        bg_color: '#ff6b6b',
        total_time_minutes: 8,
        user_ratings: { score: 0.95 }
      },
      {
        id: 'yt2',
        name: 'Pasta Carbonara Tutorial',
        video_id: '2CqC9b1qFX8',
        thumbnail_url: null,
        bg_color: '#4ecdc4',
        total_time_minutes: 12,
        user_ratings: { score: 0.92 }
      },
      {
        id: 'yt3',
        name: 'Homemade Pizza Guide',
        video_id: 'lB4E5e3TQzY',
        thumbnail_url: null,
        bg_color: '#45b7d1',
        total_time_minutes: 15,
        user_ratings: { score: 0.88 }
      }
    ]
  }

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
    // Prepare recipe data for print template
    const recipeData = {
      image: unsplashHero?.heroUrl || currentRecipe.strMealThumb,
      category: currentRecipe.strCategory,
      title: currentRecipe.strMeal,
      area: currentRecipe.strArea,
      time: recipeStats.duration,
      servings: recipeStats.servings,
      calories: recipeStats.calories,
      ingredients: ingredients.map(ing => `${ing.measure} ${ing.ingredient}`),
      instructions: instructions
    }

    // Open print template in new window
    const printWindow = window.open('/print-template.html', '_blank', 'width=800,height=1000')
    
    // Wait for window to load, then send recipe data
    printWindow.onload = () => {
      printWindow.postMessage({ type: 'RECIPE_DATA', recipe: recipeData }, '*')
      setTimeout(() => {
        printWindow.print()
      }, 500)
    }
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

  const handleVideoClick = (video) => {
    setSelectedVideo(video)
    setIsVideoModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeVideoModal = () => {
    setIsVideoModalOpen(false)
    setSelectedVideo(null)
    document.body.style.overflow = 'unset'
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isVideoModalOpen) {
        closeVideoModal()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isVideoModalOpen])

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
            <FaArrowLeft className="text-lg" />
            <span className="hidden sm:inline">Back to Recipes</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm text-white rounded-full hover:bg-black/60 transition-colors print:hidden"
            >
              <FaPrint className="text-lg" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={() => toggleFavorite(currentRecipe)}
              className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition-colors print:hidden"
            >
              <FaHeart 
                className={isFavorite(currentRecipe.idMeal) ? 'text-[#ff6b6b] fill-[#ff6b6b] text-xl' : 'text-white text-xl'}
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
                <FaClock className="text-[#ff6b6b] text-lg" />
                {recipeStats.duration} mins
              </span>
              <span className="flex items-center gap-2">
                <FaUsers className="text-[#ff6b6b] text-lg" />
                {recipeStats.servings} servings
              </span>
              <span className="flex items-center gap-2">
                <FaFire className="text-[#ff6b6b] text-lg" />
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

      {/* Main Recipe Video Section */}
      {mainRecipeVideo && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="border-t border-slate-800 pt-12">
            <h2 className="text-2xl font-bold text-(--text-primary) mb-6 flex items-center gap-3">
              <FaPlayCircle className="text-[#ff6b6b]" />
              How to Make {currentRecipe.strMeal}
            </h2>
            <div
              onClick={() => handleVideoClick(mainRecipeVideo)}
              className="group bg-slate-800 rounded-2xl overflow-hidden border border-white/5 hover:border-[#ff6b6b]/30 transition-all hover:-translate-y-1 cursor-pointer"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                {mainRecipeVideo.thumbnail_url ? (
                  <img
                    src={mainRecipeVideo.thumbnail_url}
                    alt={mainRecipeVideo.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: mainRecipeVideo.bg_color }}
                  >
                    <FaPlay className="text-white text-4xl opacity-80" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <FaPlay className="text-white text-5xl" />
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-(--text-primary) text-xl font-semibold mb-2 group-hover:text-[#ff6b6b] transition-colors">
                  {mainRecipeVideo.name}
                </h3>
                {mainRecipeVideo.channel_title && (
                  <p className="text-slate-400 text-sm mb-3">{mainRecipeVideo.channel_title}</p>
                )}
                <div className="flex items-center gap-4 text-slate-400 text-sm">
                  {mainRecipeVideo.total_time_minutes && (
                    <span className="flex items-center gap-1">
                      <FaClock className="text-sm" />
                      {mainRecipeVideo.total_time_minutes}m
                    </span>
                  )}
                  {mainRecipeVideo.user_ratings && (
                    <span className="flex items-center gap-1">
                      <FaUsers className="text-sm" />
                      {Math.round(mainRecipeVideo.user_ratings.score * 100)}% liked
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Related Recipe Videos Section */}
      {relatedRecipeVideos.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="border-t border-slate-800 pt-12">
            <h2 className="text-2xl font-bold text-(--text-primary) mb-6 flex items-center gap-3">
              <FaPlayCircle className="text-[#ff6b6b]" />
              Related Recipe Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedRecipeVideos.map((video, index) => (
                <div
                  key={video.id || index}
                  onClick={() => handleVideoClick(video)}
                  className="group bg-slate-800 rounded-2xl overflow-hidden border border-white/5 hover:border-[#ff6b6b]/30 transition-all hover:-translate-y-1 cursor-pointer"
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-slate-900">
                    {video.thumbnail_url ? (
                      <img
                        src={video.thumbnail_url}
                        alt={video.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div 
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: video.bg_color }}
                      >
                        <FaPlay className="text-white text-4xl opacity-80" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <FaPlay className="text-white text-5xl" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-(--text-primary) font-semibold mb-2 line-clamp-2 group-hover:text-[#ff6b6b] transition-colors">
                      {video.name}
                    </h3>
                    {video.channel_title && (
                      <p className="text-slate-400 text-sm mb-2">{video.channel_title}</p>
                    )}
                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                      {video.total_time_minutes && (
                        <span className="flex items-center gap-1">
                          <FaClock className="text-sm" />
                          {video.total_time_minutes}m
                        </span>
                      )}
                      {video.user_ratings && (
                        <span className="flex items-center gap-1">
                          <FaUsers className="text-sm" />
                          {Math.round(video.user_ratings.score * 100)}% liked
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {isVideoModalOpen && selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl">
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white hover:text-[#ff6b6b] transition-colors"
              aria-label="Close modal"
            >
              <FaTimes className="text-3xl" />
            </button>

            {/* Video Container */}
            <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.video_id}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1&enablejsapi=1`}
                  title={selectedVideo.name}
                  className="w-full h-full"
                  style={{ minHeight: '400px' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-(--text-primary) mb-2">
                  {selectedVideo.name}
                </h2>
                {selectedVideo.channel_title && (
                  <p className="text-slate-400 mb-4">{selectedVideo.channel_title}</p>
                )}
                {selectedVideo.description && (
                  <p className="text-slate-300 text-sm line-clamp-3">
                    {selectedVideo.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default RecipeDetail

