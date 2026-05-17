import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { mealDBApi } from '../../services/mealDBApi'

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (_, { rejectWithValue }) => {
    try {
      return await mealDBApi.getAllMealsAggregated()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchRecipeById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await mealDBApi.getMealById(id)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchRecipesByCategory = createAsyncThunk(
  'recipes/fetchRecipesByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await mealDBApi.getMealsByCategory(category)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    items: [],
    currentRecipe: null,
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentRecipe: (state) => {
      state.currentRecipe = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.currentRecipe = action.payload
      })
      .addCase(fetchRecipesByCategory.fulfilled, (state, action) => {
        state.items = action.payload
      })
  },
})

export const { clearCurrentRecipe, clearError } = recipesSlice.actions
export default recipesSlice.reducer

