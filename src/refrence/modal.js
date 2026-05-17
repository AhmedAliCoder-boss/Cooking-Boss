import { toggleFavorite, favorites } from './favorites.js';

// Function to extract YouTube video ID from URL
function getYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

let modal;
let modalBody;
let closeBtn;

// Initialize modal elements when DOM is loaded
function initModal() {
    if (!modal) modal = document.getElementById('recipe-modal');
    if (!modalBody) modalBody = document.getElementById('modal-body');
    if (!closeBtn) closeBtn = document.querySelector('.close-btn');

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Add close button event listener if the button exists
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModal);
} else {
    initModal();
}

export function renderRecipeModal(recipe) {
    // Initialize modal elements if not already done
    if (!modal) modal = document.getElementById('recipe-modal');
    if (!modalBody) modalBody = document.getElementById('modal-body');
    if (!closeBtn) closeBtn = document.querySelector('.close-btn');
    
    // Format ingredients and measures
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push({
                ingredient: ingredient.trim(),
                measure: measure ? measure.trim() : 'to taste'
            });
        }
    }
    
    // Format instructions (split into steps)
    const instructions = recipe.strInstructions
        .split('\r\n')
        .filter(step => step.trim() !== '');
    
    // Video section removed as per user request

    // Create modal content
    modalBody.innerHTML = `
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="modal-recipe-img">
        <div class="modal-recipe-content">
            <div class="modal-recipe-header">
                <span class="recipe-category">${recipe.strCategory}</span>
                <h2>${recipe.strMeal}</h2>
                <div class="recipe-details">
                    <div class="recipe-detail">
                        <i class="fas fa-globe"></i>
                        <span>${recipe.strArea} Cuisine</span>
                    </div>
                    <div class="recipe-detail">
                        <i class="fas fa-utensils"></i>
                        <span>${recipe.strCategory}</span>
                    </div>
                    <div class="recipe-detail">
                        <i class="fas fa-heart"></i>
                        <span>${Math.floor(Math.random() * 1000) + 50} Likes</span>
                    </div>
                </div>
            </div>
            
            <div class="ingredients">
                <h3>Ingredients</h3>
                <div class="ingredients-list">
                    ${ingredients.map(ing => `
                        <div class="ingredient">
                            <i class="fas fa-check-circle"></i>
                            <span>${ing.ingredient} <em>(${ing.measure})</em></span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="instructions">
                <h3>Instructions</h3>
                <ol>
                    ${instructions.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>
            
            ${recipe.strYoutube ? `
                <div class="video-section">
                    <h3>Video Tutorial</h3>
                    <div class="youtube-container">
                        <iframe 
                            width="100%" 
                            height="400" 
                            src="https://www.youtube.com/embed/${getYouTubeId(recipe.strYoutube)}" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
            ` : ''}
            
            <div class="modal-actions">
                <button class="view-recipe" id="add-to-favorites" data-id="${recipe.idMeal}">
                    ${favorites.some(fav => fav.idMeal === recipe.idMeal) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
                ${recipe.strSource ? `
                    <a href="${recipe.strSource}" target="_blank" class="view-recipe">
                        View Original Recipe
                    </a>
                ` : ''}
            </div>
        </div>
    `;
    
    // Add event listener to the favorite button in the modal
    const favoriteBtn = document.getElementById('add-to-favorites');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', (event) => {
            // Create a custom event-like object with the properties we need
            const customEvent = {
                target: favoriteBtn,
                currentTarget: favoriteBtn,
                stopPropagation: () => event.stopPropagation(),
                preventDefault: () => event.preventDefault(),
                // Add any other properties that toggleFavorite might expect
                type: 'click',
                data: { id: recipe.idMeal }
            };
            
            toggleFavorite(customEvent);
            
            // Update the button text
            if (favoriteBtn.textContent.includes('Remove')) {
                favoriteBtn.textContent = 'Add to Favorites';
            } else {
                favoriteBtn.textContent = 'Remove from Favorites';
            }
        });
    }
    
    // Show the modal
    modal.style.display = 'block';
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    modal.scrollTo(0, 0); // Scroll to top of modal
}

export function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    setTimeout(() => modal.classList.add('show'), 10);
}

export function closeModal() {
    // Stop any playing videos
    const iframe = modal.querySelector('iframe');
    if (iframe) {
        const iframeSrc = iframe.src;
        iframe.src = iframeSrc; // This stops the video by resetting the iframe source
    }
    
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }, 300);
}

