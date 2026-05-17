import React from 'react'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import '../../css/hero section.css'

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = React.useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/recipes?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Discover Delicious Recipes</h1>
        <p>Find and share amazing cooking ideas for every occasion.</p>
        <form onSubmit={handleSearch} className="hero-search">
          <input
            type="text"
            id="hero-search"
            placeholder="Search for recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="hero-search-btn" aria-label="Search recipes">
            <Search size={16} />
          </button>
        </form>
      </div>
    </section>
  )
}

export default HeroSection

