import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { spoonacularApi } from '../../services/spoonacularApi'
import { mealDBApi } from '../../services/mealDBApi'

export const smartSearch = createAsyncThunk(
  'search/smartSearch',
  async (query, { rejectWithValue }) => {
    try {
      const [spoonacularResults, mealDBResults] = await Promise.all([
        spoonacularApi.searchRecipes(query),
        mealDBApi.searchMeals(query),
      ])
      return {
        spoonacular: spoonacularResults,
        mealDB: mealDBResults,
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const searchByIngredients = createAsyncThunk(
  'search/searchByIngredients',
  async (ingredients, { rejectWithValue }) => {
    try {
      const response = await spoonacularApi.searchByIngredients(ingredients)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: {
      spoonacular: [],
      mealDB: [],
    },
    loading: false,
    error: null,
    searchHistory: [],
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload
    },
    clearResults: (state) => {
      state.results = { spoonacular: [], mealDB: [] }
    },
    addToHistory: (state, action) => {
      if (!state.searchHistory.includes(action.payload)) {
        state.searchHistory.unshift(action.payload)
        if (state.searchHistory.length > 10) {
          state.searchHistory.pop()
        }
      }
    },
    clearHistory: (state) => {
      state.searchHistory = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(smartSearch.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(smartSearch.fulfilled, (state, action) => {
        state.loading = false
        state.results = action.payload
      })
      .addCase(smartSearch.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setQuery, clearResults, addToHistory, clearHistory } = searchSlice.actions
export default searchSlice.reducer

