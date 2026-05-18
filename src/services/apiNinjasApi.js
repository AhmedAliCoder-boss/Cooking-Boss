import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_NINJAS_KEY || ''

const BASE_URL = 'https://api.api-ninjas.com/v1'

export const apiNinjasApi = {
  searchIngredients: async (query) => {
    const response = await axios.get(`${BASE_URL}/ingredients?query=${query}`, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    })
    return response.data
  },

  getRecipesByIngredient: async (ingredient) => {
    const response = await axios.get(`${BASE_URL}/recipe?query=${ingredient}`, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    })
    return response.data
  },

  getNutrition: async (query) => {
    const response = await axios.get(`${BASE_URL}/nutrition?query=${query}`, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    })
    return response.data
  },
}

export default apiNinjasApi
