import { useState, useEffect, useCallback, useRef } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const storedValueRef = useRef(storedValue)
  useEffect(() => {
    storedValueRef.current = storedValue
  }, [storedValue])

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValueRef.current) : value
        setStoredValue(valueToStore)
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
          window.dispatchEvent(new StorageEvent('storage', { key }))
        }
      } catch (error) {
        console.error(error)
      }
    },
    [key]
  )

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
        window.dispatchEvent(new StorageEvent('storage', { key }))
      }
    } catch (error) {
      console.error(error)
    }
  }, [key, initialValue])

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && typeof window !== 'undefined') {
        try {
          const item = window.localStorage.getItem(key)
          setStoredValue(item ? JSON.parse(item) : initialValue)
        } catch (error) {
          console.error(error)
        }
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}

export default useLocalStorage

