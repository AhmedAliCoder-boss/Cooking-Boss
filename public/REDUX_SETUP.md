# Redux & API Integration Setup

This project now includes Redux Toolkit with multiple recipe APIs integrated.

## APIs Integrated

| API | Purpose | File |
|-----|---------|------|
| **TheMealDB** | Recipes database | `src/services/mealDBApi.js` |
| **Spoonacular** | Smart search & ingredient matching | `src/services/spoonacularApi.js` |
| **Edamam** | Nutrition analysis | `src/services/edamamApi.js` |
| **Tasty API** | Cooking videos | `src/services/tastyApi.js` |
| **API Ninjas** | Ingredient-based recipes | `src/services/apiNinjasApi.js` |

## Setup

1. **Copy the env file:**
   ```bash
   cp .env.example .env
   ```

2. **Add your API keys to `.env`:**
   - Get Spoonacular key: https://spoonacular.com/food-api
   - Get Edamam credentials: https://developer.edamam.com/
   - Get RapidAPI key (for Tasty): https://rapidapi.com/apidojo/api/tasty
   - Get API Ninjas key: https://api-ninjas.com/
   - TheMealDB is free (no key needed)

## Usage

### Using Custom Hooks (Recommended)

```jsx
import { useRecipes, useSearch, useNutrition, useVideos, useIngredients } from './hooks'

function MyComponent() {
  const { recipes, loading, getLatestRecipes, searchRecipes } = useRecipes()
  const { search, results, searchByFridge } = useSearch()
  const { getNutrition, nutritionData } = useNutrition()
  const { searchVideos, videos } = useVideos()
  const { findIngredients, findRecipesByIngredient } = useIngredients()

  // Use these functions in your component
}
```

### Using Redux Directly

```jsx
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecipes, smartSearch } from './store/slices/recipesSlice'

function MyComponent() {
  const dispatch = useDispatch()
  const { items, loading } = useSelector((state) => state.recipes)

  useEffect(() => {
    dispatch(fetchRecipes())
  }, [dispatch])
}
```

## Store Structure

```
store/
├── store.js              # Main store configuration
├── slices/
│   ├── recipesSlice.js   # TheMealDB recipes
│   ├── searchSlice.js    # Smart search (Spoonacular + TheMealDB)
│   ├── nutritionSlice.js # Edamam nutrition
│   ├── videosSlice.js    # Tasty videos
│   └── ingredientsSlice.js # API Ninjas ingredients
```

## Services

```
services/
├── mealDBApi.js
├── spoonacularApi.js
├── edamamApi.js
├── tastyApi.js
└── apiNinjasApi.js
```

## Example Component

See `src/components/ExampleRecipeSearch.jsx` for a complete working example of all API integrations.

## Environment Variables Required

```env
VITE_SPOONACULAR_API_KEY=
VITE_EDAMAM_APP_ID=
VITE_EDAMAM_APP_KEY=
VITE_TASTY_API_KEY=
VITE_API_NINJAS_KEY=
```
