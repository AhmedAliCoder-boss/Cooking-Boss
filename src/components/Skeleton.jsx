import React from 'react'

export const SkeletonCard = () => (
  <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 animate-pulse">
    <div className="aspect-video bg-slate-800" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-slate-800 rounded w-3/4" />
      <div className="h-4 bg-slate-800 rounded w-1/2" />
    </div>
  </div>
)

export const SkeletonRecipeDetail = () => (
  <div className="min-h-screen bg-slate-950 pt-24 pb-16 animate-pulse">
    <div className="h-96 bg-slate-800" />
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          <div className="h-8 bg-slate-800 rounded" />
          <div className="h-4 bg-slate-800 rounded" />
          <div className="h-4 bg-slate-800 rounded w-3/4" />
        </div>
        <div className="md:col-span-2 space-y-4">
          <div className="h-8 bg-slate-800 rounded" />
          <div className="h-4 bg-slate-800 rounded" />
          <div className="h-4 bg-slate-800 rounded" />
          <div className="h-4 bg-slate-800 rounded w-2/3" />
        </div>
      </div>
    </div>
  </div>
)

export const SkeletonGrid = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
)

export default { SkeletonCard, SkeletonRecipeDetail, SkeletonGrid }

