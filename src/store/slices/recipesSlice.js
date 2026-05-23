import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { mealDBApi } from '../../services/mealDBApi'
import { spoonacularApi } from '../../services/spoonacularApi'

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

export const fetchSpoonacularRecipeById = createAsyncThunk(
  'recipes/fetchSpoonacularRecipeById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await spoonacularApi.getRecipeDetails(id)
      // Convert Spoonacular format to match TheMealDB format
      return {
        idMeal: response.id.toString(),
        strMeal: response.title,
        strMealThumb: response.image,
        strCategory: response.dishTypes?.[0] || 'Unknown',
        strArea: 'Spoonacular',
        strInstructions: response.instructions,
        // Map extended ingredients to TheMealDB format
        ...mapSpoonacularToMealDB(response),
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const mapSpoonacularToMealDB = (spoonacularRecipe) => {
  const mapped = {}
  spoonacularRecipe.extendedIngredients?.forEach((ing, index) => {
    const i = index + 1
    mapped[`strIngredient${i}`] = ing.name
    mapped[`strMeasure${i}`] = ing.amount ? `${ing.amount} ${ing.unit}` : ''
  })
  return mapped
}

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
      .addCase(fetchSpoonacularRecipeById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSpoonacularRecipeById.fulfilled, (state, action) => {
        state.loading = false
        state.currentRecipe = action.payload
      })
      .addCase(fetchSpoonacularRecipeById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearCurrentRecipe, clearError } = recipesSlice.actions
export default recipesSlice.reducer

