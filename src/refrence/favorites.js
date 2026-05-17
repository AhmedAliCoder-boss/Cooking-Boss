// Favorites state
export let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

export function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Create a custom event for favorites change
function dispatchFavoritesUpdated() {
    const event = new CustomEvent('favoritesUpdated', { detail: { count: favorites.length } });
    window.dispatchEvent(event);
}

export function addToFavorites(recipe) {
    if (!favorites.some(fav => fav.idMeal === recipe.idMeal)) {
        favorites.push(recipe);
        saveFavorites();
        dispatchFavoritesUpdated();
        return true;
    }
    return false;
}

export function removeFromFavorites(recipeId) {
    const initialLength = favorites.length;
    favorites = favorites.filter(recipe => recipe.idMeal !== recipeId);
    if (favorites.length !== initialLength) {
        saveFavorites();
        dispatchFavoritesUpdated();
        return true;
    }
    return false;
}

export function toggleFavorite(e, recipe = null) {
    e.stopPropagation();
    const recipeId = e.currentTarget.dataset.id;
    const recipeCard = e.currentTarget.closest('.recipe-card');
    
    if (favorites.some(fav => fav.idMeal === recipeId)) {
        // Remove from favorites
        removeFromFavorites(recipeId);
        e.currentTarget.classList.remove('favorited');
        if (recipeCard) {
            recipeCard.classList.add('removing-favorite');
            setTimeout(() => recipeCard.classList.remove('removing-favorite'), 500);
        }
    } else {
        // Add to favorites
        if (recipe) {
            // Use the provided recipe object
            if (addToFavorites(recipe)) {
                e.currentTarget.classList.add('favorited');
                if (recipeCard) {
                    recipeCard.classList.add('adding-favorite');
                    setTimeout(() => recipeCard.classList.remove('adding-favorite'), 500);
                }
            }
        } else {
            // Fallback to DOM-based approach if no recipe object provided
            const recipeElement = document.querySelector(`.recipe-card[data-id="${recipeId}"]`);
            if (recipeElement) {
                const recipeData = {
                    idMeal: recipeId,
                    strMeal: recipeElement.querySelector('h3')?.textContent || 'Unknown Recipe',
                    strMealThumb: recipeElement.querySelector('img')?.src || '',
                    strCategory: recipeElement.querySelector('.recipe-meta span:first-child')?.textContent.replace('\n', '').trim() || 'Uncategorized',
                    strArea: recipeElement.querySelector('.recipe-meta span:last-child')?.textContent.replace('\n', '').trim() || 'Unknown',
                    strInstructions: '',
                    strTags: '',
                    strYoutube: '',
                    strSource: ''
                };
                
                if (addToFavorites(recipeData)) {
                    e.currentTarget.classList.add('favorited');
                    if (recipeCard) {
                        recipeCard.classList.add('adding-favorite');
                        setTimeout(() => recipeCard.classList.remove('adding-favorite'), 500);
                    }
                }
            }
        }
    }
    
    // Update favorites display if on favorites page
    if (window.location.pathname.includes('favorites.html')) {
        renderFavorites();
    }
}

// Function to show recipe details when a favorite is clicked
async function showRecipeDetails(recipeId) {
    try {
        // Show loading state
        const modal = document.getElementById('recipe-modal');
        if (modal) {
            modal.style.display = 'block';
            modal.querySelector('.modal-content').innerHTML = '<div class="loading">Loading recipe details...</div>';
        }

        // Find the recipe in favorites
        const recipe = favorites.find(fav => fav.idMeal === recipeId);
        
        if (recipe) {
            // If we already have full recipe details, show them
            if (recipe.strInstructions) {
                const { renderRecipeModal, openModal } = await import('./modal.js');
                renderRecipeModal(recipe);
                openModal();
            } else {
                // Otherwise, fetch full recipe details
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
                const data = await response.json();
                
                if (data.meals && data.meals[0]) {
                    const { renderRecipeModal, openModal } = await import('./modal.js');
                    renderRecipeModal(data.meals[0]);
                    openModal();
                }
            }
        }
    } catch (error) {
        console.error('Error showing recipe details:', error);
        const modal = document.getElementById('recipe-modal');
        if (modal) {
            modal.querySelector('.modal-content').innerHTML = `
                <div class="error-message">
                    <p>Failed to load recipe details. Please try again.</p>
                    <button onclick="document.getElementById('recipe-modal').style.display='none'">Close</button>
                </div>`;
        }
    }
}

export function renderFavorites() {
    const favoritesContainer = document.getElementById('favorites-container');
    if (!favoritesContainer) return;
    
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = `
            <div class="no-favorites">
                <i class="fas fa-heart"></i>
                <h3>No favorite recipes yet</h3>
                <p>Click the heart icon on any recipe to add it to your favorites</p>
            </div>`;
        return;
    }
    
    // Group favorites by category
    const favoritesByCategory = {};
    favorites.forEach(recipe => {
        const category = recipe.strCategory || 'Uncategorized';
        if (!favoritesByCategory[category]) {
            favoritesByCategory[category] = [];
        }
        favoritesByCategory[category].push(recipe);
    });
    
    // Render favorites by category
    favoritesContainer.innerHTML = Object.entries(favoritesByCategory)
        .map(([category, recipes]) => `
            <div class="favorites-category">
                <h3>${category} <span>(${recipes.length})</span></h3>
                <div class="favorites-grid">
                    ${recipes.map(recipe => `
                        <div class="favorite-recipe" data-id="${recipe.idMeal}">
                            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                            <div class="favorite-recipe-info">
                                <h4>${recipe.strMeal}</h4>
                                <p>${recipe.strArea || 'International'}</p>
                                <button class="remove-favorite" data-id="${recipe.idMeal}">
                                    <i class="fas fa-times"></i> Remove
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    
    // Add event listeners
    favoritesContainer.querySelectorAll('.favorite-recipe').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.remove-favorite')) {
                showRecipeDetails(card.dataset.id);
            }
        });
    });
    
    favoritesContainer.querySelectorAll('.remove-favorite').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const recipeId = btn.dataset.id;
            removeFromFavorites(recipeId);
            renderFavorites();
        });
    });
}

