import { useEffect, useState } from 'react'
import { searchRecipePhotos } from '../services/unsplashApi'

/**
 * Fetches a pool of Unsplash photos for a list view (one API call per query change).
 * @param {string} query
 * @param {{ perPage?: number; orientation?: 'landscape' | 'portrait' | 'squarish' }} [options]
 */
export function useUnsplashPool(query, options = {}) {
  const { perPage = 30, orientation } = options
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query?.trim()) {
      setPhotos([])
      return
    }
    let cancelled = false
    setLoading(true)
    searchRecipePhotos(query, { perPage, orientation }).then((results) => {
      if (!cancelled) setPhotos(results)
    }).finally(() => {
      if (!cancelled) setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [query, perPage, orientation])

  return { photos, loading }
}
