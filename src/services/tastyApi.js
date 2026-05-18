import axios from 'axios'

const API_KEY = import.meta.env.VITE_TASTY_API_KEY || ''

const BASE_URL = 'https://tasty.p.rapidapi.com'

export const tastyApi = {
  searchVideos: async (query, from = 0) => {
    const response = await axios.get(`${BASE_URL}/recipes/list`, {
      params: {
        from,
        size: 20,
        q: query,
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
      },
    })
    return response.data.results
  },

  getFeed: async (size = 20) => {
    const response = await axios.get(`${BASE_URL}/feeds/list`, {
      params: {
        size,
        vegetarian: false,
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
      },
    })
    return response.data.results
  },

  getRecipeDetails: async (id) => {
    const response = await axios.get(`${BASE_URL}/recipes/get-more-info`, {
      params: { id },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
      },
    })
    return response.data
  },
}

export default tastyApi
