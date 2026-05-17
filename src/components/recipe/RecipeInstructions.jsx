import React from 'react'
import { ChefHat } from 'lucide-react'

const RecipeInstructions = ({ instructions }) => {
  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <h2 className="text-xl font-bold text-(--text-primary) mb-6 flex items-center gap-2">
        <ChefHat className="text-[#ff6b6b]" size={24} />
        Instructions
      </h2>
      <ol className="space-y-4">
        {instructions.map((step, index) => (
          <li key={index} className="flex gap-4">
            <div className="shrink-0 w-8 h-8 bg-[#ff6b6b] rounded-full flex items-center justify-center text-white font-bold">
              {index + 1}
            </div>
            <p className="text-slate-300 flex-1">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default RecipeInstructions

