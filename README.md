# Cooking Boss

A modern recipe discovery and management application built with React 19 and Vite.

## Features

- **Recipe Discovery**: Browse recipes from multiple sources (TheMealDB, Spoonacular, API Ninjas)
- **Smart Search**: Find recipes by ingredients with the "Fridge Finder" feature
- **Favorites System**: Save and manage your favorite recipes
- **Shopping List**: Add ingredients from recipes to your shopping list
- **Cooking Videos**: Watch step-by-step video tutorials from Tasty
- **PWA Support**: Install as a progressive web app for offline access
- **Dark/Light Theme**: Toggle between dark and light modes
- **Responsive Design**: Optimized for mobile, tablet, and desktop

## Tech Stack

### Frontend Framework
- **React 19** - Latest React with concurrent features
- **Vite 7** - Fast build tool and dev server
- **React Router DOM 7** - Client-side routing

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Icons** - Icon library (Font Awesome)

### State Management
- **Redux Toolkit** - State management and data fetching

### UI Components
- **Sonner** - Beautiful toast notifications

### Utilities
- **Axios** - HTTP client for API requests
- **jsPDF** - PDF generation for recipes
- **html2canvas** - HTML to canvas conversion

### APIs Integrated
- TheMealDB - Recipe database
- Spoonacular - Smart search and ingredient analysis
- Edamam - Nutrition information
- Tasty API - Cooking videos
- API Ninjas - Ingredient-based recipes

### PWA
- **vite-plugin-pwa** - Progressive Web App support
- **Workbox** - Service worker for offline caching

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React context providers
├── css/            # Global styles
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── services/       # API service layers
└── utils/          # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## License

MIT
