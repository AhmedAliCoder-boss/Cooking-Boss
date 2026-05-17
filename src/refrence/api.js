// API Configuration
const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';
import { showLoading, showError } from './ui.js';

export async function fetchRandomRecipes(limit = 21) {
    try {
        showLoading();
        // Get random recipes (limited to 21 for homepage)
        const recipePromises = Array(limit).fill().map(() => 
            fetch(`${API_BASE_URL}random.php`).then(res => res.json())
        );
        
        const recipesData = await Promise.all(recipePromises);
        return recipesData.map(item => item.meals[0]);
    } catch (error) {
        console.error('Error fetching random recipes:', error);
        showError('Failed to load recipes. Please try again later.');
        return [];
    }
}

export async function searchByIngredient(ingredient) {
    try {
        const response = await fetch(`${API_BASE_URL}filter.php?i=${encodeURIComponent(ingredient)}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // If we have meals, fetch full details for each
        if (data.meals) {
            const mealPromises = data.meals.map(meal => 
                fetchRecipeById(meal.idMeal)
            );
            return await Promise.all(mealPromises);
        }
        
        return [];
    } catch (error) {
        console.error('Error searching by ingredient:', error);
        return [];
    }
}

export async function searchRecipes(query) {
    // Ensure query is a string and trim whitespace
    const searchQuery = String(query || '').trim();
    if (!searchQuery) return [];
    
    try {
        showLoading();
        
        // Search by name
        const [nameResults, ingredientResults] = await Promise.all([
            // Search by recipe name
            (async () => {
                const response = await fetch(`${API_BASE_URL}search.php?s=${encodeURIComponent(searchQuery)}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data.meals || [];
            })(),
            
            // Search by ingredient
            searchByIngredient(searchQuery)
        ]);
        
        // Combine and deduplicate results
        const combinedResults = [...nameResults];
        const existingIds = new Set(nameResults.map(recipe => recipe.idMeal));
        
        for (const recipe of ingredientResults) {
            if (!existingIds.has(recipe.idMeal)) {
                combinedResults.push(recipe);
                existingIds.add(recipe.idMeal);
            }
        }
        
        return combinedResults;
    } catch (error) {
        console.error('Error searching recipes:', error);
        showError('Failed to search recipes. Please try again.');
        return [];
    }
}

export async function searchByCategory(category) {
    try {
        showLoading();
        const response = await fetch(`${API_BASE_URL}filter.php?c=${encodeURIComponent(category)}`);
        const data = await response.json();
        
        if (data.meals) {
            // Get full details for each recipe
            const recipePromises = data.meals.slice(0, 12).map(meal => 
                fetch(`${API_BASE_URL}lookup.php?i=${meal.idMeal}`).then(res => res.json())
            );
            
            const recipesData = await Promise.all(recipePromises);
            return recipesData.map(item => item.meals[0]);
        }
        return [];
    } catch (error) {
        console.error('Error fetching category recipes:', error);
        showError('Failed to load category recipes. Please try again.');
        return [];
    }
}

// Cache for storing fetched recipes
const recipeCache = new Map();

// Function to fetch a single recipe by ID with caching
export async function fetchRecipeById(id) {
    if (recipeCache.has(id)) {
        return recipeCache.get(id);
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}lookup.php?i=${id}`);
        const data = await response.json();
        if (data.meals && data.meals[0]) {
            recipeCache.set(id, data.meals[0]);
            return data.meals[0];
        }
        return null;
    } catch (error) {
        console.error(`Error fetching recipe ${id}:`, error);
        return null;
    }
}

// Function to get paginated list of recipe IDs
export async function getPaginatedRecipeIds(page = 1, limit = 12) {
    try {
        // Since the API doesn't support pagination natively, we'll fetch all IDs once and cache them
        if (!window.allRecipeIds) {
            const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
            let allIds = new Set();
            
            // Fetch recipe IDs by first letter (API limitation)
            for (const letter of letters) {
                try {
                    const response = await fetch(`${API_BASE_URL}search.php?f=${letter}`);
                    const data = await response.json();
                    if (data.meals) {
                        data.meals.forEach(meal => allIds.add(meal.idMeal));
                    }
                } catch (error) {
                    console.error(`Error fetching recipes for letter ${letter}:`, error);
                }
                
                // Small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            window.allRecipeIds = Array.from(allIds);
            console.log(`Found ${window.allRecipeIds.length} unique recipes`);
        }
        
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedIds = window.allRecipeIds.slice(start, end);
        
        return {
            ids: paginatedIds,
            total: window.allRecipeIds.length,
            page,
            totalPages: Math.ceil(window.allRecipeIds.length / limit)
        };
    } catch (error) {
        console.error('Error getting paginated recipe IDs:', error);
        throw error;
    }
}

// Function to get paginated recipes
export async function fetchPaginatedRecipes(page = 1, limit = 12) {
    try {
        showLoading();
        
        // Get paginated recipe IDs
        const { ids, total, totalPages } = await getPaginatedRecipeIds(page, limit);
        
        // Fetch recipe details in parallel
        const recipePromises = ids.map(id => fetchRecipeById(id));
        const recipes = (await Promise.all(recipePromises)).filter(Boolean);
        
        return {
            recipes,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: total,
                itemsPerPage: limit
            }
        };
    } catch (error) {
        console.error('Error fetching paginated recipes:', error);
        showError('Failed to load recipes. Please try again.');
        return { recipes: [], pagination: null };
    }
}

// Keep fetchAllRecipes for backward compatibility but make it use the new paginated function
export async function fetchAllRecipes() {
    console.warn('fetchAllRecipes() is deprecated. Use fetchPaginatedRecipes() instead for better performance.');
    const { recipes } = await fetchPaginatedRecipes(1, 12);
    return recipes;
}

export async function getRecipeDetails(recipeId) {
    try {
        const response = await fetch(`${API_BASE_URL}lookup.php?i=${recipeId}`);
        const data = await response.json();
        return data.meals ? data.meals[0] : null;
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        showError('Failed to load recipe details. Please try again.');
        return null;
    }
}

