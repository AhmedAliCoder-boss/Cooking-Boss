import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { toast } from '../components/ToastProvider'

export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage('cooking-boss-favorites', [])

  const addToFavorites = useCallback(
    (recipe) => {
      setFavorites((prev) => {
        if (prev.find((f) => f.idMeal === recipe.idMeal)) {
          toast.info('Recipe already in favorites!')
          return prev
        }
        toast.success('Added to favorites!')
        return [...prev, recipe]
      })
    },
    [setFavorites]
  )

  const removeFromFavorites = useCallback(
    (id) => {
      setFavorites((prev) => {
        const filtered = prev.filter((f) => f.idMeal !== id)
        toast.success('Removed from favorites')
        return filtered
      })
    },
    [setFavorites]
  )

  const isFavorite = useCallback(
    (id) => {
      return favorites.some((f) => f.idMeal === id)
    },
    [favorites]
  )

  const toggleFavorite = useCallback(
    (recipe) => {
      if (isFavorite(recipe.idMeal)) {
        removeFromFavorites(recipe.idMeal)
      } else {
        addToFavorites(recipe)
      }
    },
    [isFavorite, addToFavorites, removeFromFavorites]
  )

  const clearFavorites = useCallback(() => {
    setFavorites([])
    toast.success('Favorites cleared')
  }, [setFavorites])

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
    favoritesCount: favorites.length,
  }
}

export default useFavorites

