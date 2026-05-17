// Import modules
import { fetchRandomRecipes, searchRecipes, searchByCategory } from './api.js';
import { 
    searchInput, 
    searchBtn, 
    heroSearch, 
    heroSearchBtn, 
    recipesContainer, 
    renderRecipes, 
    showRecipeDetails,
    showLoading,
    showError,
    showNoResults,
    handleScroll
} from './ui.js';
import { renderFavorites, toggleFavorite } from './favorites.js';
import { closeModal } from './modal.js';
import { debounce } from './utils.js';

// DOM Elements
const categoryCards = document.querySelectorAll('.category-card');

// State
let favorites = [];

// Initialize the application
function init() {
    // Only load random recipes if we're on the exact homepage (index.html)
    const isHomepage = (window.location.pathname.endsWith('index.html') || 
                       window.location.pathname.endsWith('/') || 
                       window.location.pathname === '') && 
                      !window.location.search;
    
    if (isHomepage) {
        loadRandomRecipes();
    }
    
    // Load favorites if on favorites page
    if (window.location.pathname.includes('favorites.html')) {
        renderFavorites();
    }
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize tooltips
    initTooltips();
}

// Load random recipes
async function loadRandomRecipes() {
    if (recipesContainer) {
        const recipes = await fetchRandomRecipes(21); // Get 21 random recipes for homepage
        if (recipes && recipes.length > 0) {
            const isHomepage = !window.location.pathname.includes('recipes.html');
            renderRecipes(recipes, isHomepage);
        }
    }
}

// Set up event listeners
function setupEventListeners() {
    // Search functionality
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => searchRecipes(searchInput.value));
        
        // Debounced search as you type
        const debouncedSearch = debounce((query) => {
            searchRecipes(query);
        }, 500);
        
        searchInput.addEventListener('input', (e) => {
            if (e.target.value.length > 2) {
                debouncedSearch(e.target.value);
            }
        });
    }
    
    // Hero search
    if (heroSearchBtn && heroSearch) {
        heroSearchBtn.addEventListener('click', () => searchRecipes(heroSearch.value));
        heroSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchRecipes(heroSearch.value);
            }
        });
    }
    
    // Category cards
    if (categoryCards.length > 0) {
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.getAttribute('data-category');
                if (category) {
                    searchByCategory(category).then(recipes => {
                        if (recipes && recipes.length > 0) {
                            renderRecipes(recipes);
                            // Scroll to recipes section
                            document.getElementById('recipes')?.scrollIntoView({ behavior: 'smooth' });
                        } else {
                            showNoResults();
                        }
                    });
                }
            });
        });
    }
    
    // Window scroll event for header and animations
    window.addEventListener('scroll', handleScroll);
    
    // Handle back/forward browser buttons
    window.addEventListener('popstate', () => {
        if (window.location.pathname.includes('favorites.html')) {
            renderFavorites();
        } else if (recipesContainer) {
            loadRandomRecipes();
        }
    });
}

// Initialize tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = element.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);
        
        const updateTooltip = (e) => {
            const rect = element.getBoundingClientRect();
            tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
        };
        
        element.addEventListener('mouseenter', (e) => {
            tooltip.style.display = 'block';
            updateTooltip(e);
        });
        
        element.addEventListener('mousemove', updateTooltip);
        
        element.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
    });
}

// Initialize the app when the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Make functions available globally if needed
window.showRecipeDetails = showRecipeDetails;
window.toggleFavorite = toggleFavorite;
window.closeModal = closeModal;

