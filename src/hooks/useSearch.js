import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  smartSearch,
  searchByIngredients,
  setQuery,
  clearResults,
  addToHistory,
  clearHistory,
} from '../store/slices/searchSlice'

export const useSearch = () => {
  const dispatch = useDispatch()
  const { query, results, loading, error, searchHistory } = useSelector(
    (state) => state.search
  )

  const search = useCallback(
    (searchQuery) => {
      dispatch(setQuery(searchQuery))
      dispatch(smartSearch(searchQuery))
      dispatch(addToHistory(searchQuery))
    },
    [dispatch]
  )

  const searchByFridge = useCallback(
    (ingredients) => {
      dispatch(searchByIngredients(ingredients))
    },
    [dispatch]
  )

  const clearSearch = useCallback(() => {
    dispatch(clearResults())
  }, [dispatch])

  const clearSearchHistory = useCallback(() => {
    dispatch(clearHistory())
  }, [dispatch])

  return {
    query,
    results,
    loading,
    error,
    searchHistory,
    search,
    searchByFridge,
    clearSearch,
    clearSearchHistory,
  }
}

export default useSearch

