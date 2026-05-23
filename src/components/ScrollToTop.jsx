import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FaArrowUp } from 'react-icons/fa'

const ScrollToTop = () => {
  const { pathname, search } = useLocation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, search])

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 right-6 z-40 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1 bg-[var(--primary-color)] text-[var(--bg-primary)] shadow-[0_10px_30px_rgba(255,107,107,0.2)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <FaArrowUp className="text-2xl" />
    </button>
  )
}

export default ScrollToTop

