import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Grid3X3, UtensilsCrossed } from 'lucide-react'
import { mealDBApi } from '../services/mealDBApi'
import { getSingleCoverPhoto } from '../services/unsplashApi'
import { SkeletonGrid } from '../components/Skeleton'

const categoryImages = {
  Beef: 'https://www.themealdb.com/images/category/beef.png',
  Chicken: 'https://www.themealdb.com/images/category/chicken.png',
  Dessert: 'https://www.themealdb.com/images/category/dessert.png',
  Lamb: 'https://www.themealdb.com/images/category/lamb.png',
  Miscellaneous: 'https://www.themealdb.com/images/category/miscellaneous.png',
  Pasta: 'https://www.themealdb.com/images/category/pasta.png',
  Pork: 'https://www.themealdb.com/images/category/pork.png',
  Seafood: 'https://www.themealdb.com/images/category/seafood.png',
  Side: 'https://www.themealdb.com/images/category/side.png',
  Starter: 'https://www.themealdb.com/images/category/starter.png',
  Vegan: 'https://www.themealdb.com/images/category/vegan.png',
  Vegetarian: 'https://www.themealdb.com/images/category/vegetarian.png',
  Breakfast: 'https://www.themealdb.com/images/category/breakfast.png',
  Goat: 'https://www.themealdb.com/images/category/goat.png',
}

const areaImages = {
  American: '🇺🇸',
  British: '🇬🇧',
  Canadian: '🇨🇦',
  Chinese: '🇨🇳',
  Croatian: '🇭🇷',
  Dutch: '🇳🇱',
  Egyptian: '🇪🇬',
  Filipino: '🇵🇭',
  French: '🇫🇷',
  Greek: '🇬🇷',
  Indian: '🇮🇳',
  Irish: '🇮🇪',
  Italian: '🇮🇹',
  Jamaican: '🇯🇲',
  Japanese: '🇯🇵',
  Kenyan: '🇰🇪',
  Malaysian: '🇲🇾',
  Mexican: '🇲🇽',
  Moroccan: '🇲🇦',
  Polish: '🇵🇱',
  Portuguese: '🇵🇹',
  Russian: '🇷🇺',
  Spanish: '🇪🇸',
  Thai: '🇹🇭',
  Tunisian: '🇹🇳',
  Turkish: '🇹🇷',
  Ukrainian: '🇺🇦',
  Vietnamese: '🇻🇳',
}

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [areas, setAreas] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('categories')
  const [unsplashCovers, setUnsplashCovers] = useState({})

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [cats, ingredients] = await Promise.all([
        mealDBApi.getCategories(),
        mealDBApi.getIngredients(),
      ])
      setCategories(cats)
      // Get unique areas from ingredients or use static list
      setAreas(Object.keys(areaImages))
    } catch (error) {
      console.error('Failed to load categories:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (loading) return

    if (activeTab === 'categories' && categories.length > 0) {
      let cancelled = false
      ;(async () => {
        const pairs = await Promise.all(
          categories.map(async (c) => {
            const photo = await getSingleCoverPhoto(`${c.strCategory} food dish`)
            return [c.strCategory, photo]
          })
        )
        if (!cancelled) {
          setUnsplashCovers((prev) => ({ ...prev, ...Object.fromEntries(pairs) }))
        }
      })()
      return () => {
        cancelled = true
      }
    }

    if (activeTab === 'cuisines' && areas.length > 0) {
      let cancelled = false
      ;(async () => {
        const pairs = await Promise.all(
          areas.map(async (area) => {
            const photo = await getSingleCoverPhoto(`${area} cuisine traditional food`)
            return [area, photo]
          })
        )
        if (!cancelled) {
          setUnsplashCovers((prev) => ({ ...prev, ...Object.fromEntries(pairs) }))
        }
      })()
      return () => {
        cancelled = true
      }
    }
  }, [loading, activeTab, categories, areas])

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SkeletonGrid count={12} />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-(--text-primary) mb-4">
            Browse by <span className="text-[#ff6b6b]">Category</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Explore recipes organized by category or cuisine type
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === 'categories'
                ? 'bg-[#ff6b6b] text-white'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            <UtensilsCrossed size={20} />
            Categories
          </button>
          <button
            onClick={() => setActiveTab('cuisines')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === 'cuisines'
                ? 'bg-[#ff6b6b] text-white'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            <Grid3X3 size={20} />
            Cuisines
          </button>
        </div>

        {/* Categories Grid */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {categories.map((category) => {
              const cover = unsplashCovers[category.strCategory]
              const src =
                cover?.thumbUrl ||
                cover?.heroUrl ||
                categoryImages[category.strCategory] ||
                category.strCategoryThumb
              return (
              <Link
                key={category.strCategory}
                to={`/recipes?category=${category.strCategory}`}
                className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#ff6b6b]/30 transition-all hover:-translate-y-2 text-center"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900/50">
                  <img
                    src={src}
                    alt={cover?.alt || category.strCategory}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                <h3 className="mt-4 text-(--text-primary) font-semibold group-hover:text-[#ff6b6b] transition-colors">
                  {category.strCategory}
                </h3>
                <p className="text-slate-400 text-sm mt-1 line-clamp-2">
                  {category.strCategoryDescription?.slice(0, 60)}...
                </p>
                </div>
              </Link>
              )
            })}
          </div>
        )}

        {/* Cuisines Grid */}
        {activeTab === 'cuisines' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {areas.map((area) => {
              const cover = unsplashCovers[area]
              return (
              <Link
                key={area}
                to={`/recipes?area=${area}`}
                className="group bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-[#ff6b6b]/30 transition-all hover:-translate-y-1 text-center"
              >
                <div className="relative h-28 w-full overflow-hidden bg-slate-900/50">
                  {cover?.thumbUrl ? (
                    <img
                      src={cover.thumbUrl}
                      alt={cover.alt || `${area} cuisine`}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center text-4xl">{areaImages[area]}</span>
                  )}
                </div>
                <div className="p-3">
                <h3 className="text-(--text-primary) font-medium group-hover:text-[#ff6b6b] transition-colors">
                  {area}
                </h3>
                </div>
              </Link>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}

export default Categories

