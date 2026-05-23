import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  searchIngredients,
  getIngredientInfo,
  getRecipesByIngredient,
  clearCurrentIngredient,
  clearRecipesByIngredient,
} from '../store/slices/ingredientsSlice'

export const useIngredients = () => {
  const dispatch = useDispatch()
  const { items, currentIngredient, recipesByIngredient, loading, error } =
    useSelector((state) => state.ingredients)

  const findIngredients = useCallback(
    (query) => {
      dispatch(searchIngredients(query))
    },
    [dispatch]
  )

  const getIngredientDetails = useCallback(
    (id) => {
      dispatch(getIngredientInfo(id))
    },
    [dispatch]
  )

  const findRecipesByIngredient = useCallback(
    (ingredient) => {
      dispatch(getRecipesByIngredient(ingredient))
    },
    [dispatch]
  )

  const clearIngredient = useCallback(() => {
    dispatch(clearCurrentIngredient())
  }, [dispatch])

  const clearRecipes = useCallback(() => {
    dispatch(clearRecipesByIngredient())
  }, [dispatch])

  return {
    ingredients: items,
    currentIngredient,
    recipesByIngredient,
    loading,
    error,
    findIngredients,
    getIngredientDetails,
    findRecipesByIngredient,
    clearIngredient,
    clearRecipes,
  }
}

export default useIngredients

