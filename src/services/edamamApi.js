import axios from 'axios'

const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID || ''
const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY || ''

const NUTRITION_BASE_URL = 'https://api.edamam.com/api/nutrition-details'
const FOOD_BASE_URL = 'https://api.edamam.com/api/food-database/v2'

export const edamamApi = {
  // Get detailed nutrition analysis for a recipe
  getNutritionData: async (ingredients) => {
    const recipeData = {
      title: 'Recipe Analysis',
      ingr: Array.isArray(ingredients) ? ingredients : [ingredients],
      yield: 1,
    }

    const response = await axios.post(
      `${NUTRITION_BASE_URL}?app_id=${APP_ID}&app_key=${APP_KEY}`,
      recipeData
    )
    return response.data
  },

  // Analyze single ingredient
  analyzeIngredient: async (ingredient) => {
    const response = await axios.get(`${FOOD_BASE_URL}/parser`, {
      params: {
        app_id: APP_ID,
        app_key: APP_KEY,
        ingr: ingredient,
      },
    })
    return response.data
  },

  // Get nutrients for specific food
  getFoodNutrients: async (foodId, quantity = 100, unit = 'g') => {
    const response = await axios.post(
      `${FOOD_BASE_URL}/nutrients?app_id=${APP_ID}&app_key=${APP_KEY}`,
      {
        ingredients: [
          {
            quantity,
            measureURI: unit,
            foodId,
          },
        ],
      }
    )
    return response.data
  },

  // Analyze full recipe
  analyzeRecipe: async (recipeData) => {
    const response = await axios.post(
      `${NUTRITION_BASE_URL}?app_id=${APP_ID}&app_key=${APP_KEY}`,
      recipeData
    )
    return response.data
  },
}

export default edamamApi

