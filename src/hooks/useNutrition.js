import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchNutrition,
  analyzeRecipe,
  clearNutritionData,
} from '../store/slices/nutritionSlice'

export const useNutrition = () => {
  const dispatch = useDispatch()
  const { nutritionData, analyzedRecipe, loading, error } = useSelector(
    (state) => state.nutrition
  )

  const getNutrition = useCallback(
    (ingredients) => {
      dispatch(fetchNutrition(ingredients))
    },
    [dispatch]
  )

  const analyzeRecipeData = useCallback(
    (recipeData) => {
      dispatch(analyzeRecipe(recipeData))
    },
    [dispatch]
  )

  const clearData = useCallback(() => {
    dispatch(clearNutritionData())
  }, [dispatch])

  return {
    nutritionData,
    analyzedRecipe,
    loading,
    error,
    getNutrition,
    analyzeRecipeData,
    clearData,
  }
}

export default useNutrition

