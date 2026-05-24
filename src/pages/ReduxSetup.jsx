import React, { useEffect } from 'react'
import { FaDatabase, FaCode, FaLayerGroup, FaSync, FaCube } from 'react-icons/fa'

const ReduxSetup = () => {
  useEffect(() => {
    document.title = 'Redux Setup - Cooking Boss'
  }, [])

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#ff6b6b]/10 rounded-full mb-4 sm:mb-6">
            <FaDatabase className="text-[#ff6b6b] text-base sm:text-lg" />
            <span className="text-[#ff6b6b] font-medium text-sm sm:text-base">State Management</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-(--text-primary) mb-4 sm:mb-6">
            Redux <span className="text-[#ff6b6b]">Setup</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto px-4">
            Documentation about Redux state management implementation in Cooking Boss.
          </p>
        </div>

        {/* What is Redux */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">What is Redux?</h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.
            </p>
            <p className="text-slate-400 mb-4"><strong>Why we use Redux in Cooking Boss:</strong></p>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-3">
                <FaCube className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span>Centralized state management for recipes, favorites, and shopping lists</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCube className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span>Predictable state updates with actions and reducers</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCube className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span>Easy debugging with Redux DevTools</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCube className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span>Efficient data fetching with Redux Toolkit (RTK Query)</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Redux Toolkit */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">
            <FaCode className="inline mr-2 text-[#ff6b6b]" />
            Redux Toolkit
          </h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <p className="text-slate-400 mb-4"><strong>What is Redux Toolkit?</strong></p>
            <p className="text-slate-300 mb-6">
              Redux Toolkit is the official, opinionated, batteries-included toolset for efficient Redux development. It simplifies common Redux use cases and makes it easier to write Redux applications.
            </p>
            <p className="text-slate-400 mb-4"><strong>Key Features Used:</strong></p>
            <ul className="space-y-2 text-slate-300">
              <li>• <strong>configureStore</strong> - Simplifies store setup</li>
              <li>• <strong>createSlice</strong> - Reducers and actions in one place</li>
              <li>• <strong>createAsyncThunk</strong> - Handles async actions (API calls)</li>
              <li>• <strong>RTK Query</strong> - Data fetching and caching</li>
            </ul>
          </div>
        </section>

        {/* Store Structure */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">
            <FaLayerGroup className="inline mr-2 text-[#ff6b6b]" />
            Store Structure
          </h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <p className="text-slate-400 mb-4"><strong>Our Redux store includes these slices:</strong></p>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-(--text-primary) font-semibold mb-2">recipesSlice</h3>
                <p className="text-slate-400 text-sm">Manages recipe data, search results, and loading states</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-(--text-primary) font-semibold mb-2">favoritesSlice</h3>
                <p className="text-slate-400 text-sm">Manages user's favorite recipes with local storage persistence</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-(--text-primary) font-semibold mb-2">shoppingListSlice</h3>
                <p className="text-slate-400 text-sm">Manages shopping list items with local storage persistence</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-(--text-primary) font-semibold mb-2">themeSlice</h3>
                <p className="text-slate-400 text-sm">Manages dark/light theme preference with local storage</p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Flow */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">
            <FaSync className="inline mr-2 text-[#ff6b6b]" />
            Data Flow
          </h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <p className="text-slate-400 mb-4"><strong>How data flows through the application:</strong></p>
            <ol className="space-y-3 text-slate-300 list-decimal list-inside">
              <li><strong>Component</strong> dispatches an action</li>
              <li><strong>Action</strong> is sent to the Redux store</li>
              <li><strong>Reducer</strong> processes the action and updates state</li>
              <li><strong>Store</strong> notifies subscribed components</li>
              <li><strong>Component</strong> re-renders with new state</li>
            </ol>
            <div className="mt-6 bg-[#ff6b6b]/10 rounded-xl p-4 border border-[#ff6b6b]/20">
              <p className="text-[#ff6b6b] font-medium mb-2">Benefits:</p>
              <ul className="text-slate-300 space-y-1 text-sm">
                <li>• Predictable state changes</li>
                <li>• Easy to debug with time-travel debugging</li>
                <li>• Centralized state management</li>
                <li>• Consistent behavior across the app</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Local Storage Integration */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">Local Storage Integration</h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <p className="text-slate-400 mb-4"><strong>Persisting State:</strong></p>
            <p className="text-slate-300 mb-4">
              To provide a better user experience without requiring authentication, we persist certain state slices to browser's local storage:
            </p>
            <ul className="space-y-2 text-slate-300 mb-6">
              <li>• <strong>Favorites</strong> - Saved recipes persist across sessions</li>
              <li>• <strong>Shopping List</strong> - Shopping list items persist across sessions</li>
              <li>• <strong>Theme</strong> - Dark/light mode preference persists</li>
            </ul>
            <div className="bg-[#ff6b6b]/10 rounded-xl p-4 border border-[#ff6b6b]/20">
              <p className="text-[#ff6b6b] font-medium mb-2">Implementation:</p>
              <p className="text-slate-300 text-sm">
                We use Redux middleware to automatically sync these slices with local storage on state changes, and rehydrate the store on app initialization.
              </p>
            </div>
          </div>
        </section>

        {/* Custom Hooks */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">Custom Hooks</h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <p className="text-slate-400 mb-4"><strong>We provide custom hooks for easy state access:</strong></p>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-xl p-4">
                <code className="text-[#ff6b6b] text-sm">useRecipes()</code>
                <p className="text-slate-400 text-sm mt-2">Access recipe data and actions</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <code className="text-[#ff6b6b] text-sm">useFavorites()</code>
                <p className="text-slate-400 text-sm mt-2">Manage favorite recipes</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <code className="text-[#ff6b6b] text-sm">useShoppingList()</code>
                <p className="text-slate-400 text-sm mt-2">Manage shopping list items</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <code className="text-[#ff6b6b] text-sm">useTheme()</code>
                <p className="text-slate-400 text-sm mt-2">Manage theme preference</p>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">Best Practices</h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <FaCube className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span>Keep state minimal and normalized</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCube className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span>Use selectors for derived state</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCube className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span>Avoid putting non-serializable data in state</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCube className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span>Use RTK Query for server state when possible</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCube className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span>Keep reducers pure and side-effect free</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-8 border-t border-white/10">
          <p className="text-slate-500">
            Redux state management documentation
          </p>
          <p className="text-slate-600 text-sm mt-2">
            Last updated: May 2026
          </p>
        </div>
      </div>
    </main>
  )
}

export default ReduxSetup
