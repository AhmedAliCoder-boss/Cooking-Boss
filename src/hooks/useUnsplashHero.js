import { useEffect, useState } from 'react'
import { searchRecipePhotos } from '../services/unsplashApi'

/**
 * Single hero image for a recipe detail page.
 * @param {{ strMeal?: string; strCategory?: string; idMeal?: string } | null} recipe
 */
export function useUnsplashHero(recipe) {
  const [photo, setPhoto] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!recipe?.strMeal) {
      setPhoto(null)
      return
    }
    let cancelled = false
    const q = `${recipe.strMeal} ${recipe.strCategory || 'food'} dish`
    setLoading(true)
    searchRecipePhotos(q, { perPage: 8, orientation: 'landscape' })
      .then((results) => {
        if (cancelled || !results.length) return
        const idx = recipe.idMeal ? parseInt(recipe.idMeal, 10) % results.length : 0
        setPhoto(results[Number.isFinite(idx) ? idx : 0])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [recipe?.idMeal, recipe?.strMeal, recipe?.strCategory])

  return { photo, loading }
}
