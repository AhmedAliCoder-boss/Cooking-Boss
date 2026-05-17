import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchVideos,
  fetchFeed,
  clearVideos,
} from '../store/slices/videosSlice'

export const useVideos = () => {
  const dispatch = useDispatch()
  const { items, feed, loading, error } = useSelector((state) => state.videos)

  const searchVideos = useCallback(
    (query) => {
      dispatch(fetchVideos(query))
    },
    [dispatch]
  )

  const getFeed = useCallback(() => {
    dispatch(fetchFeed())
  }, [dispatch])

  const clearVideoResults = useCallback(() => {
    dispatch(clearVideos())
  }, [dispatch])

  return {
    videos: items,
    feed,
    loading,
    error,
    searchVideos,
    getFeed,
    clearVideoResults,
  }
}

export default useVideos

