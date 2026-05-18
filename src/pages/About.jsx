import React, { useEffect } from 'react'
import { ChefHat, Heart, Users, Sparkles, Mail, ExternalLink, Link as LinkIcon } from 'lucide-react'

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.38-.135-.345-.72-1.38-1.23-1.665-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const About = () => {
  useEffect(() => {
    document.title = 'About Us - Cooking Boss'
  }, [])
  const features = [
    {
      icon: ChefHat,
      title: 'Multiple Recipe Sources',
      description: 'Access recipes from TheMealDB, Spoonacular, and API Ninjas - all in one place.',
    },
    {
      icon: Heart,
      title: 'Save Your Favorites',
      description: 'Bookmark recipes you love and build your personal cookbook.',
    },
    {
      icon: Sparkles,
      title: 'Smart Search',
      description: 'Find recipes by ingredients you have with our "What\'s in your fridge?" feature.',
    },
    {
      icon: Users,
      title: 'Nutrition Analysis',
      description: 'Get detailed nutrition information powered by Edamam API.',
    },
  ]

  const apis = [
    { name: 'TheMealDB', purpose: 'Recipe Database', free: true },
    { name: 'Spoonacular', purpose: 'Smart Search & Ingredients', free: '150 req/day' },
    { name: 'Edamam', purpose: 'Nutrition Analysis', free: '10k req/month' },
    { name: 'Tasty API', purpose: 'Cooking Videos', free: 'RapidAPI' },
    { name: 'API Ninjas', purpose: 'Ingredient Recipes', free: '10k req/month' },
  ]

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b6b]/10 rounded-full mb-6">
            <ChefHat className="text-[#ff6b6b]" size={20} />
            <span className="text-[#ff6b6b] font-medium">About Cooking Boss</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-(--text-primary) mb-6">
            Your Ultimate
            <span className="text-[#ff6b6b]"> Cooking</span> Companion
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Discover, save, and share recipes from multiple sources. 
            Powered by 5 different recipe APIs for the best cooking experience.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-(--text-primary) text-center mb-10">
            What Makes Us <span className="text-[#ff6b6b]">Special</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#ff6b6b]/30 transition-all"
              >
                <div className="w-12 h-12 bg-[#ff6b6b]/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="text-[#ff6b6b]" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-(--text-primary) mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APIs */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-(--text-primary) text-center mb-10">
            Powered By <span className="text-[#ff6b6b]">5 APIs</span>
          </h2>
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            {apis.map((api, index) => (
              <div
                key={api.name}
                className={`flex items-center justify-between p-4 ${
                  index !== apis.length - 1 ? 'border-b border-white/10' : ''
                }`}
              >
                <div>
                  <h3 className="text-(--text-primary) font-semibold">{api.name}</h3>
                  <p className="text-slate-400 text-sm">{api.purpose}</p>
                </div>
                <span className="px-3 py-1 bg-green-500/10 text-green-400 text-sm rounded-full">
                  {api.free === true ? 'Free' : api.free}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Built With Modern Tech</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['React 19', 'Redux Toolkit', 'Tailwind CSS', 'Vite', 'Axios', 'Lucide Icons'].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white/5 text-slate-300 rounded-full border border-white/10"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-linear-to-r from-[#ff6b6b]/20 to-[#ff8e53]/20 rounded-3xl p-8 md:p-12 border border-[#ff6b6b]/20">
            <h2 className="text-3xl font-bold text-(--text-primary) mb-4">Start Cooking Today</h2>
            <p className="text-slate-400 mb-6">
              Explore thousands of recipes and find your next favorite meal.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/recipes"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff6b6b] text-white rounded-full hover:bg-[#ff5252] transition-colors"
              >
                Browse Recipes
                <ExternalLink size={18} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-(--text-primary) rounded-full hover:bg-white/20 transition-colors"
              >
                <GithubIcon />
                View on GitHub
              </a>
            </div>
          </div>
          <p className="text-slate-500 mt-8">
            Made with <Heart size={14} className="inline text-[#ff6b6b] fill-[#ff6b6b]" /> by Cooking Boss Team
          </p>
        </div>
      </section>
    </main>
  )
}

export default About

