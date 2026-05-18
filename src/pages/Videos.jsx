import React, { useEffect, useState } from 'react'
import { PlayCircle, Clock, Users, ChefHat } from 'lucide-react'
import { tastyApi } from '../services/tastyApi'

const Videos = () => {
  useEffect(() => {
    document.title = 'Cooking Videos - Cooking Boss'
  }, [])
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadVideos()
  }, [])

  const loadVideos = async () => {
    try {
      setLoading(true)
      // Try feed first (more reliable), fallback to search
      let data = await tastyApi.getFeed(12)
      
      // If feed is empty, try searching for popular recipes with videos
      if (!data || data.length === 0) {
        data = await tastyApi.searchVideos('popular', 0)
      }
      
      // Filter only items that have videos
      const videosWithContent = Array.isArray(data) 
        ? data.filter(item => item.video_url || item.original_video_url || item.thumbnail_url)
        : []
      
      setVideos(videosWithContent.slice(0, 12))
    } catch (error) {
      // Silently fail - API may have subscription issues
      setVideos([])
    } finally {
      setLoading(false)
    }
  }

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
          <Play size={64} className="mx-auto text-(--text-secondary) mb-4" />
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
            Watch step-by-step video tutorials from Tasty
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <div
              key={video.id || index}
              className="group bg-slate-800 rounded-2xl overflow-hidden border border-white/5 hover:border-[#ff6b6b]/30 transition-all hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail_url || video.original_video_url}
                  alt={video.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 bg-[#ff6b6b] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PlayCircle size={20} className="text-white ml-1" fill="white" />
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
                <h3 className="text-(--text-primary) font-semibold mb-2 line-clamp-2 group-hover:text-[#ff6b6b] transition-colors">
                  {video.name}
                </h3>
                <div className="flex items-center gap-3 text-slate-400 text-sm">
                  {video.total_time_minutes && (
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {video.total_time_minutes}m
                    </span>
                  )}
                  {video.user_ratings && (
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {Math.round(video.user_ratings.score * 100)}% liked
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Videos

