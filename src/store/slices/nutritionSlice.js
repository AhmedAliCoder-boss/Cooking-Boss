import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { edamamApi } from '../../services/edamamApi'

export const fetchNutrition = createAsyncThunk(
  'nutrition/fetchNutrition',
  async (ingredients, { rejectWithValue }) => {
    try {
      const response = await edamamApi.getNutritionData(ingredients)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const analyzeRecipe = createAsyncThunk(
  'nutrition/analyzeRecipe',
  async (recipeData, { rejectWithValue }) => {
    try {
      const response = await edamamApi.analyzeRecipe(recipeData)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const nutritionSlice = createSlice({
  name: 'nutrition',
  initialState: {
    nutritionData: null,
    analyzedRecipe: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearNutritionData: (state) => {
      state.nutritionData = null
      state.analyzedRecipe = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNutrition.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNutrition.fulfilled, (state, action) => {
        state.loading = false
        state.nutritionData = action.payload
      })
      .addCase(fetchNutrition.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(analyzeRecipe.fulfilled, (state, action) => {
        state.analyzedRecipe = action.payload
      })
  },
})

export const { clearNutritionData } = nutritionSlice.actions
export default nutritionSlice.reducer

