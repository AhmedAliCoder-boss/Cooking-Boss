import axios from 'axios'

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY || ''

const BASE_URL = 'https://api.spoonacular.com'

export const spoonacularApi = {
  searchRecipes: async (query, options = {}) => {
    const params = {
      query,
      apiKey: API_KEY,
      number: options.number || 10,
      ...options,
    }
    const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, { params })
    return response.data.results
  },

  getRecipeDetails: async (id) => {
    const response = await axios.get(`${BASE_URL}/recipes/${id}/information`, {
      params: { apiKey: API_KEY },
    })
    return response.data
  },

  getIngredientInfo: async (id) => {
    const response = await axios.get(`${BASE_URL}/food/ingredients/${id}/information`, {
      params: { apiKey: API_KEY, amount: 1 },
    })
    return response.data
  },

  searchByIngredients: async (ingredients, number = 10) => {
    const params = {
      ingredients: ingredients.join(','),
      apiKey: API_KEY,
      number,
    }
    const response = await axios.get(`${BASE_URL}/recipes/findByIngredients`, { params })
    return response.data
  },
}

export default spoonacularApi
