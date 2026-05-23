import axios from 'axios'

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || ''

const BASE_URL = 'https://www.googleapis.com/youtube/v3'

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 second timeout
})

export const youtubeApi = {
  searchCookingVideos: async (maxResults = 12) => {
    try {
      const response = await apiClient.get('/search', {
        params: {
          part: 'snippet',
          q: 'cooking recipes food tutorial',
          type: 'video',
          maxResults: maxResults,
          order: 'relevance',
          videoDuration: 'medium', // Medium length videos (4-20 mins)
          key: API_KEY,
        },
      })

      const videos = response.data.items || []

      // Transform to match the expected format
      return videos.map((video, index) => ({
        id: video.id.videoId,
        name: video.snippet.title,
        video_id: video.id.videoId,
        thumbnail_url: video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.medium?.url,
        bg_color: getColorByIndex(index),
        total_time_minutes: getTimeByIndex(index),
        user_ratings: { score: 0.85 + (index % 3) * 0.05 }, // Consistent score based on index
        description: video.snippet.description,
        channel_title: video.snippet.channelTitle,
        published_at: video.snippet.publishedAt,
      }))
    } catch (error) {
      console.error('YouTube API search error:', error.response?.status, error.message)
      throw error
    }
  },

  searchRecipeVideo: async (recipeName, maxResults = 1) => {
    try {
      const response = await apiClient.get('/search', {
        params: {
          part: 'snippet',
          q: `${recipeName} recipe cooking tutorial`,
          type: 'video',
          maxResults: maxResults,
          order: 'relevance',
          videoDuration: 'medium',
          key: API_KEY,
        },
      })

      const videos = response.data.items || []

      // Transform to match the expected format
      return videos.map((video, index) => ({
        id: video.id.videoId,
        name: video.snippet.title,
        video_id: video.id.videoId,
        thumbnail_url: video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.medium?.url,
        bg_color: getColorByIndex(index),
        total_time_minutes: getTimeByIndex(index),
        user_ratings: { score: 0.85 + (index % 3) * 0.05 },
        description: video.snippet.description,
        channel_title: video.snippet.channelTitle,
        published_at: video.snippet.publishedAt,
      }))
    } catch (error) {
      console.error('YouTube API recipe video search error:', error.response?.status, error.message)
      throw error
    }
  },

  searchRelatedRecipeVideos: async (recipeName, maxResults = 3) => {
    try {
      const response = await apiClient.get('/search', {
        params: {
          part: 'snippet',
          q: `${recipeName} similar recipes cooking`,
          type: 'video',
          maxResults: maxResults,
          order: 'relevance',
          videoDuration: 'medium',
          key: API_KEY,
        },
      })

      const videos = response.data.items || []

      // Transform to match the expected format
      return videos.map((video, index) => ({
        id: video.id.videoId,
        name: video.snippet.title,
        video_id: video.id.videoId,
        thumbnail_url: video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.medium?.url,
        bg_color: getColorByIndex(index),
        total_time_minutes: getTimeByIndex(index),
        user_ratings: { score: 0.85 + (index % 3) * 0.05 },
        description: video.snippet.description,
        channel_title: video.snippet.channelTitle,
        published_at: video.snippet.publishedAt,
      }))
    } catch (error) {
      console.error('YouTube API related videos search error:', error.response?.status, error.message)
      throw error
    }
  },

  getRandomCookingVideos: async (maxResults = 12) => {
    try {
      // Use consistent query instead of random
      return await youtubeApi.searchCookingVideos(maxResults)
    } catch (error) {
      console.error('YouTube API random videos error:', error.response?.status, error.message)
      throw error
    }
  },
}

// Helper function to generate consistent colors by index
function getColorByIndex(index) {
  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4',
    '#ffeaa7', '#dfe6e9', '#fd79a8', '#a29bfe',
    '#fdcb6e', '#e17055', '#00b894', '#0984e3'
  ]
  return colors[index % colors.length]
}

// Helper function to generate consistent cooking times by index
function getTimeByIndex(index) {
  const times = [5, 8, 10, 12, 15, 20, 25, 30, 35, 45]
  return times[index % times.length]
}

export default youtubeApi
