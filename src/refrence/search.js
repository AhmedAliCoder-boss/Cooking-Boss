import { searchRecipes } from './api.js';
import { showLoading, hideLoading, showError } from './ui.js';

export function initSearch() {
    const searchInput = document.getElementById('hero-search');
    const searchButton = document.querySelector('.hero-search-btn');

    // Handle search on button click
    searchButton.addEventListener('click', handleSearch);

    // Handle search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Handle search when clicking popular tags
    document.querySelectorAll('.hero-tags a').forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            const searchTerm = tag.textContent;
            // Update the search input with the tag text
            if (searchInput) searchInput.value = searchTerm;
            // Trigger search with the tag text
            performSearch(searchTerm);
        });
    });
    
    // Also handle category cards if they exist
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            if (category) {
                if (searchInput) searchInput.value = category;
                performSearch(category);
            }
        });
    });
}

async function handleSearch(event) {
    // Prevent form submission if called from a form
    if (event) {
        event.preventDefault();
    }
    
    const searchInput = document.getElementById('hero-search');
    const query = searchInput ? searchInput.value.trim() : '';
    
    if (query) {
        performSearch(query);
    }

    if (!query) {
        showError('Please enter a search term');
        return;
    }
}

// Function to perform the actual search and navigation
function performSearch(query) {
    if (!query) {
        showError('Please enter a search term');
        return;
    }

    try {
        showLoading('Searching for recipes...');
        // Navigate to search results page with the query as a URL parameter
        window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
    } catch (error) {
        console.error('Search error:', error);
        showError('An error occurred while searching. Please try again.');
    } finally {
        hideLoading();
    }
}

async function displaySearchResults(query) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    try {
        showLoading('Loading search results...');
        const recipes = JSON.parse(sessionStorage.getItem('searchResults')) || [];
        
        if (recipes.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search fa-3x"></i>
                    <h3>No recipes found for "${query}"</h3>
                    <p>Try a different search term or browse our categories.</p>
                </div>
            `;
            return;
        }

        const recipeCards = recipes.map(recipe => createRecipeCard(recipe)).join('');
        resultsContainer.innerHTML = `
            <h2>Search Results for "${query}"</h2>
            <div class="recipe-grid">
                ${recipeCards}
            </div>
        `;
    } catch (error) {
        console.error('Error displaying search results:', error);
        showError('Failed to load search results. Please try again.');
    } finally {
        hideLoading();
    }
}

function createRecipeCard(recipe) {
    return `
        <div class="recipe-card" data-id="${recipe.idMeal}">
            <div class="recipe-image">
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                <button class="favorite-btn" aria-label="Add to favorites">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="recipe-info">
                <h3>${recipe.strMeal}</h3>
                <p>${recipe.strCategory || 'Category not specified'}</p>
                <button class="view-recipe" data-id="${recipe.idMeal}">View Recipe</button>
            </div>
        </div>
    `;
}

// Initialize search functionality when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the index page or a page with search
    if (document.getElementById('hero-search')) {
        initSearch();
    }
    
    // Check if we're on the recipes page with a search query
    if (window.location.pathname.includes('recipes.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        
        if (searchQuery) {
            displaySearchResults(searchQuery);
        }
    }
});
