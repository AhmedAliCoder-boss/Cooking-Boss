// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const darkThemeStyle = document.getElementById('dark-theme-style');
    const html = document.documentElement;

    // Check for saved user preference, if any, on page load
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    
    // Only proceed if the theme toggle exists on the page
    if (themeToggle) {
        // Set the toggle state based on the current theme
        themeToggle.checked = savedTheme === 'dark';
        
        // Enable/disable dark theme styles
        if (darkThemeStyle) {
            darkThemeStyle.disabled = savedTheme !== 'dark';
        }

        // Toggle theme when the switch is clicked
        themeToggle.addEventListener('change', function() {
            const isDark = this.checked;
            const theme = isDark ? 'dark' : 'light';
            
            html.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            
            if (darkThemeStyle) {
                darkThemeStyle.disabled = !isDark;
            }
        });
    }
});
