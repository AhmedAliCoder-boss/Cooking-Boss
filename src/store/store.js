import { configureStore } from '@reduxjs/toolkit'
import recipesReducer from './slices/recipesSlice'
import searchReducer from './slices/searchSlice'
import nutritionReducer from './slices/nutritionSlice'
import videosReducer from './slices/videosSlice'
import ingredientsReducer from './slices/ingredientsSlice'

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    search: searchReducer,
    nutrition: nutritionReducer,
    videos: videosReducer,
    ingredients: ingredientsReducer,
  },
})

export default store

