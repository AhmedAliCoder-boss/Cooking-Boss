document.addEventListener('DOMContentLoaded', () => {
            const foodItems = document.querySelectorAll('.food-item');
            const centerX = 100; // Center of the loader
            const centerY = 100; // Center of the loader
            const radius = 70; // Distance from center
            const totalItems = foodItems.length;
            let currentIndex = 0;
            
            // Position food items in a circle
            foodItems.forEach((item, index) => {
                const angle = (index / totalItems) * Math.PI * 2;
                const x = centerX + radius * Math.cos(angle) - 25; // 25 is half of item width
                const y = centerY + radius * Math.sin(angle) - 25; // 25 is half of item height
                
                item.style.left = `${x}px`;
                item.style.top = `${y}px`;
                item.style.backgroundColor = item.style.getPropertyValue('--color');
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
            });

            // Add pulsing animation to center circle
            const centerCircle = document.querySelector('.center-circle');
            const pulse = () => {
                centerCircle.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    centerCircle.style.transform = 'scale(1)';
                }, 300);
            };
            
            // Initial pulse
            pulse();
            
            // Continuous pulsing
            setInterval(pulse, 1500);

            // Steam animation
            function createSteam() {
                const steam = document.createElement('div');
                steam.className = 'steam';
                
                // Random size between 10-20px
                const size = Math.random() * 10 + 10;
                steam.style.width = `${size}px`;
                steam.style.height = `${size}px`;
                
                // Random position around the center
                const angle = Math.random() * Math.PI * 2;
                const distance = 15 + Math.random() * 15;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                steam.style.left = `calc(50% + ${x}px)`;
                steam.style.top = `calc(50% + ${y}px)`;
                
                // Random animation duration
                const duration = 1 + Math.random() * 1.5;
                steam.style.animation = `steam ${duration}s ease-out forwards`;
                
                centerCircle.appendChild(steam);
                
                // Remove steam element after animation completes
                setTimeout(() => {
                    steam.remove();
                }, duration * 1000);
            }
            
            // Create steam periodically
            setInterval(createSteam, 300);
            
            // Animate food items one by one
            function animateItems(forward = true) {
                if (forward && currentIndex >= foodItems.length) {
                    // All items have been shown, now reverse the animation
                    currentIndex = foodItems.length - 1;
                    setTimeout(() => animateItems(false), 300);
                    return;
                } else if (!forward && currentIndex < 0) {
                    // All items have been hidden, start over
                    currentIndex = 0;
                    setTimeout(animateItems, 1000);
                    return;
                }
                
                const item = foodItems[currentIndex];
                const isLeft = currentIndex % 2 === 0;
                
                if (forward) {
                    // Slide in animation
                    item.style.opacity = '0';
                    item.style.animation = isLeft 
                        ? 'slideInLeft 0.6s forwards' 
                        : 'slideInRight 0.6s forwards';
                    currentIndex++;
                } else {
                    // Slide out animation (reverse order)
                    item.style.animation = isLeft 
                        ? 'slideOutRight 0.6s forwards' 
                        : 'slideOutLeft 0.6s forwards';
                    currentIndex--;
                }
                
                setTimeout(() => animateItems(forward), 60); // Delay between items
            }
            
            // Start the animation sequence
            setTimeout(animateItems, 500);
        });
