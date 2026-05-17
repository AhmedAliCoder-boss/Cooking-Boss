// PWA Install Prompt
let deferredPrompt;

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt event fired');
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show the browser's native install prompt after a short delay
    // This gives the page time to load before showing the prompt
    setTimeout(() => {
        if (deferredPrompt) {
            console.log('Showing install prompt automatically');
            deferredPrompt.prompt();
            
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                console.log('User response to install prompt:', choiceResult.outcome);
                deferredPrompt = null;
            });
        }
    }, 3000); // 3 second delay before showing the prompt
});

// Listen for app installed event
window.addEventListener('appinstalled', () => {
    console.log('App was installed');
    deferredPrompt = null;
});

