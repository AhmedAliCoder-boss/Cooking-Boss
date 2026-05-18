import React, { useState } from 'react'
import { Share, Link as LinkIcon, Check } from 'lucide-react'
import { toast } from './ToastProvider'

// Social media icons as SVG components
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

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
        <LinkIcon size={16} />
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
              {copied ? <Check size={18} className="text-green-500" /> : <LinkIcon size={18} />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button
              onClick={handleShareTwitter}
              className="w-full flex items-center gap-3 px-4 py-3 text-(--text-primary) hover:bg-white/5 transition-colors"
            >
              <span className="text-sky-400"><TwitterIcon /></span>
              Twitter
            </button>
            <button
              onClick={handleShareFacebook}
              className="w-full flex items-center gap-3 px-4 py-3 text-(--text-primary) hover:bg-white/5 transition-colors"
            >
              <span className="text-blue-500"><FacebookIcon /></span>
              Facebook
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ShareButton

