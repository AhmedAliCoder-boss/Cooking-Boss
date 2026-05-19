import React, { useEffect } from 'react'
import { FaUtensils, FaHeart, FaUsers, FaStar, FaEnvelope, FaExternalLinkAlt, FaLink, FaGithub } from 'react-icons/fa'

const About = () => {
  useEffect(() => {
    document.title = 'About Us - Cooking Boss'
  }, [])
  const features = [
    {
      icon: FaUtensils,
      title: 'Multiple Recipe Sources',
      description: 'Access recipes from TheMealDB, Spoonacular, and API Ninjas - all in one place.',
    },
    {
      icon: FaHeart,
      title: 'Save Your Favorites',
      description: 'Bookmark recipes you love and build your personal cookbook.',
    },
    {
      icon: FaStar,
      title: 'Smart Search',
      description: 'Find recipes by ingredients you have with our "What\'s in your fridge?" feature.',
    },
    {
      icon: FaUsers,
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
            <FaUtensils className="text-[#ff6b6b] text-lg" />
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
                  <feature.icon className="text-[#ff6b6b] text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-(--text-primary) mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-(--text-primary) text-center mb-10">
            Meet the <span className="text-[#ff6b6b]">Developer</span>
          </h2>
          <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-[#ff6b6b] to-[#ff8e53] rounded-2xl flex items-center justify-center flex-shrink-0">
                <FaUtensils className="text-white text-5xl" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-(--text-primary) mb-2">Ahmed Ali</h3>
                <p className="text-slate-400 mb-3">Full Stack Developer | React Enthusiast</p>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="px-3 py-1 bg-[#ff6b6b]/10 text-[#ff6b6b] text-sm rounded-full">Frontend</span>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-sm rounded-full">Backend</span>
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-sm rounded-full">UI/UX</span>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-[#ff6b6b] mb-1">5+</div>
                <div className="text-slate-400 text-sm">Projects Built</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-[#ff6b6b] mb-1">3+</div>
                <div className="text-slate-400 text-sm">Years Experience</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-[#ff6b6b] mb-1">100%</div>
                <div className="text-slate-400 text-sm">Dedication</div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-(--text-primary) mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {['React', 'Redux', 'Node.js', 'JavaScript', 'Tailwind CSS', 'Git'].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/5 text-slate-300 text-sm rounded-lg border border-white/10"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 text-(--text-primary) rounded-xl hover:bg-white/20 transition-colors"
              >
                <FaGithub className="text-lg" />
                GitHub
              </a>
              <a
                href="mailto:developer@example.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ff6b6b] text-white rounded-xl hover:bg-[#ff5252] transition-colors"
              >
                <FaEnvelope className="text-lg" />
                Contact Me
              </a>
            </div>
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
                <FaExternalLinkAlt className="text-lg" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-(--text-primary) rounded-full hover:bg-white/20 transition-colors"
              >
                <FaGithub className="text-lg" />
                View on GitHub
              </a>
            </div>
          </div>
          <p className="text-slate-500 mt-8">
            Made with <FaHeart className="inline text-[#ff6b6b] fill-[#ff6b6b] text-sm" /> by Cooking Boss Team
          </p>
        </div>
      </section>
    </main>
  )
}

export default About

