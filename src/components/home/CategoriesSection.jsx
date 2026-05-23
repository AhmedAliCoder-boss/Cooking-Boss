import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { getSingleCoverPhoto } from '../../services/unsplashApi'

const categories = [
  {
    title: 'Pasta',
    image: 'https://www.themealdb.com/images/category/pasta.png',
    description: 'Silky sauces and comforting Italian favorites',
    id: 'pasta',
  },
  {
    title: 'Pizza',
    image: 'https://images.rawpixel.com/image_png_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsb2ZmaWNlMl9pbWFnZV9vZl9hX2NoZWVzZV9waXp6YV93aXRoX29uZV9zbGljZV9iZWluZ19wdV9jOWU5NTEwZi1hNzJjLTRiNTItYWRjZC1kNmRlYTU5OTU0YTAtbTNwajF4ZHkucG5n.png',
    description: 'Crisp crusts, gourmet toppings, and artisan flavors',
    id: 'pizza',
  },
  {
    title: 'Chicken',
    image: 'https://www.themealdb.com/images/category/chicken.png',
    description: 'Premium poultry dishes built for every appetite',
    id: 'chicken',
  },
  {
    title: 'Beef',
    image: 'https://www.themealdb.com/images/category/beef.png',
    description: 'Rich, bold recipes for steak lovers and comfort food fans',
    id: 'beef',
  },
  {
    title: 'Seafood',
    image: 'https://www.themealdb.com/images/category/seafood.png',
    description: 'Ocean-fresh creations with stunning flavor profiles',
    id: 'seafood',
  },
  {
    title: 'Dessert',
    image: 'https://www.themealdb.com/images/category/dessert.png',
    description: 'Decadent sweets and indulgent finales for every meal',
    id: 'dessert',
  },
]

const CategoriesSection = () => {
  const [coverById, setCoverById] = useState({})

  useEffect(() => {
    let cancelled = false
    Promise.all(
      categories.map(async (c) => {
        const photo = await getSingleCoverPhoto(`${c.title} food recipe`)
        return [c.id, photo]
      })
    ).then((pairs) => {
      if (!cancelled) setCoverById(Object.fromEntries(pairs))
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="categories" className="categories-section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-primary-accent mb-3">Curated Collections</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Popular Categories</h2>
            <p className="mt-4 text-category-subtitle text-base md:text-lg">Discover premium recipe collections designed to inspire your next kitchen masterpiece.</p>
          </div>
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 rounded-full border border-primary-accent/20 bg-card/80 px-5 py-3 text-sm font-semibold text-primary-accent shadow-card transition hover:bg-card/95 hover:text-primary"
          >
            View All <FaArrowRight className="text-lg" />
          </Link>
        </div>

        <div className="grid gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {categories.map((category, index) => {
            const cover = coverById[category.id]
            const imgSrc = cover?.thumbUrl || cover?.heroUrl || category.image
            return (
            <Link
              key={category.id}
              to={`/recipes?category=${category.id}`}
              className="category-card group relative overflow-hidden rounded-[2rem] border p-6 text-center transition duration-300 hover:-translate-y-1"
            >
              <div className="pointer-events-none absolute inset-x-6 -top-8 h-24 rounded-full accent-glow opacity-80" />
              {index < 3 && (
                <span className="absolute right-5 top-5 rounded-full bg-orange-500 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white shadow-lg">
                  Top
                </span>
              )}
              <img
                src={imgSrc}
                alt={cover?.alt || category.title}
                className="mx-auto h-24 w-24 rounded-2xl object-cover drop-shadow-card transition-transform duration-300 group-hover:scale-110"
              />
              <h3 className="mt-6 text-lg font-semibold text-inherit">{category.title}</h3>
              <p className="mt-2 text-sm category-description">{category.description}</p>
            </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CategoriesSection

