import React, { useEffect } from 'react'
import { FaCode, FaRocket, FaDatabase, FaPalette, FaCogs, FaMobileAlt, FaShieldAlt, FaTerminal, FaFolder } from 'react-icons/fa'

const Readme = () => {
  useEffect(() => {
    document.title = 'README - Cooking Boss'
  }, [])

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#ff6b6b]/10 rounded-full mb-4 sm:mb-6">
            <FaCode className="text-[#ff6b6b] text-base sm:text-lg" />
            <span className="text-[#ff6b6b] font-medium text-sm sm:text-base">Technical Documentation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-(--text-primary) mb-4 sm:mb-6">
            Cooking <span className="text-[#ff6b6b]">Boss</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto px-4">
            A modern recipe discovery and management application built with React 19 and Vite.
          </p>
        </div>

        {/* Features */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">Features</h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <FaRocket className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span><strong>Recipe Discovery:</strong> Browse recipes from multiple sources (TheMealDB, Spoonacular, API Ninjas)</span>
              </li>
              <li className="flex items-start gap-3">
                <FaRocket className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span><strong>Smart Search:</strong> Find recipes by ingredients with the "Fridge Finder" feature</span>
              </li>
              <li className="flex items-start gap-3">
                <FaRocket className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span><strong>Favorites System:</strong> Save and manage your favorite recipes</span>
              </li>
              <li className="flex items-start gap-3">
                <FaRocket className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span><strong>Shopping List:</strong> Add ingredients from recipes to your shopping list</span>
              </li>
              <li className="flex items-start gap-3">
                <FaRocket className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span><strong>Cooking Videos:</strong> Watch step-by-step video tutorials from Tasty</span>
              </li>
              <li className="flex items-start gap-3">
                <FaRocket className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span><strong>PWA Support:</strong> Install as a progressive web app for offline access</span>
              </li>
              <li className="flex items-start gap-3">
                <FaRocket className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span><strong>Dark/Light Theme:</strong> Toggle between dark and light modes</span>
              </li>
              <li className="flex items-start gap-3">
                <FaRocket className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span><strong>Responsive Design:</strong> Optimized for mobile, tablet, and desktop</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">Tech Stack</h2>
          
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-semibold text-(--text-primary) mb-4 flex items-center gap-2">
              <FaCode className="text-[#ff6b6b]" />
              Frontend Framework
            </h3>
            <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10">
              <ul className="space-y-2 text-slate-300">
                <li>• <strong>React 19</strong> - Latest React with concurrent features</li>
                <li>• <strong>Vite 7</strong> - Fast build tool and dev server</li>
                <li>• <strong>React Router DOM 7</strong> - Client-side routing</li>
              </ul>
            </div>
          </div>

          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-semibold text-(--text-primary) mb-4 flex items-center gap-2">
              <FaPalette className="text-[#ff6b6b]" />
              Styling
            </h3>
            <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10">
              <ul className="space-y-2 text-slate-300">
                <li>• <strong>Tailwind CSS 4</strong> - Utility-first CSS framework</li>
                <li>• <strong>React Icons</strong> - Icon library (Font Awesome)</li>
              </ul>
            </div>
          </div>

          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-semibold text-(--text-primary) mb-4 flex items-center gap-2">
              <FaCogs className="text-[#ff6b6b]" />
              State Management
            </h3>
            <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10">
              <ul className="space-y-2 text-slate-300">
                <li>• <strong>Redux Toolkit</strong> - State management and data fetching</li>
              </ul>
            </div>
          </div>

          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-semibold text-(--text-primary) mb-4 flex items-center gap-2">
              <FaMobileAlt className="text-[#ff6b6b]" />
              UI Components
            </h3>
            <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10">
              <ul className="space-y-2 text-slate-300">
                <li>• <strong>Sonner</strong> - Beautiful toast notifications</li>
              </ul>
            </div>
          </div>

          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-semibold text-(--text-primary) mb-4 flex items-center gap-2">
              <FaTerminal className="text-[#ff6b6b]" />
              Utilities
            </h3>
            <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10">
              <ul className="space-y-2 text-slate-300">
                <li>• <strong>Axios</strong> - HTTP client for API requests</li>
                <li>• <strong>jsPDF</strong> - PDF generation for recipes</li>
                <li>• <strong>html2canvas</strong> - HTML to canvas conversion</li>
              </ul>
            </div>
          </div>

          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-semibold text-(--text-primary) mb-4 flex items-center gap-2">
              <FaDatabase className="text-[#ff6b6b]" />
              APIs Integrated
            </h3>
            <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10">
              <ul className="space-y-2 text-slate-300">
                <li>• <strong>TheMealDB</strong> - Recipe database</li>
                <li>• <strong>Spoonacular</strong> - Smart search and ingredient analysis</li>
                <li>• <strong>Edamam</strong> - Nutrition information</li>
                <li>• <strong>Tasty API</strong> - Cooking videos</li>
                <li>• <strong>API Ninjas</strong> - Ingredient-based recipes</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-(--text-primary) mb-4 flex items-center gap-2">
              <FaShieldAlt className="text-[#ff6b6b]" />
              PWA
            </h3>
            <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10">
              <ul className="space-y-2 text-slate-300">
                <li>• <strong>vite-plugin-pwa</strong> - Progressive Web App support</li>
                <li>• <strong>Workbox</strong> - Service worker for offline caching</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">Getting Started</h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-slate-300">
                <code>{`# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Project Structure */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">
            <FaFolder className="inline mr-2 text-[#ff6b6b]" />
            Project Structure
          </h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-slate-300">
                <code>{`src/
├── components/     # Reusable UI components
├── context/        # React context providers
├── css/            # Global styles
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── services/       # API service layers
└── utils/          # Utility functions`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Available Scripts */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">Available Scripts</h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <ul className="space-y-3 text-slate-300">
              <li><code className="text-[#ff6b6b]">npm run dev</code> - Start development server with hot reload</li>
              <li><code className="text-[#ff6b6b]">npm run build</code> - Build for production</li>
              <li><code className="text-[#ff6b6b]">npm run preview</code> - Preview production build locally</li>
              <li><code className="text-[#ff6b6b]">npm run lint</code> - Run ESLint</li>
            </ul>
          </div>
        </section>

        {/* License */}
        <section className="mb-12 sm:mb-16">
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-(--text-primary) mb-4">License</h2>
            <p className="text-slate-300">MIT</p>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-8 border-t border-white/10">
          <p className="text-slate-500">
            Technical documentation for developers
          </p>
          <p className="text-slate-600 text-sm mt-2">
            Last updated: May 2026
          </p>
        </div>
      </div>
    </main>
  )
}

export default Readme
