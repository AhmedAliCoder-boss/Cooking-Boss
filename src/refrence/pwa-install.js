// PWA Installation Handler
class PWAInstallHandler {
    constructor() {
        this.installPrompt = null;
        this.installButton = document.getElementById('installPWA');
        
        // Only run in browser context
        if (typeof window !== 'undefined') {
            this.init();
        }
    }

    init() {
        // Check if the browser supports PWA installation
        if (!this.isPWACompatible()) {
            this.installButton.style.display = 'none';
            return;
        }

        // Check if the app is already installed
        if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
            this.installButton.style.display = 'none';
        }

        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later
            this.installPrompt = e;
            // Show the install button
            this.installButton.style.display = 'inline-flex';
        });

        // Handle install button click
        if (this.installButton) {
            this.installButton.addEventListener('click', () => this.installApp());
        }

        // Track successful installation
        window.addEventListener('appinstalled', () => {
            console.log('App was installed');
            this.installButton.style.display = 'none';
        });
    }

    isPWACompatible() {
        return (
            'serviceWorker' in navigator &&
            'BeforeInstallPromptEvent' in window &&
            window.matchMedia('(display-mode: standalone)').matches === false
        );
    }

    async installApp() {
        if (!this.installPrompt) {
            return;
        }

        // Show the install prompt
        this.installPrompt.prompt();
        
        // Wait for the user to respond to the prompt
        const { outcome } = await this.installPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        
        // Clear the saved prompt since it can only be used once
        this.installPrompt = null;
        
        // Hide the install button
        this.installButton.style.display = 'none';
    }
}

// Initialize PWA installation handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize in browser context
    if (typeof window !== 'undefined') {
        new PWAInstallHandler();
    }
});

