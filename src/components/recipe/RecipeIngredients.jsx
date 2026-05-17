import React from 'react'
import { ChefHat, Plus, ShoppingCart, ExternalLink } from 'lucide-react'
import { getMycartSearchUrl } from '../../utils/mycart'

const RecipeIngredients = ({ ingredients, checkedIngredients, onToggleCheck, onAddToShoppingList, onAddAllToShoppingList }) => {
  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-(--text-primary) flex items-center gap-2">
          <ChefHat className="text-[#ff6b6b]" size={24} />
          Ingredients
        </h2>
        <button
          onClick={onAddAllToShoppingList}
          className="p-2 text-[#ff6b6b] hover:bg-[#ff6b6b]/10 rounded-full transition-colors"
          title="Add all to shopping list"
        >
          <ShoppingCart size={20} />
        </button>
      </div>
      <ul className="space-y-3">
        {ingredients.map((item, index) => (
          <li
            key={index}
            className={`flex items-start gap-3 group cursor-pointer transition-all ${
              checkedIngredients.has(index) ? 'opacity-50' : ''
            }`}
            onClick={() => onToggleCheck(index)}
          >
            <button
              className={`mt-0.5 shrink-0 transition-colors ${
                checkedIngredients.has(index)
                  ? 'text-green-500'
                  : 'text-[#ff6b6b]'
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                checkedIngredients.has(index)
                  ? 'bg-green-500 border-green-500'
                  : 'border-[#ff6b6b] hover:border-[#ff6b6b]'
              }`}>
                {checkedIngredients.has(index) && (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
            <span className={`flex-1 ${checkedIngredients.has(index) ? 'line-through text-slate-500' : 'text-slate-300'}`}>
              <span className="text-(--text-primary) font-medium">{item.measure}</span>{' '}
              {item.ingredient}
            </span>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
              <a
                href={getMycartSearchUrl(item.ingredient)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 text-green-400 hover:bg-green-400/10 rounded transition-all"
                title="Order from mycart.pk"
              >
                <ExternalLink size={16} />
              </a>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onAddToShoppingList(item.ingredient, item.measure)
                }}
                className="p-1 text-[#ff6b6b] hover:bg-[#ff6b6b]/10 rounded transition-all"
                title="Add to shopping list"
              >
                <Plus size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecipeIngredients

