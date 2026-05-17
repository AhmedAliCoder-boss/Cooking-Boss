import React from 'react'
import { Heart } from 'lucide-react'
import { useFavorites } from '../hooks/useFavorites'

const FavoriteButton = ({ recipe, size = 24, className = '' }) => {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(recipe.idMeal)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(recipe)
      }}
      className={`transition-all duration-300 hover:scale-110 ${className}`}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        size={size}
        className={`transition-colors duration-300 ${
          favorite 
            ? 'text-[#ff6b6b] fill-[#ff6b6b]' 
            : 'text-white/70 hover:text-[#ff6b6b]'
        }`}
        fill={favorite ? '#ff6b6b' : 'none'}
      />
    </button>
  )
}

export default FavoriteButton

