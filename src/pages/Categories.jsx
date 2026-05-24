import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FaTh, FaUtensils, FaSearch, FaFire, FaClock, FaFilter } from 'react-icons/fa'
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
  useEffect(() => {
    document.title = 'Categories - Cooking Boss'
  }, [])

  const [categories, setCategories] = useState([])
  const [areas, setAreas] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('categories')
  const [unsplashCovers, setUnsplashCovers] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [categoryCounts, setCategoryCounts] = useState({})
  const [areaCounts, setAreaCounts] = useState({})

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
      
      // Calculate recipe counts (simulated for now)
      const catCounts = {}
      cats.forEach(cat => {
        catCounts[cat.strCategory] = Math.floor(Math.random() * 500) + 50
      })
      setCategoryCounts(catCounts)
      
      const areaCounts = {}
      Object.keys(areaImages).forEach(area => {
        areaCounts[area] = Math.floor(Math.random() * 300) + 30
      })
      setAreaCounts(areaCounts)
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

  // Filter and sort categories
  const filteredCategories = useMemo(() => {
    let filtered = categories.filter(cat => 
      cat.strCategory.toLowerCase().includes(searchQuery.toLowerCase())
    )
    
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.strCategory.localeCompare(b.strCategory))
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => (categoryCounts[b.strCategory] || 0) - (categoryCounts[a.strCategory] || 0))
    }
    
    return filtered
  }, [categories, searchQuery, sortBy, categoryCounts])

  // Filter and sort areas
  const filteredAreas = useMemo(() => {
    let filtered = areas.filter(area => 
      area.toLowerCase().includes(searchQuery.toLowerCase())
    )
    
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.localeCompare(b))
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => (areaCounts[b] || 0) - (areaCounts[a] || 0))
    }
    
    return filtered
  }, [areas, searchQuery, sortBy, areaCounts])

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

        {/* Search and Filter Bar */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 mb-8 border border-white/10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search categories or cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl text-(--text-primary) placeholder-slate-400 focus:outline-none focus:border-[#ff6b6b]/50 transition-colors"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-(--text-primary) focus:outline-none focus:border-[#ff6b6b]/50 transition-colors cursor-pointer"
              >
                <option value="name">Sort by Name</option>
                <option value="popular">Sort by Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === 'categories'
                ? 'bg-[#ff6b6b] text-white shadow-lg shadow-[#ff6b6b]/30'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            <FaUtensils className="text-xl" />
            Categories
            <span className="ml-2 px-2 py-0.5 text-xs bg-white/20 rounded-full">
              {categories.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('cuisines')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === 'cuisines'
                ? 'bg-[#ff6b6b] text-white shadow-lg shadow-[#ff6b6b]/30'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            <FaTh className="text-xl" />
            Cuisines
            <span className="ml-2 px-2 py-0.5 text-xs bg-white/20 rounded-full">
              {areas.length}
            </span>
          </button>
        </div>

        {/* Categories Grid */}
        {activeTab === 'categories' && (
          <>
            {filteredCategories.length === 0 ? (
              <div className="text-center py-16">
                <FaSearch className="text-6xl text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">No categories found matching "{searchQuery}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filteredCategories.map((category, index) => {
                  const cover = unsplashCovers[category.strCategory]
                  const src =
                    cover?.thumbUrl ||
                    cover?.heroUrl ||
                    categoryImages[category.strCategory] ||
                    category.strCategoryThumb
                  const count = categoryCounts[category.strCategory] || 0
                  const isPopular = index < 3 && sortBy === 'popular'
                  return (
                  <Link
                    key={category.strCategory}
                    to={`/recipes?category=${category.strCategory}`}
                    className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#ff6b6b]/30 transition-all hover:-translate-y-2 text-center relative"
                  >
                    {isPopular && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="flex items-center gap-1 px-2 py-1 bg-[#ff6b6b] text-white text-xs font-semibold rounded-full shadow-lg">
                          <FaFire className="text-xs" />
                          Popular
                        </span>
                      </div>
                    )}
                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900/50 relative">
                      <img
                        src={src}
                        alt={cover?.alt || category.strCategory}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4">
                    <h3 className="text-(--text-primary) font-semibold group-hover:text-[#ff6b6b] transition-colors">
                      {category.strCategory}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1 line-clamp-2">
                      {category.strCategoryDescription?.slice(0, 60)}...
                    </p>
                    <div className="flex items-center justify-center gap-1 mt-3 text-xs text-slate-500">
                      <FaUtensils className="text-[#ff6b6b]" />
                      <span>{count} recipes</span>
                    </div>
                    </div>
                  </Link>
                  )
                })}
              </div>
            )}
          </>
        )}

        {/* Cuisines Grid */}
        {activeTab === 'cuisines' && (
          <>
            {filteredAreas.length === 0 ? (
              <div className="text-center py-16">
                <FaSearch className="text-6xl text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">No cuisines found matching "{searchQuery}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredAreas.map((area, index) => {
                  const cover = unsplashCovers[area]
                  const count = areaCounts[area] || 0
                  const isPopular = index < 3 && sortBy === 'popular'
                  return (
                  <Link
                    key={area}
                    to={`/recipes?area=${area}`}
                    className="group bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-[#ff6b6b]/30 transition-all hover:-translate-y-1 text-center relative"
                  >
                    {isPopular && (
                      <div className="absolute top-2 right-2 z-10">
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-[#ff6b6b] text-white text-[10px] font-semibold rounded-full shadow-lg">
                          <FaFire className="text-[10px]" />
                          Hot
                        </span>
                      </div>
                    )}
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-3">
                    <h3 className="text-(--text-primary) font-medium group-hover:text-[#ff6b6b] transition-colors">
                      {area}
                    </h3>
                    <div className="flex items-center justify-center gap-1 mt-2 text-xs text-slate-500">
                      <FaUtensils className="text-[#ff6b6b]" />
                      <span>{count} recipes</span>
                    </div>
                    </div>
                  </Link>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}

export default Categories

