import React, { useState } from 'react'
import { FaShareAlt, FaLink, FaCheck, FaTwitter, FaFacebook } from 'react-icons/fa'
import { toast } from './ToastProvider'

const ShareButton = ({ recipe, size = 20 }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/recipe/${recipe.idMeal}`
    : ''

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success('Link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy link')
    }
    setShowMenu(false)
  }

  const handleShareTwitter = () => {
    const text = `Check out this delicious recipe: ${recipe.strMeal}`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=600,height=400')
    setShowMenu(false)
  }

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=600,height=400')
    setShowMenu(false)
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.strMeal,
          text: `Check out this recipe for ${recipe.strMeal}!`,
          url: shareUrl,
        })
        toast.success('Shared successfully!')
      } catch (err) {
        // User cancelled
      }
    } else {
      setShowMenu(!showMenu)
    }
    setShowMenu(false)
  }

  return (
    <div className="relative">
      <button
        onClick={navigator.share ? handleNativeShare : () => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 text-(--text-primary) rounded-full hover:bg-white/20 transition-colors"
      >
        <FaLink className="text-base" />
        <span className="hidden sm:inline">Share</span>
      </button>

      {showMenu && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-3 px-4 py-3 text-(--text-primary) hover:bg-white/5 transition-colors"
            >
              {copied ? <FaCheck className="text-green-500 text-lg" /> : <FaLink className="text-lg" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button
              onClick={handleShareTwitter}
              className="w-full flex items-center gap-3 px-4 py-3 text-(--text-primary) hover:bg-white/5 transition-colors"
            >
              <span className="text-sky-400"><FaTwitter className="text-lg" /></span>
              Twitter
            </button>
            <button
              onClick={handleShareFacebook}
              className="w-full flex items-center gap-3 px-4 py-3 text-(--text-primary) hover:bg-white/5 transition-colors"
            >
              <span className="text-blue-500"><FaFacebook className="text-lg" /></span>
              Facebook
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ShareButton

