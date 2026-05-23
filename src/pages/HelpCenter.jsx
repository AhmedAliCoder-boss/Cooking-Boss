import React, { useState, useEffect } from 'react'
import { FaQuestionCircle, FaSearch, FaChevronDown, FaChevronUp, FaBook, FaCommentAlt, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa'

const HelpCenter = () => {
  useEffect(() => {
    document.title = 'Help Center - Cooking Boss'
  }, [])
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'recipes', name: 'Recipes' },
    { id: 'account', name: 'Account & Settings' },
    { id: 'technical', name: 'Technical Issues' },
  ]

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I get started with Cooking Boss?',
      answer: "Simply browse our recipes, use the search feature to find specific dishes, or try our \"What's in Your Fridge?\" feature to discover recipes based on ingredients you have. You can save favorites and create shopping lists without creating an account.",
    },
    {
      id: 2,
      category: 'getting-started',
      question: 'Do I need to create an account?',
      answer: 'No! Cooking Boss is designed to work without an account. Your favorites and shopping lists are stored locally on your device. However, creating an account (when available) will allow you to sync data across devices.',
    },
    {
      id: 3,
      category: 'recipes',
      question: 'How do I search for recipes?',
      answer: "Use the search bar on the home page or recipes page to find recipes by name. You can also browse by category, or use the 'What's in Your Fridge?' feature to find recipes based on ingredients you have.",
    },
    {
      id: 4,
      category: 'recipes',
      question: "What is the 'What's in Your Fridge?' feature?",
      answer: "This feature lets you enter ingredients you have on hand, and we'll find recipes you can make. It's perfect for when you want to cook with what's available in your kitchen.",
    },
    {
      id: 5,
      category: 'recipes',
      question: 'How do I save a recipe as a favorite?',
      answer: 'Click the heart icon on any recipe card or on the recipe detail page to add it to your favorites. You can access all your favorites from the Favorites page.',
    },
    {
      id: 6,
      category: 'recipes',
      question: 'Can I create a shopping list?',
      answer: 'Yes! On any recipe detail page, you can add individual ingredients or all ingredients to your shopping list. Access your shopping list from the header icon.',
    },
    {
      id: 7,
      category: 'account',
      question: 'How do I delete my data?',
      answer: "Since your data is stored locally on your device, you can clear it by clearing your browser's local storage for this site. Contact us if you need assistance with data deletion.",
    },
    {
      id: 8,
      category: 'account',
      question: 'Is my data private?',
      answer: "Yes! Your favorites and shopping lists are stored locally on your device. We don't collect personal information unless you choose to contact us. See our Privacy Policy for more details.",
    },
    {
      id: 9,
      category: 'technical',
      question: 'Why are some images not loading?',
      answer: 'This could be due to slow internet connection or issues with the recipe API servers. Try refreshing the page or checking your internet connection.',
    },
    {
      id: 10,
      category: 'technical',
      question: 'The app is not working properly. What should I do?',
      answer: 'Try clearing your browser cache and cookies, or try using a different browser. If the issue persists, please contact us with details about the problem.',
    },
    {
      id: 11,
      category: 'technical',
      question: 'Does Cooking Boss work offline?',
      answer: 'Cooking Boss has some offline capabilities. You can view previously loaded pages and access your favorites offline. However, searching for new recipes requires an internet connection.',
    },
    {
      id: 12,
      category: 'recipes',
      question: 'Where do the recipes come from?',
      answer: 'Our recipes are sourced from multiple APIs including TheMealDB, Spoonacular, Edamam, Tasty, and API Ninjas. This gives you access to a diverse collection of recipes from around the world.',
    },
  ]

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b6b]/10 rounded-full mb-6">
            <FaQuestionCircle className="text-[#ff6b6b] text-lg" />
            <span className="text-[#ff6b6b] font-medium">Help Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-(--text-primary) mb-6">
            How Can We <span className="text-[#ff6b6b]">Help?</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Find answers to common questions or get in touch with our support team.
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-(--text-primary) placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="/fridge-finder"
              className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#ff6b6b]/30 transition-all group"
            >
              <div className="w-12 h-12 bg-[#ff6b6b]/10 rounded-xl flex items-center justify-center mb-4">
                <FaBook className="text-[#ff6b6b] text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-(--text-primary) mb-2 group-hover:text-[#ff6b6b] transition-colors">
                Fridge Finder Guide
              </h3>
              <p className="text-slate-400 text-sm">Learn how to find recipes with ingredients you have</p>
            </a>
            <a
              href="/contact"
              className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#ff6b6b]/30 transition-all group"
            >
              <div className="w-12 h-12 bg-[#ff6b6b]/10 rounded-xl flex items-center justify-center mb-4">
                <FaCommentAlt className="text-[#ff6b6b] text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-(--text-primary) mb-2 group-hover:text-[#ff6b6b] transition-colors">
                Contact Support
              </h3>
              <p className="text-slate-400 text-sm">Get personalized help from our team</p>
            </a>
            <a
              href="/privacy"
              className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#ff6b6b]/30 transition-all group"
            >
              <div className="w-12 h-12 bg-[#ff6b6b]/10 rounded-xl flex items-center justify-center mb-4">
                <FaEnvelope className="text-[#ff6b6b] text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-(--text-primary) mb-2 group-hover:text-[#ff6b6b] transition-colors">
                Privacy Policy
              </h3>
              <p className="text-slate-400 text-sm">Learn about how we protect your data</p>
            </a>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-[#ff6b6b] text-white'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-(--text-primary) text-center mb-10">
            Frequently Asked <span className="text-[#ff6b6b]">Questions</span>
          </h2>
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                  >
                    <span className="text-(--text-primary) font-medium pr-4">{faq.question}</span>
                    {expandedFaq === faq.id ? (
                      <FaChevronUp className="text-[#ff6b6b] flex-shrink-0 text-lg" />
                    ) : (
                      <FaChevronDown className="text-slate-400 flex-shrink-0 text-lg" />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-6 pb-4 pt-0">
                      <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <FaQuestionCircle className="mx-auto text-slate-600 mb-4 text-6xl" />
                <p className="text-slate-400 text-lg">
                  No results found. Try a different search or category.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-linear-to-r from-[#ff6b6b]/20 to-[#ff8e53]/20 rounded-3xl p-8 md:p-12 border border-[#ff6b6b]/20 text-center">
            <h2 className="text-3xl font-bold text-(--text-primary) mb-4">Still Need Help?</h2>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you with any questions or issues.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff6b6b] text-white rounded-full hover:bg-[#ff5252] transition-colors"
              >
                <FaCommentAlt className="text-xl" />
                Contact Support
              </a>
              <a
                href="mailto:support@cookingboss.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-(--text-primary) rounded-full hover:bg-white/20 transition-colors"
              >
                <FaEnvelope className="text-xl" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HelpCenter
