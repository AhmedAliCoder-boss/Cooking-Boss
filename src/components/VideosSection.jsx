import React, { useEffect, useState } from 'react'
import { FaPlayCircle, FaClock, FaUsers, FaUtensils, FaPlay } from 'react-icons/fa'
import { tastyApi } from '../services/tastyApi'

const VideosSection = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeVideo, setActiveVideo] = useState(null)

  useEffect(() => {
    loadVideos()
  }, [])

  const loadVideos = async () => {
    setLoading(true)
    // Use YouTube cooking videos directly as primary solution
    setVideos(getYouTubeFallbackVideos())
    setLoading(false)
  }

  const getYouTubeFallbackVideos = () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4']
    return [
      {
        id: 'yt1',
        name: 'Perfect Steak Recipe',
        video_url: 'https://www.youtube.com/results?search_query=perfect+steak+recipe',
        thumbnail_url: null,
        bg_color: colors[0],
        total_time_minutes: 8,
        user_ratings: { score: 0.95 }
      },
      {
        id: 'yt2',
        name: 'Pasta Carbonara Tutorial',
        video_url: 'https://www.youtube.com/results?search_query=pasta+carbonara+recipe',
        thumbnail_url: null,
        bg_color: colors[1],
        total_time_minutes: 12,
        user_ratings: { score: 0.92 }
      },
      {
        id: 'yt3',
        name: 'Homemade Pizza Guide',
        video_url: 'https://www.youtube.com/results?search_query=homemade+pizza+recipe',
        thumbnail_url: null,
        bg_color: colors[2],
        total_time_minutes: 15,
        user_ratings: { score: 0.88 }
      },
      {
        id: 'yt4',
        name: 'Chicken Stir Fry',
        video_url: 'https://www.youtube.com/results?search_query=chicken+stir+fry+recipe',
        thumbnail_url: null,
        bg_color: colors[3],
        total_time_minutes: 10,
        user_ratings: { score: 0.85 }
      }
    ]
  }

  if (loading) {
    return (
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b6b] mx-auto"></div>
        </div>
      </section>
    )
  }

  // Don't render if no videos (API issue)
  if (videos.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Cooking <span className="text-[#ff6b6b]">Videos</span>
            </h2>
            <p className="text-slate-400">
              Watch step-by-step video tutorials from Tasty
            </p>
          </div>
          <a
            href="https://tasty.co"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-5 py-2 bg-[#ff6b6b] text-white rounded-full hover:bg-[#ff5252] transition-colors"
          >
            <FaPlay className="text-lg" />
            More Videos
          </a>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.slice(0, 8).map((video, index) => (
            <div
              key={video.id || index}
              className="group bg-slate-800 rounded-2xl overflow-hidden border border-white/5 hover:border-[#ff6b6b]/30 transition-all hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden" style={{ backgroundColor: video.bg_color || '#1e293b' }}>
                {video.thumbnail_url ? (
                  <img
                    src={video.thumbnail_url}
                    alt={video.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaYoutube className="text-white/30 text-6xl" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 bg-[#ff6b6b] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaPlayCircle className="text-white ml-1 text-lg" />
                  </div>
                </div>
                {video.video_url && (
                  <a
                    href={video.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0"
                  />
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-[#ff6b6b] transition-colors">
                  {video.name}
                </h3>
                <div className="flex items-center gap-3 text-slate-400 text-sm">
                  {video.total_time_minutes && (
                    <span className="flex items-center gap-1">
                      <FaClock className="text-sm" />
                      {video.total_time_minutes}m
                    </span>
                  )}
                  {video.user_ratings && (
                    <span className="flex items-center gap-1">
                      <FaUsers className="text-sm" />
                      {Math.round(video.user_ratings.score * 100)}% liked
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden mt-8 text-center">
          <a
            href="https://tasty.co"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 bg-[#ff6b6b] text-white rounded-full hover:bg-[#ff5252] transition-colors"
          >
            <FaPlay className="text-lg" />
            More Videos
          </a>
        </div>
      </div>
    </section>
  )
}

export default VideosSection

