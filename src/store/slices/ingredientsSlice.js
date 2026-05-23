import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiNinjasApi } from '../../services/apiNinjasApi'
import { spoonacularApi } from '../../services/spoonacularApi'

export const searchIngredients = createAsyncThunk(
  'ingredients/searchIngredients',
  async (query, { rejectWithValue }) => {
    try {
      const response = await apiNinjasApi.searchIngredients(query)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const getIngredientInfo = createAsyncThunk(
  'ingredients/getIngredientInfo',
  async (id, { rejectWithValue }) => {
    try {
      const response = await spoonacularApi.getIngredientInfo(id)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const getRecipesByIngredient = createAsyncThunk(
  'ingredients/getRecipesByIngredient',
  async (ingredient, { rejectWithValue }) => {
    try {
      const response = await apiNinjasApi.getRecipesByIngredient(ingredient)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    items: [],
    currentIngredient: null,
    recipesByIngredient: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentIngredient: (state) => {
      state.currentIngredient = null
    },
    clearRecipesByIngredient: (state) => {
      state.recipesByIngredient = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchIngredients.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchIngredients.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(searchIngredients.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getIngredientInfo.fulfilled, (state, action) => {
        state.currentIngredient = action.payload
      })
      .addCase(getRecipesByIngredient.fulfilled, (state, action) => {
        state.recipesByIngredient = action.payload
      })
  },
})

export const { clearCurrentIngredient, clearRecipesByIngredient } = ingredientsSlice.actions
export default ingredientsSlice.reducer

