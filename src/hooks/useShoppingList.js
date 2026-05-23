import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { toast } from '../components/ToastProvider'

export const useShoppingList = () => {
  const [shoppingList, setShoppingList] = useLocalStorage('cooking-boss-shopping', [])

  const addToList = useCallback(
    (item) => {
      setShoppingList((prev) => {
        if (prev.find((i) => i.ingredient === item.ingredient && i.recipeId === item.recipeId)) {
          return prev
        }
        toast.success(`Added ${item.ingredient} to shopping list`)
        return [...prev, { ...item, checked: false, id: Date.now() }]
      })
    },
    [setShoppingList]
  )

  const removeFromList = useCallback(
    (id) => {
      setShoppingList((prev) => prev.filter((i) => i.id !== id))
      toast.success('Item removed')
    },
    [setShoppingList]
  )

  const toggleChecked = useCallback(
    (id) => {
      setShoppingList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
      )
    },
    [setShoppingList]
  )

  const addMultipleItems = useCallback(
    (items) => {
      setShoppingList((prev) => {
        const newItems = items.filter(
          (newItem) => !prev.find((existing) => existing.ingredient === newItem.ingredient)
        )
        if (newItems.length > 0) {
          toast.success(`Added ${newItems.length} items to shopping list`)
          return [...prev, ...newItems.map((item) => ({ ...item, checked: false, id: Date.now() + Math.random() }))]
        }
        return prev
      })
    },
    [setShoppingList]
  )

  const clearList = useCallback(() => {
    setShoppingList([])
    toast.success('Shopping list cleared')
  }, [setShoppingList])

  const clearChecked = useCallback(() => {
    setShoppingList((prev) => {
      const remaining = prev.filter((item) => !item.checked)
      toast.success('Checked items removed')
      return remaining
    })
  }, [setShoppingList])

  return {
    shoppingList,
    addToList,
    removeFromList,
    toggleChecked,
    addMultipleItems,
    clearList,
    clearChecked,
    totalItems: shoppingList.length,
    checkedItems: shoppingList.filter((i) => i.checked).length,
  }
}

export default useShoppingList

