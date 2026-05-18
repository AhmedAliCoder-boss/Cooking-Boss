import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchRecipes,
  fetchRecipeById,
  fetchRecipesByCategory,
  fetchSpoonacularRecipeById,
  clearCurrentRecipe,
  clearError,
} from '../store/slices/recipesSlice'

export const useRecipes = () => {
  const dispatch = useDispatch()
  const { items, currentRecipe, loading, error } = useSelector((state) => state.recipes)

  const getLatestRecipes = useCallback(() => {
    dispatch(fetchRecipes())
  }, [dispatch])

  const getRecipe = useCallback((id) => {
    dispatch(fetchRecipeById(id))
  }, [dispatch])

  const getByCategory = useCallback((category) => {
    dispatch(fetchRecipesByCategory(category))
  }, [dispatch])

  const getSpoonacularRecipe = useCallback((id) => {
    dispatch(fetchSpoonacularRecipeById(id))
  }, [dispatch])

  const clearRecipe = useCallback(() => {
    dispatch(clearCurrentRecipe())
  }, [dispatch])

  const clearErrorState = useCallback(() => {
    dispatch(clearError())
  }, [dispatch])

  return {
    recipes: items,
    currentRecipe,
    loading,
    error,
    getLatestRecipes,
    getRecipe,
    getSpoonacularRecipe,
    getByCategory,
    clearRecipe,
    clearErrorState,
  }
}

export default useRecipes

