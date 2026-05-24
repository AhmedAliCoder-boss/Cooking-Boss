import React, { useEffect, useState, useCallback, memo, useMemo } from 'react'
import { FaClock, FaUsers, FaUtensils, FaTimes, FaPlay, FaSearch } from 'react-icons/fa'
import { youtubeApi } from '../services/youtubeApi'

const getYouTubeFallbackVideos = () => {
  // Use actual YouTube video IDs for direct embedding
  return [
    {
      id: 'yt1',
      name: 'Perfect Steak Recipe',
      video_id: 'sP-NNiqC1gE',
      thumbnail_url: null,
      bg_color: '#ff6b6b',
      total_time_minutes: 8,
      user_ratings: { score: 0.95 }
    },
    {
      id: 'yt2',
      name: 'Pasta Carbonara Tutorial',
      video_id: '2CqC9b1qFX8',
      thumbnail_url: null,
      bg_color: '#4ecdc4',
      total_time_minutes: 12,
      user_ratings: { score: 0.92 }
    },
    {
      id: 'yt3',
      name: 'Homemade Pizza Guide',
      video_id: 'lB4E5e3TQzY',
      thumbnail_url: null,
      bg_color: '#45b7d1',
      total_time_minutes: 15,
      user_ratings: { score: 0.88 }
    },
    {
      id: 'yt4',
      name: 'French Omelette Recipe',
      video_id: 'dOUtVtIqK1o',
      thumbnail_url: null,
      bg_color: '#96ceb4',
      total_time_minutes: 6,
      user_ratings: { score: 0.90 }
    },
    {
      id: 'yt5',
      name: 'Chicken Stir Fry',
      video_id: 'J588Y2P1bMA',
      thumbnail_url: null,
      bg_color: '#ffeaa7',
      total_time_minutes: 10,
      user_ratings: { score: 0.85 }
    },
    {
      id: 'yt6',
      name: 'Chocolate Cake Recipe',
      video_id: 'Vq1NP3Y6Dx4',
      thumbnail_url: null,
      bg_color: '#dfe6e9',
      total_time_minutes: 8,
      user_ratings: { score: 0.93 }
    },
    {
      id: 'yt7',
      name: 'Caesar Salad Tutorial',
      video_id: 'QK6zY6n9e2k',
      thumbnail_url: null,
      bg_color: '#fd79a8',
      total_time_minutes: 7,
      user_ratings: { score: 0.87 }
    },
    {
      id: 'yt8',
      name: 'Roast Chicken Guide',
      video_id: 'JyNUrXGjX3c',
      thumbnail_url: null,
      bg_color: '#a29bfe',
      total_time_minutes: 45,
      user_ratings: { score: 0.91 }
    }
  ]
}

const VideoCard = memo(({ video, onVideoClick }) => {
  return (
    <div
      onClick={() => onVideoClick(video)}
      className="group bg-slate-800 rounded-2xl overflow-hidden border border-white/5 hover:border-[#ff6b6b]/30 transition-all hover:-translate-y-1 cursor-pointer"
    >
      {/* Video Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        {video.thumbnail_url ? (
          <img
            src={video.thumbnail_url}
            alt={video.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: video.bg_color }}
          >
            <FaPlay className="text-white text-4xl opacity-80" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <FaPlay className="text-white text-5xl" />
        </div>
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4">
        <h3 className="text-(--text-primary) font-semibold mb-2 line-clamp-2 group-hover:text-[#ff6b6b] transition-colors text-sm sm:text-base">
          {video.name}
        </h3>
        {video.channel_title && (
          <p className="text-slate-400 text-xs sm:text-sm mb-2">{video.channel_title}</p>
        )}
        <div className="flex items-center gap-2 sm:gap-3 text-slate-400 text-xs sm:text-sm">
          {video.total_time_minutes && (
            <span className="flex items-center gap-1">
              <FaClock className="text-xs sm:text-sm" />
              {video.total_time_minutes}m
            </span>
          )}
          {video.user_ratings && (
            <span className="flex items-center gap-1">
              <FaUsers className="text-xs sm:text-sm" />
              {Math.round(video.user_ratings.score * 100)}% liked
            </span>
          )}
        </div>
      </div>
    </div>
  )
})

VideoCard.displayName = 'VideoCard'

const Videos = () => {
  useEffect(() => {
    document.title = 'Cooking Videos - Cooking Boss'
  }, [])
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!hasLoaded) {
      loadVideos()
      setHasLoaded(true)
    }
  }, [hasLoaded])

  const loadVideos = async () => {
    setLoading(true)
    try {
      // Check localStorage for cached videos first
      const cachedVideos = localStorage.getItem('cookingVideos')
      if (cachedVideos) {
        setVideos(JSON.parse(cachedVideos))
        setLoading(false)
        return
      }

      // Try to fetch from YouTube API first
      const youtubeVideos = await youtubeApi.getRandomCookingVideos(12)
      setVideos(youtubeVideos)
      // Cache the results
      localStorage.setItem('cookingVideos', JSON.stringify(youtubeVideos))
    } catch (error) {
      console.error('Failed to fetch YouTube videos, using fallback:', error)
      // Fallback to hardcoded videos if API fails
      const fallbackVideos = getYouTubeFallbackVideos()
      setVideos(fallbackVideos)
      localStorage.setItem('cookingVideos', JSON.stringify(fallbackVideos))
    } finally {
      setLoading(false)
    }
  }

  const loadMoreVideos = useCallback(async () => {
    setLoadingMore(true)
    try {
      // Fetch more random videos
      const moreVideos = await youtubeApi.getRandomCookingVideos(12)
      setVideos(prev => {
        const updated = [...prev, ...moreVideos]
        // Update cache with new videos
        localStorage.setItem('cookingVideos', JSON.stringify(updated))
        return updated
      })
    } catch (error) {
      console.error('Failed to load more videos:', error)
      // Add fallback videos if API fails
      const fallbackVideos = getYouTubeFallbackVideos()
      setVideos(prev => {
        const updated = [...prev, ...fallbackVideos]
        localStorage.setItem('cookingVideos', JSON.stringify(updated))
        return updated
      })
    } finally {
      setLoadingMore(false)
    }
  }, [])

  const handleVideoClick = useCallback((video) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedVideo(null)
    document.body.style.overflow = 'unset'
  }, [])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isModalOpen, closeModal])

  // Filter videos based on search query
  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) return videos
    const query = searchQuery.toLowerCase()
    return videos.filter(video => 
      video.name?.toLowerCase().includes(query) ||
      video.channel_title?.toLowerCase().includes(query) ||
      video.description?.toLowerCase().includes(query)
    )
  }, [videos, searchQuery])

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b6b] mx-auto"></div>
        </div>
      </main>
    )
  }

  if (videos.length === 0) {
    return (
      <main className="min-h-screen bg-slate-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <FaPlayCircle className="mx-auto text-(--text-secondary) mb-4 text-6xl" />
          <h1 className="text-2xl font-bold text-(--text-primary) mb-3">No Videos Available</h1>
          <p className="text-slate-400">
            Cooking videos are currently unavailable. Check back later!
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-(--text-primary) mb-3">
            Cooking <span className="text-[#ff6b6b]">Videos</span>
          </h1>
          <p className="text-slate-400">
            Watch step-by-step video tutorials from our kitchen
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="relative max-w-2xl mx-auto">
            <FaSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm sm:text-base" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-8 sm:pr-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-(--text-primary) placeholder-slate-400 focus:outline-none focus:border-[#ff6b6b]/50 transition-colors text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                <FaTimes className="text-sm" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-center text-slate-400 text-xs sm:text-sm mt-2">
              Found {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Videos Grid */}
        {filteredVideos.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <FaSearch className="text-4xl sm:text-6xl text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-sm sm:text-lg">No videos found matching "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredVideos.map((video, index) => (
              <VideoCard
                key={video.id || index}
                video={video}
                onVideoClick={handleVideoClick}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!searchQuery && (
          <div className="mt-8 sm:mt-12 text-center">
            <button
              onClick={loadMoreVideos}
              disabled={loadingMore}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#ff6b6b] hover:bg-[#ff5252] text-white font-semibold rounded-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base"
            >
              {loadingMore ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                  Loading...
                </span>
              ) : (
                'Load More Videos'
              )}
            </button>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-10 sm:-top-12 right-0 text-white hover:text-[#ff6b6b] transition-colors z-10"
              aria-label="Close modal"
            >
              <FaTimes className="text-2xl sm:text-3xl" />
            </button>

            {/* Video Container */}
            <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.video_id}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1&enablejsapi=1`}
                  title={selectedVideo.name}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
              <div className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-(--text-primary) mb-2">
                  {selectedVideo.name}
                </h2>
                {selectedVideo.channel_title && (
                  <p className="text-slate-400 mb-4 text-sm">{selectedVideo.channel_title}</p>
                )}
                {selectedVideo.description && (
                  <p className="text-slate-300 text-sm line-clamp-3">
                    {selectedVideo.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Videos

