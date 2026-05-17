import React from 'react'

/** Required-style credit for Unsplash API use; visible on screen and when printing to PDF. */
export default function UnsplashAttribution({ photo, className = '' }) {
  if (!photo?.photographerUrl || !photo?.unsplashPhotoUrl) return null
  return (
    <p className={`text-xs text-slate-400 print:text-slate-600 ${className}`}>
      Photo by{' '}
      <a
        href={`${photo.photographerUrl}?utm_source=cookingboss&utm_medium=referral`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#ff6b6b] hover:underline"
      >
        {photo.photographerName}
      </a>
      {' '}on{' '}
      <a
        href={`${photo.unsplashPhotoUrl}?utm_source=cookingboss&utm_medium=referral`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#ff6b6b] hover:underline"
      >
        Unsplash
      </a>
    </p>
  )
}
