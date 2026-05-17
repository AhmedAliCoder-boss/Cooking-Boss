import React from 'react'
import { Flame, Clock, Users } from 'lucide-react'

const RecipeNutrition = ({ nutritionData, spoonacularData, loading }) => {
  if (loading) {
    return (
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Flame className="text-[#ff6b6b]" size={24} />
          Nutrition (approx.)
        </h2>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-slate-700 rounded w-1/2" />
          <div className="h-4 bg-slate-700 rounded w-3/4" />
          <div className="h-4 bg-slate-700 rounded w-2/3" />
        </div>
      </div>
    )
  }

  if (!nutritionData) {
    return null
  }

  const nutrients = nutritionData.totalNutrients || {}

  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <h2 className="text-xl font-bold text-(--text-primary) mb-6 flex items-center gap-2">
      </h2>
      
      {/* Additional info from Spoonacular */}
      {spoonacularData && (
        <div className="flex gap-4 mb-6 pb-6 border-b border-white/10">
          {spoonacularData.readyInMinutes && (
            <div className="flex items-center gap-2 text-slate-300">
              <Clock size={18} />
              <span>{spoonacularData.readyInMinutes} mins</span>
            </div>
          )}
          {spoonacularData.servings && (
            <div className="flex items-center gap-2 text-slate-300">
              <Users size={18} />
              <span>{spoonacularData.servings} servings</span>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {nutrients.ENERC_KCAL && (
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-[#ff6b6b]">
              {Math.round(nutrients.ENERC_KCAL.quantity)}
            </p>
            <p className="text-slate-400 text-sm">Calories</p>
          </div>
        )}
        {nutrients.PROCNT && (
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-(--text-primary)">
              {Math.round(nutrients.PROCNT.quantity)}g
            </p>
            <p className="text-slate-400 text-sm">Protein</p>
          </div>
        )}
        {nutrients.FAT && (
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-(--text-primary)">
              {Math.round(nutrients.FAT.quantity)}g
            </p>
            <p className="text-slate-400 text-sm">Fat</p>
          </div>
        )}
        {nutrients.CHOCDF && (
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-(--text-primary)">
              {Math.round(nutrients.CHOCDF.quantity)}g
            </p>
            <p className="text-slate-400 text-sm">Carbs</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipeNutrition

