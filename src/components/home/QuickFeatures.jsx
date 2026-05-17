import React from 'react'
import { ArrowRight, Play, UtensilsCrossed } from 'lucide-react'
import { Link } from 'react-router-dom'

const QuickFeatures = () => {
  return (
    <section className="home-quick-band py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <Link
            to="/fridge-finder"
            className="recipe-surface-card group flex h-full bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-[#ff6b6b]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-start gap-4 w-full">
              <div className="w-14 h-14 bg-[#ff6b6b]/10 rounded-xl flex items-center justify-center shrink-0">
                <UtensilsCrossed className="text-[#ff6b6b]" size={28} />
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-(--text-primary) mb-2 group-hover:text-[#ff6b6b] transition-colors">
                  Fridge Finder
                </h3>
                <p className="text-slate-400 mb-4">
                  Enter ingredients you have and find recipes you can make
                </p>
                <div className="flex items-center gap-2 text-[#ff6b6b] font-medium">
                  Try it <ArrowRight size={18} />
                </div>
              </div>
            </div>
          </Link>

          <Link
            to="/videos"
            className="recipe-surface-card group flex h-full bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-[#ff6b6b]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-start gap-4 w-full">
              <div className="w-14 h-14 bg-[#ff6b6b]/10 rounded-xl flex items-center justify-center shrink-0">
                <Play className="text-[#ff6b6b]" size={28} />
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-(--text-primary) mb-2 group-hover:text-[#ff6b6b] transition-colors">
                  Cooking Videos
                </h3>
                <p className="text-slate-400 mb-4">
                  Watch step-by-step video tutorials from professional chefs
                </p>
                <div className="flex items-center gap-2 text-[#ff6b6b] font-medium">
                  Watch Now <ArrowRight size={18} />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default QuickFeatures

