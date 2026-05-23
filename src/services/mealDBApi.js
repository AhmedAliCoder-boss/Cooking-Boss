import axios from 'axios'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

export const mealDBApi = {
  // Get latest meals (small sample from API)
  getLatestMeals: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/latest.php`)
      return response.data?.meals || []
    } catch (error) {
      console.error('TheMealDB API error:', error)
      return []
    }
  },

  /**
   * Merge meals from every category (deduped). Filter endpoint returns id + name + thumb; strCategory filled from source category.
   */
  getAllMealsAggregated: async () => {
    try {
      const categories = await mealDBApi.getCategories()
      if (!Array.isArray(categories) || categories.length === 0) {
        const fallback = await axios.get(`${BASE_URL}/latest.php`)
        return fallback.data?.meals || []
      }
      const settled = await Promise.allSettled(
        categories.map((c) =>
          axios.get(`${BASE_URL}/filter.php?c=${encodeURIComponent(c.strCategory)}`)
        )
      )
      const byId = new Map()
      settled.forEach((result, i) => {
        if (result.status !== 'fulfilled') return
        const catName = categories[i]?.strCategory
        const meals = result.value.data?.meals
        if (!Array.isArray(meals)) return
        for (const m of meals) {
          if (!m?.idMeal || byId.has(m.idMeal)) continue
          byId.set(m.idMeal, {
            ...m,
            strCategory: m.strCategory || catName,
          })
        }
      })
      return Array.from(byId.values()).sort((a, b) =>
        (a.strMeal || '').localeCompare(b.strMeal || '', undefined, { sensitivity: 'base' })
      )
    } catch (error) {
      console.error('Aggregated meals error:', error)
      return []
    }
  },

  // Search meals by name
  searchMeals: async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`)
      return response.data?.meals || []
    } catch (error) {
      console.error('Search error:', error)
      return []
    }
  },

  // Get meal by ID
  getMealById: async (id) => {
    const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`)
    return response.data.meals?.[0] || null
  },

  // Get all categories
  getCategories: async () => {
    const response = await axios.get(`${BASE_URL}/categories.php`)
    return response.data.categories || []
  },

  // Get meals by category
  getMealsByCategory: async (category) => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`)
      return response.data?.meals || []
    } catch (error) {
      console.error('Category filter error:', error)
      return []
    }
  },

  // Get meals by area (cuisine)
  getMealsByArea: async (area) => {
    const response = await axios.get(`${BASE_URL}/filter.php?a=${area}`)
    return response.data.meals || []
  },

  // Get random meal
  getRandomMeal: async () => {
    const response = await axios.get(`${BASE_URL}/random.php`)
    return response.data.meals?.[0] || null
  },

  /**
   * Several parallel random meals (deduped) for home “featured” — all valid MealDB ids for /recipe/:id.
   */
  getFeaturedMealsRandom: async (count = 12) => {
    const target = Math.min(Math.max(count, 4), 16)
    const settled = await Promise.allSettled(
      Array.from({ length: target + 4 }, () => axios.get(`${BASE_URL}/random.php`))
    )
    const byId = new Map()
    for (const r of settled) {
      if (r.status !== 'fulfilled') continue
      const m = r.value.data?.meals?.[0]
      if (m?.idMeal && !byId.has(m.idMeal)) byId.set(m.idMeal, m)
      if (byId.size >= target) break
    }
    let list = Array.from(byId.values())
    if (list.length < 6) {
      try {
        const latest = await mealDBApi.getLatestMeals()
        for (const m of latest || []) {
          if (m?.idMeal && !byId.has(m.idMeal)) {
            byId.set(m.idMeal, m)
          }
        }
        list = Array.from(byId.values())
      } catch {
        /* ignore */
      }
    }
    return list.slice(0, target)
  },

  // Get ingredients list
  getIngredients: async () => {
    const response = await axios.get(`${BASE_URL}/list.php?i=list`)
    return response.data.meals || []
  },
}

export default mealDBApi

