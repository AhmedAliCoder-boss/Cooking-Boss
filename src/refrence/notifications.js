// Notification messages
const notificationMessages = [
    { 
        title: '🍳 Time to Cook!', 
        body: 'Discover new recipes and cook something delicious today!',
        icon: '/images/icon.png',
        badge: '/images/icon-192x192.png'
    },
    { 
        title: '👨‍🍳 Chef\'s Special', 
        body: 'Check out today\'s featured recipe!',
        icon: '/images/icon.png',
        badge: '/images/icon-192x192.png'
    },
    { 
        title: '🥗 Healthy Eating', 
        body: 'Try our healthy recipe suggestions for today!',
        icon: '/images/icon.png',
        badge: '/images/icon-192x192.png'
    },
    { 
        title: '🍽️ Dinner Ideas', 
        body: 'Need dinner inspiration? We\'ve got you covered!',
        icon: '/images/icon.png',
        badge: '/images/icon-192x192.png'
    }
];

export async function requestNotificationPermission() {
    if (!('Notification' in window)) {
        console.log('This browser does not support notifications');
        return false;
    }

    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Notification permission granted');
            return true;
        } else {
            console.log('Notification permission denied');
            return false;
        }
    } catch (error) {
        console.error('Error requesting notification permission:', error);
        return false;
    }
}

function showRandomNotification() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.log('Push notifications not supported');
        return;
    }

    navigator.serviceWorker.ready.then(registration => {
        const notification = notificationMessages[Math.floor(Math.random() * notificationMessages.length)];
        return registration.showNotification(notification.title, {
            body: notification.body,
            icon: notification.icon,
            badge: notification.badge,
            vibrate: [200, 100, 200]
        });
    }).catch(error => {
        console.error('Error showing notification:', error);
    });
}

export function scheduleDailyNotifications() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.log('Push notifications not supported');
        return;
    }

    // Schedule notifications at different times of the day
    const now = new Date();
    const times = [
        { hours: 9, minutes: 0 },   // 9 AM
        { hours: 12, minutes: 0 },  // 12 PM
        { hours: 15, minutes: 0 },  // 3 PM
        { hours: 18, minutes: 0 }   // 6 PM
    ];

    times.forEach(time => {
        const notificationTime = new Date();
        notificationTime.setHours(time.hours, time.minutes, 0, 0);

        // If the time has already passed today, schedule for tomorrow
        if (notificationTime <= now) {
            notificationTime.setDate(notificationTime.getDate() + 1);
        }

        const delay = notificationTime.getTime() - now.getTime();

        console.log(`Scheduling notification at ${time.hours}:${time.minutes < 10 ? '0' + time.minutes : time.minutes}`);
        
        // Initial timeout for today/tomorrow
        setTimeout(() => {
            showRandomNotification();
            
            // Then set up daily intervals
            setInterval(() => {
                showRandomNotification();
            }, 24 * 60 * 60 * 1000); // 24 hours
            
        }, delay);
    });
}

