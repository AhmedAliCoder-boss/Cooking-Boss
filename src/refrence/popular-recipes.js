// Popular Recipes Module
export async function loadPopularRecipes() {
    const container = document.getElementById('popular-recipes');
    if (!container) return;

    // Show loading animation
    // Create responsive loader based on screen size
    const isMobile = window.innerWidth <= 768; // Match your mobile breakpoint
    const foodItems = [
        { emoji: '🍕', color: '#4CAF50' },
        { emoji: '🍔', color: '#2196F3' },
        { emoji: '🍣', color: '#FFC107' },
        { emoji: '🍝', color: '#9C27B0' },
        { emoji: '🥗', color: '#FF5722' },
        { emoji: '🍜', color: '#00BCD4' },
        { emoji: '🍕', color: '#E91E63' },
        { emoji: '🍔', color: '#673AB7' }
    ];
    
    // Show only 4 items on mobile, 8 on desktop
    const itemsToShow = isMobile ? 4 : 8;
    const loaderHTML = `
        <div class="loadermain">
            <div class="center-circle">👨‍🍳</div>
            ${foodItems.slice(0, itemsToShow).map((item, index) => 
                `<div class="food-item" style="--color: ${item.color};">${item.emoji}</div>`
            ).join('')}
        </div>
    `;
    container.innerHTML = loaderHTML;

    try {
        // Fetch popular recipes from TheMealDB API
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        
        if (data.meals && data.meals.length > 0) {
            // Get meals based on screen size (8 for desktop, 4 for mobile)
            const isMobile = window.innerWidth <= 768; // Match your mobile breakpoint
            const mealCount = isMobile ? 4 : 8;
            const popularMeals = data.meals.slice(0, mealCount);
            
            // Clear loading state
            container.innerHTML = '';
            
            // Add recipe cards
            popularMeals.forEach(meal => {
                const recipeCard = createRecipeCard(meal);
                container.appendChild(recipeCard);
            });
        } else {
            showError(container, 'No popular recipes found.');
        }
    } catch (error) {
        console.error('Error loading popular recipes:', error);
        showError(container, 'Failed to load popular recipes. Please try again later.');
    }
}

function createRecipeCard(meal) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
        <div class="recipe-image" style="background-image: url(${meal.strMealThumb || 'images/placeholder.jpg'})"></div>
        <div class="recipe-info">
            <h3>${meal.strMeal || 'Unnamed Recipe'}</h3>
            <p>${meal.strArea || ''} ${meal.strCategory ? `• ${meal.strCategory}` : ''}</p>
            <div class="recipe-meta">
                <span class="recipe-category">${meal.strCategory || 'Recipe'}</span>
                <span class="recipe-rating">
                    <i class="fas fa-star"></i> ${(Math.random() * 1 + 4).toFixed(1)}
                </span>
            </div>
        </div>
    `;
    
    // Add click event to show recipe details in modal
    card.addEventListener('click', () => handleRecipeClick(meal));
    
    return card;
}

function showError(container, message) {
    container.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        </div>
    `;
}

// Import the modal functions
import { renderRecipeModal, openModal } from './modal.js';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadPopularRecipes();
});

// Function to fetch full recipe details by ID
async function fetchRecipeDetails(recipeId) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        const data = await response.json();
        return data.meals ? data.meals[0] : null;
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        return null;
    }
}

// Function to handle recipe card click
async function handleRecipeClick(meal) {
    const recipeDetails = await fetchRecipeDetails(meal.idMeal);
    if (recipeDetails) {
        renderRecipeModal(recipeDetails);
        openModal();
    } else {
        console.error('Could not load recipe details');
        // Optionally show an error message to the user
        alert('Sorry, we couldn\'t load the recipe details. Please try again later.');
    }
}

