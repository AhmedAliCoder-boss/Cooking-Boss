import axios from 'axios'

const API_KEY = import.meta.env.VITE_TASTY_API_KEY || ''

const BASE_URL = 'https://tasty.p.rapidapi.com'

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
  },
  timeout: 10000, // 10 second timeout
})

export const tastyApi = {
  searchVideos: async (query, from = 0) => {
    try {
      const response = await apiClient.get('/recipes/list', {
        params: {
          from,
          size: 20,
          q: query,
        },
      })
      return response.data.results || []
    } catch (error) {
      console.error('Tasty API search error:', error.response?.status, error.message)
      throw error
    }
  },

  getFeed: async (size = 20) => {
    try {
      const response = await apiClient.get('/feeds/list', {
        params: {
          size,
          vegetarian: false,
        },
      })
      return response.data.results || []
    } catch (error) {
      console.error('Tasty API feed error:', error.response?.status, error.message)
      throw error
    }
  },

  getRecipeDetails: async (id) => {
    try {
      const response = await apiClient.get('/recipes/get-more-info', {
        params: { id },
      })
      return response.data
    } catch (error) {
      console.error('Tasty API recipe details error:', error.response?.status, error.message)
      throw error
    }
  },
}

export default tastyApi
