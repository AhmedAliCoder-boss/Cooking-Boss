import React from 'react'
import { FaTimes, FaTrashAlt, FaCheck, FaShoppingCart, FaExternalLinkAlt } from 'react-icons/fa'
import { getMycartSearchUrl } from '../utils/mycart'
import { useShoppingList } from '../hooks/useShoppingList'

const ShoppingListPanel = ({ isOpen, onClose }) => {
  const { 
    shoppingList, 
    toggleChecked, 
    removeFromList, 
    clearList, 
    clearChecked,
    totalItems,
    checkedItems 
  } = useShoppingList()

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-[1001] backdrop-blur-sm print:hidden"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-slate-900 z-[1002] shadow-2xl transform transition-transform duration-300 ease-out print:hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <FaShoppingCart className="text-[#ff6b6b] text-2xl" />
              <div>
                <h2 className="text-xl font-bold text-white">Shopping List</h2>
                <p className="text-slate-400 text-sm">
                  {checkedItems}/{totalItems} items checked
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              <FaTimes className="text-2xl" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6">
            {shoppingList.length === 0 ? (
              <div className="text-center py-12">
                <FaShoppingCart className="mx-auto text-slate-600 mb-4 text-6xl" />
                <p className="text-slate-400">Your shopping list is empty</p>
                <p className="text-slate-500 text-sm mt-2">
                  Add ingredients from recipe pages
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {shoppingList.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                      item.checked 
                        ? 'bg-white/5 border-white/5' 
                        : 'bg-white/10 border-white/10'
                    }`}
                  >
                    <button
                      onClick={() => toggleChecked(item.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        item.checked
                          ? 'bg-[#ff6b6b] border-[#ff6b6b]'
                          : 'border-slate-400 hover:border-[#ff6b6b]'
                      }`}
                    >
                      {item.checked && <FaCheck className="text-white text-sm" />}
                    </button>
                    <div className="flex-1">
                      <p className={`font-medium ${item.checked ? 'text-slate-500 line-through' : 'text-(--text-primary)'}`}>
                        {item.ingredient}
                      </p>
                      <p className="text-slate-400 text-sm">
                        {item.measure}
                      </p>
                    </div>
                    <a
                      href={getMycartSearchUrl(item.ingredient)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-green-400 hover:text-green-300 transition-colors"
                      title="Order from mycart.pk"
                    >
                      <FaExternalLinkAlt className="text-lg" />
                    </a>
                    <button
                      onClick={() => removeFromList(item.id)}
                      className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <FaTrashAlt className="text-lg" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {shoppingList.length > 0 && (
            <div className="p-6 border-t border-white/10 space-y-3">
              {(() => {
                const uncheckedItems = shoppingList.filter((i) => !i.checked)
                const combinedQuery = uncheckedItems.map((i) => i.ingredient).join(' ')
                return uncheckedItems.length > 0 ? (
                  <a
                    href={getMycartSearchUrl(combinedQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-green-500/10 text-green-400 rounded-xl hover:bg-green-500/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaExternalLinkAlt className="text-lg" />
                    Order {uncheckedItems.length} item{uncheckedItems.length !== 1 ? 's' : ''} from mycart.pk
                  </a>
                ) : null
              })()}
              <button
                onClick={clearChecked}
                disabled={checkedItems === 0}
                className="w-full py-3 bg-white/5 text-(--text-primary) rounded-xl hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear Checked Items ({checkedItems})
              </button>
              <button
                onClick={clearList}
                className="w-full py-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors"
              >
                Clear All Items
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ShoppingListPanel

