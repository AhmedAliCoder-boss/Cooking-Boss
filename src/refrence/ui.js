import { getRecipeDetails } from './api.js';
import { toggleFavorite, favorites } from './favorites.js';
import { renderRecipeModal } from './modal.js';

// DOM Elements
export const searchInput = document.getElementById('search-input');
export const searchBtn = document.getElementById('search-btn');
export const heroSearch = document.getElementById('hero-search');
export const heroSearchBtn = document.getElementById('hero-search-btn');
export const recipesContainer = document.getElementById('recipes-container');

export function renderRecipes(recipes, isHomepage = false) {
    if (!recipes || recipes.length === 0) {
        showNoResults();
        return;
    }
    
    recipesContainer.innerHTML = '';
    
    // Only show 21 recipes on homepage
    const recipesToShow = isHomepage ? recipes.slice(0, 21) : recipes;
    
    recipesToShow.forEach((recipe, index) => {
        const isFavorite = favorites.some(fav => fav.idMeal === recipe.idMeal);
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.style.animationDelay = `${index * 0.1}s`;
        
        // Truncate description if too long
        const description = recipe.strInstructions 
            ? recipe.strInstructions.split(' ').slice(0, 20).join(' ') + '...'
            : 'No description available.';
        
        recipeCard.innerHTML = `
            <img src="${recipe.strMealThumb || 'https://via.placeholder.com/300x200'}" alt="${recipe.strMeal}" class="recipe-img">
            <div class="recipe-info">
                <h3>${recipe.strMeal}</h3>
                <div class="recipe-meta">
                    <span><i class="fas fa-utensils"></i> ${recipe.strCategory || 'N/A'}</span>
                    <span><i class="fas fa-globe"></i> ${recipe.strArea || 'N/A'}</span>
                </div>
                <p class="recipe-desc">${description}</p>
                <div class="recipe-actions">
                    <button class="view-recipe" data-id="${recipe.idMeal}">View Recipe</button>
                    <button class="favorite-btn ${isFavorite ? 'favorited' : ''}" data-id="${recipe.idMeal}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
        
        recipesContainer.appendChild(recipeCard);
    });
    
    // Add View All button on homepage
    if (isHomepage && recipes.length > 21) {
        const viewAllBtn = document.createElement('div');
        viewAllBtn.className = 'view-all-container';
        viewAllBtn.innerHTML = `
            <a href="/recipes.html" class="view-all-btn">
                View All ${recipes.length} Recipes <i class="fas fa-arrow-right"></i>
            </a>
        `;
        recipesContainer.appendChild(viewAllBtn);
    }
    
    // Add event listeners to the new recipe buttons
    document.querySelectorAll('.view-recipe').forEach(btn => {
        btn.addEventListener('click', () => showRecipeDetails(btn.dataset.id));
    });
    
    // Add favorite button event listeners with recipe data
    document.querySelectorAll('.favorite-btn').forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            // Find the recipe that matches the button's data-id
            const recipe = recipes.find(r => r.idMeal === btn.dataset.id);
            if (recipe) {
                toggleFavorite(e, recipe);
            } else {
                // Fallback to just the ID if recipe not found in the array
                toggleFavorite(e);
            }
        });
    });
}

export async function showRecipeDetails(recipeId) {
    const recipe = await getRecipeDetails(recipeId);
    if (recipe) {
        renderRecipeModal(recipe);
    }
}

export function showLoading(message = 'Loading...', container = null) {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = `<div class="loadermain">
    <div class="center-circle">
        <i class="fas fa-utensils"></i>
    </div>
    <div class="food-item" style="--i:0; --color: #ff9f43">
        <i class="fas fa-hamburger"></i>
    </div>
    <div class="food-item" style="--i:1; --color: #ee5253">
        <i class="fas fa-pizza-slice"></i>
    </div>
    <div class="food-item" style="--i:2; --color: #0abde3">
        <i class="fas fa-ice-cream"></i>
    </div>
    <div class="food-item" style="--i:3; --color: #10ac84">
        <i class="fas fa-drumstick-bite"></i>
    </div>
    <div class="food-item" style="--i:4; --color: #5f27cd">
        <i class="fas fa-cookie"></i>
    </div>
    <div class="loading-text">Loading delicious recipes...</div>
</div>
    `;
    
    // Use provided container or default to recipesContainer
    const targetContainer = container || recipesContainer;
    if (targetContainer) {
        targetContainer.appendChild(loading);
    } else {
        console.warn('No container found to show loading state');
    }
    
    return loading;
}

export function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

export function showError(message, container = null) {
    const errorHtml = `
        <div class="error">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        </div>`;
    
    // Use provided container or default to recipesContainer
    const targetContainer = container || recipesContainer;
    if (targetContainer) {
        targetContainer.innerHTML = errorHtml;
    } else {
        console.error('Error:', message);
        // If no container is available, show an alert as a fallback
        alert(`Error: ${message}`);
    }
}

export function showNoResults() {
    recipesContainer.innerHTML = `
        <div class="no-results">
            <i class="fas fa-search"></i>
            <h3>No recipes found</h3>
            <p>Try a different search term or browse by category</p>
        </div>`;
}

export function handleScroll() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Add animation to elements when they come into view
    document.querySelectorAll('.fade-in').forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

