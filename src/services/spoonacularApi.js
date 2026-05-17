import axios from 'axios'

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY || ''
const BASE_URL = 'https://api.spoonacular.com'

const spoonacularClient = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
})

export const spoonacularApi = {
  // Smart recipe search
  searchRecipes: async (query, options = {}) => {
    const response = await spoonacularClient.get('/recipes/complexSearch', {
      params: {
        query,
        number: options.number || 20,
        diet: options.diet || '',
        intolerances: options.intolerances || '',
        cuisine: options.cuisine || '',
        addRecipeInformation: true,
        fillIngredients: true,
      },
    })
    return response.data.results || []
  },

  // Search by ingredients (what's in your fridge)
  searchByIngredients: async (ingredients, number = 10) => {
    const ingredientString = Array.isArray(ingredients) 
      ? ingredients.join(',') 
      : ingredients
    
    const response = await spoonacularClient.get('/recipes/findByIngredients', {
      params: {
        ingredients: ingredientString,
        number,
        ranking: 1,
        ignorePantry: true,
      },
    })
    return response.data || []
  },

  // Get recipe details
  getRecipeDetails: async (id) => {
    const response = await spoonacularClient.get(`/recipes/${id}/information`, {
      params: {
        includeNutrition: true,
      },
    })
    return response.data
  },

  // Get ingredient information
  getIngredientInfo: async (id) => {
    const response = await spoonacularClient.get(`/food/ingredients/${id}/information`, {
      params: {
        amount: 1,
      },
    })
    return response.data
  },

  // Autocomplete ingredient search
  autocompleteIngredient: async (query, number = 5) => {
    const response = await spoonacularClient.get('/food/ingredients/autocomplete', {
      params: {
        query,
        number,
      },
    })
    return response.data || []
  },

  // Get random recipes
  getRandomRecipes: async (number = 10) => {
    const response = await spoonacularClient.get('/recipes/random', {
      params: {
        number,
      },
    })
    return response.data.recipes || []
  },

  // Analyze ingredients in natural language
  analyzeIngredients: async (ingredients) => {
    const response = await spoonacularClient.post('/recipes/parseIngredients', {
      ingredientList: ingredients,
      servings: 1,
    })
    return response.data
  },
}

export default spoonacularApi

