import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_NINJAS_KEY || ''
const BASE_URL = 'https://api.api-ninjas.com/v1'

const ninjasClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Api-Key': API_KEY,
  },
})

export const apiNinjasApi = {
  // Search ingredients
  searchIngredients: async (query) => {
    const response = await ninjasClient.get('/ingredients', {
      params: {
        query,
      },
    })
    return response.data || []
  },

  // Get recipes by ingredient
  getRecipesByIngredient: async (ingredient) => {
    const response = await ninjasClient.get('/recipe', {
      params: {
        query: ingredient,
      },
    })
    return response.data || []
  },

  // Get recipe by ID (if available)
  getRecipeById: async (id) => {
    const response = await ninjasClient.get(`/recipe`, {
      params: {
        id,
      },
    })
    return response.data?.[0] || null
  },

  // Get random recipe
  getRandomRecipe: async () => {
    const response = await ninjasClient.get('/recipe', {
      params: {
        offset: Math.floor(Math.random() * 100),
      },
    })
    return response.data?.[0] || null
  },

  // Get nutrition info for ingredient
  getNutrition: async (query) => {
    const response = await ninjasClient.get('/nutrition', {
      params: {
        query,
      },
    })
    return response.data
  },
}

export default apiNinjasApi

