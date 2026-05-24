import React, { useEffect } from 'react'
import { FaUtensils, FaSearch, FaHeart, FaShoppingCart, FaVideo, FaMoon, FaSun, FaEnvelope, FaGithub, FaArrowRight, FaCheckCircle, FaQuestionCircle } from 'react-icons/fa'

const UserGuide = () => {
  useEffect(() => {
    document.title = 'User Guide - Cooking Boss'
  }, [])

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#ff6b6b]/10 rounded-full mb-4 sm:mb-6">
            <FaUtensils className="text-[#ff6b6b] text-base sm:text-lg" />
            <span className="text-[#ff6b6b] font-medium text-sm sm:text-base">User Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-(--text-primary) mb-4 sm:mb-6">
            Welcome to <span className="text-[#ff6b6b]">Cooking Boss!</span> 🍳
          </h1>
          <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto px-4">
            This guide will help you understand and use every feature of Cooking Boss, step by step. No technical knowledge required!
          </p>
        </div>

        {/* What is Cooking Boss */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">What is Cooking Boss?</h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              Cooking Boss is your personal cooking assistant that helps you:
            </p>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span>Find recipes from around the world</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span>Discover what you can cook with ingredients you already have</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span>Save your favorite recipes</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span>Create shopping lists</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span>Watch cooking videos</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span>Get nutrition information</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Getting Started */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">Getting Started</h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <h3 className="text-xl font-semibold text-(--text-primary) mb-4">How to Access the App</h3>
            <ol className="space-y-3 text-slate-300 list-decimal list-inside">
              <li>Open your web browser (Chrome, Firefox, Safari, etc.)</li>
              <li>Go to the Cooking Boss website URL</li>
              <li>The app will load and you're ready to start!</li>
            </ol>
          </div>
        </section>

        {/* Browse Recipes */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">
            <FaSearch className="inline mr-2 text-[#ff6b6b]" />
            Browse Recipes 📖
          </h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <p className="text-slate-400 mb-4"><strong>What it does:</strong> Shows you thousands of recipes from different cuisines.</p>
            <p className="text-slate-400 mb-4"><strong>How to use:</strong></p>
            <ol className="space-y-2 text-slate-300 list-decimal list-inside mb-4">
              <li>Click on "Recipes" in the menu</li>
              <li>You'll see a grid of recipe cards with images</li>
              <li>Scroll down to see more recipes</li>
              <li>Click "Load More" at the bottom to see additional recipes</li>
              <li>Click on any recipe card to see the full details</li>
            </ol>
            <div className="bg-[#ff6b6b]/10 rounded-xl p-4 border border-[#ff6b6b]/20">
              <p className="text-[#ff6b6b] font-medium mb-2">Tips:</p>
              <ul className="text-slate-300 space-y-1 text-sm">
                <li>• Each card shows the recipe name, cuisine type, and category</li>
                <li>• Hover over a card to see a heart icon - click it to save as favorite</li>
                <li>• Use the search bar at the top to find specific recipes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Search Recipes */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">
            <FaSearch className="inline mr-2 text-[#ff6b6b]" />
            Search Recipes 🔍
          </h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <p className="text-slate-400 mb-4"><strong>What it does:</strong> Find recipes by name, ingredient, or cuisine.</p>
            <p className="text-slate-400 mb-4"><strong>How to use:</strong></p>
            <ol className="space-y-2 text-slate-300 list-decimal list-inside mb-4">
              <li>Go to the Recipes page</li>
              <li>Type what you're looking for in the search bar</li>
              <li>Examples: "chicken", "pasta", "Italian"</li>
              <li>Press Enter or click the search icon</li>
              <li>Browse the results</li>
            </ol>
            <div className="bg-[#ff6b6b]/10 rounded-xl p-4 border border-[#ff6b6b]/20">
              <p className="text-[#ff6b6b] font-medium mb-2">Tips:</p>
              <ul className="text-slate-300 space-y-1 text-sm">
                <li>• The search looks through recipe names, ingredients, and descriptions</li>
                <li>• Clear the search by clicking the X button</li>
                <li>• Results update as you type</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Fridge Finder */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">
            <FaUtensils className="inline mr-2 text-[#ff6b6b]" />
            Fridge Finder (Smart Search) 🧊
          </h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <p className="text-slate-400 mb-4"><strong>What it does:</strong> Find recipes you can make with ingredients you already have at home.</p>
            <p className="text-slate-400 mb-4"><strong>How to use:</strong></p>
            <ol className="space-y-2 text-slate-300 list-decimal list-inside mb-4">
              <li>Click on "Fridge Finder" in the menu</li>
              <li>Type the ingredients you have (separate with commas)</li>
              <li>Examples: "chicken, rice, onion" or "eggs, cheese, bread"</li>
              <li>Click "Find" or press Enter</li>
              <li>The app will show recipes you can make</li>
            </ol>
            <div className="bg-[#ff6b6b]/10 rounded-xl p-4 border border-[#ff6b6b]/20">
              <p className="text-[#ff6b6b] font-medium mb-2">What the results mean:</p>
              <ul className="text-slate-300 space-y-1 text-sm">
                <li>• <strong>"You have all!"</strong> - You have every ingredient needed</li>
                <li>• <strong>"Missing X"</strong> - You're missing X ingredients to make this recipe</li>
                <li>• <strong>"Uses X of your items"</strong> - How many of your ingredients are used</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Favorites */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">
            <FaHeart className="inline mr-2 text-[#ff6b6b]" />
            Favorites Page ❤️
          </h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <p className="text-slate-400 mb-4"><strong>What it does:</strong> Save and view your favorite recipes.</p>
            <p className="text-slate-400 mb-4"><strong>How to add to favorites:</strong></p>
            <ol className="space-y-2 text-slate-300 list-decimal list-inside mb-4">
              <li>Browse any recipe</li>
              <li>Click the heart icon on the recipe card</li>
              <li>The heart will turn red when saved</li>
              <li>Click again to remove from favorites</li>
            </ol>
            <p className="text-slate-400 mb-4"><strong>How to view favorites:</strong></p>
            <ol className="space-y-2 text-slate-300 list-decimal list-inside">
              <li>Click on "Favorites" in the menu</li>
              <li>You'll see all your saved recipes</li>
              <li>Click on any recipe to view details</li>
              <li>Remove from favorites by clicking the heart icon</li>
            </ol>
          </div>
        </section>

        {/* Shopping List */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">
            <FaShoppingCart className="inline mr-2 text-[#ff6b6b]" />
            Shopping List 🛒
          </h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <p className="text-slate-400 mb-4"><strong>What it does:</strong> Create and manage your grocery shopping list.</p>
            <p className="text-slate-400 mb-4"><strong>How to add ingredients:</strong></p>
            <ol className="space-y-2 text-slate-300 list-decimal list-inside mb-4">
              <li>Open any recipe</li>
              <li>Scroll to the ingredients section</li>
              <li>Click the "+" button next to any ingredient</li>
              <li>The ingredient is added to your shopping list</li>
              <li>You can add multiple ingredients from multiple recipes</li>
            </ol>
            <p className="text-slate-400 mb-4"><strong>How to view your shopping list:</strong></p>
            <ol className="space-y-2 text-slate-300 list-decimal list-inside mb-4">
              <li>Click the shopping cart icon in the top right corner</li>
              <li>A panel will slide in from the right</li>
              <li>You'll see all your added ingredients</li>
            </ol>
            <div className="bg-[#ff6b6b]/10 rounded-xl p-4 border border-[#ff6b6b]/20">
              <p className="text-[#ff6b6b] font-medium mb-2">Shopping list features:</p>
              <ul className="text-slate-300 space-y-1 text-sm">
                <li>• <strong>Check off items:</strong> Click the checkbox when you buy an item</li>
                <li>• <strong>Remove items:</strong> Click the trash icon to remove an item</li>
                <li>• <strong>Clear all:</strong> Click "Clear All" to empty the list</li>
                <li>• <strong>Order online:</strong> Click "Order on mycart.pk" to buy ingredients online</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cooking Videos */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">
            <FaVideo className="inline mr-2 text-[#ff6b6b]" />
            Cooking Videos 🎬
          </h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <p className="text-slate-400 mb-4"><strong>What it does:</strong> Watch step-by-step cooking video tutorials.</p>
            <p className="text-slate-400 mb-4"><strong>How to use:</strong></p>
            <ol className="space-y-2 text-slate-300 list-decimal list-inside mb-4">
              <li>Click on "Videos" in the menu</li>
              <li>You'll see a grid of cooking videos</li>
              <li>Each video shows thumbnail, title, channel, time, and rating</li>
              <li>Click on any video to watch it</li>
              <li>The video will open in a popup window</li>
            </ol>
            <div className="bg-[#ff6b6b]/10 rounded-xl p-4 border border-[#ff6b6b]/20">
              <p className="text-[#ff6b6b] font-medium mb-2">Video features:</p>
              <ul className="text-slate-300 space-y-1 text-sm">
                <li>• Click the play button to start watching</li>
                <li>• Full-screen viewing available</li>
                <li>• Close the popup by clicking the X button</li>
                <li>• Search videos by title, channel, or description</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Theme Toggle */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">
            <FaMoon className="inline mr-2 text-[#ff6b6b]" />
            Theme Toggle 🌙☀️
          </h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <p className="text-slate-400 mb-4"><strong>What it does:</strong> Switch between dark and light mode.</p>
            <p className="text-slate-400 mb-4"><strong>How to use:</strong></p>
            <ol className="space-y-2 text-slate-300 list-decimal list-inside">
              <li>Click the sun/moon icon in the top right corner</li>
              <li>The app will switch between dark and light theme</li>
              <li>Your preference is saved for future visits</li>
            </ol>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">
            <FaEnvelope className="inline mr-2 text-[#ff6b6b]" />
            Contact Us 📧
          </h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <p className="text-slate-400 mb-4"><strong>What it does:</strong> Send messages to the Cooking Boss team.</p>
            <p className="text-slate-400 mb-4"><strong>How to use:</strong></p>
            <ol className="space-y-2 text-slate-300 list-decimal list-inside mb-4">
              <li>Click on "Contact" in the menu</li>
              <li>Fill in the form (name, email, subject, message)</li>
              <li>Click "Send Message"</li>
              <li>You'll see a success message when sent</li>
            </ol>
            <div className="bg-[#ff6b6b]/10 rounded-xl p-4 border border-[#ff6b6b]/20">
              <p className="text-[#ff6b6b] font-medium mb-2">Contact information:</p>
              <ul className="text-slate-300 space-y-1 text-sm">
                <li>• Email: ahmed.ali.office70@gmail.com</li>
                <li>• Phone: +92 3702629117</li>
                <li>• Location: Karachi, Korangi, Pakistan</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Common Questions */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">
            <FaQuestionCircle className="inline mr-2 text-[#ff6b6b]" />
            Common Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <p className="text-(--text-primary) font-medium mb-2">Q: Is Cooking Boss free to use?</p>
              <p className="text-slate-400">A: Yes! Cooking Boss is completely free to use.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <p className="text-(--text-primary) font-medium mb-2">Q: Do I need to create an account?</p>
              <p className="text-slate-400">A: No account needed. Just start browsing and cooking!</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <p className="text-(--text-primary) font-medium mb-2">Q: Can I use Cooking Boss on my phone?</p>
              <p className="text-slate-400">A: Yes! The app works on all devices - phones, tablets, and computers.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <p className="text-(--text-primary) font-medium mb-2">Q: Where do the recipes come from?</p>
              <p className="text-slate-400">A: Recipes come from multiple sources including TheMealDB, Spoonacular, and API Ninjas.</p>
            </div>
          </div>
        </section>

        {/* Need Help */}
        <section className="mb-12 sm:mb-16">
          <div className="bg-linear-to-r from-[#ff6b6b]/20 to-[#ff8e53]/20 rounded-3xl p-6 sm:p-8 md:p-12 border border-[#ff6b6b]/20 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-4">Need Help?</h2>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto px-4">
              If you need assistance, visit the Help Center or contact us.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/help"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 bg-[#ff6b6b] text-white rounded-full hover:bg-[#ff5252] transition-colors text-sm sm:text-base"
              >
                <FaQuestionCircle className="text-lg sm:text-xl" />
                Help Center
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 bg-white/10 text-(--text-primary) rounded-full hover:bg-white/20 transition-colors text-sm sm:text-base"
              >
                <FaEnvelope className="text-lg sm:text-xl" />
                Contact Us
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-8 border-t border-white/10">
          <p className="text-slate-500">
            Enjoy Cooking! 🎉
          </p>
          <p className="text-slate-600 text-sm mt-2">
            Last updated: May 2026
          </p>
        </div>
      </div>
    </main>
  )
}

export default UserGuide
