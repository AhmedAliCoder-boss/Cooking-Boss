import axios from 'axios'

const API_KEY = import.meta.env.VITE_TASTY_API_KEY || ''
const BASE_URL = 'https://tasty.p.rapidapi.com'

const tastyClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
  },
})

export const tastyApi = {
  // Search cooking videos
  searchVideos: async (query, offset = 0) => {
    try {
      const response = await tastyClient.get('/recipes/list', {
        params: {
          q: query,
          from: offset,
          size: 20,
          tags: 'video',
        },
      })
      return response.data?.results || []
    } catch (error) {
      return []
    }
  },

  // Get main feed (trending)
  getFeed: async (size = 20) => {
    try {
      const response = await tastyClient.get('/feeds/list', {
        params: {
          size,
          timezone: 'America/New_York',
          vegetarian: false,
        },
      })
      return response.data?.results || []
    } catch (error) {
      return []
    }
  },

  // Get recipe details by ID
  getRecipeDetails: async (id) => {
    const response = await tastyClient.get('/recipes/get-more-info', {
      params: {
        id,
      },
    })
    return response.data
  },

  // Auto-complete search suggestions
  getAutoComplete: async (query) => {
    const response = await tastyClient.get('/recipes/auto-complete', {
      params: {
        prefix: query,
      },
    })
    return response.data.results || []
  },

  // Get similar recipes
  getSimilarRecipes: async (id) => {
    const response = await tastyClient.get('/recipes/list-similarities', {
      params: {
        recipe_id: id,
      },
    })
    return response.data.results || []
  },

  // Get tips and reviews
  getTips: async (id, offset = 0) => {
    const response = await tastyClient.get('/tips/list', {
      params: {
        id,
        from: offset,
        size: 20,
      },
    })
    return response.data.results || []
  },

  // Get videos only
  getVideos: async (offset = 0, size = 20) => {
    try {
      const response = await tastyClient.get('/videos/list', {
        params: {
          from: offset,
          size,
        },
      })
      return response.data?.results || []
    } catch (error) {
      return []
    }
  },
}

export default tastyApi

