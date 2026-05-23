import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tastyApi } from '../../services/tastyApi'

export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos',
  async (query, { rejectWithValue }) => {
    try {
      const response = await tastyApi.searchVideos(query)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchFeed = createAsyncThunk(
  'videos/fetchFeed',
  async (_, { rejectWithValue }) => {
    try {
      const response = await tastyApi.getFeed()
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const videosSlice = createSlice({
  name: 'videos',
  initialState: {
    items: [],
    feed: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearVideos: (state) => {
      state.items = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.feed = action.payload
      })
  },
})

export const { clearVideos } = videosSlice.actions
export default videosSlice.reducer

