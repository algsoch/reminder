// Service Worker for Advanced Payment Reminder System
const CACHE_NAME = 'payment-reminder-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/demo.html',
    '/vicky_upi.jpg',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Install service worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching app shell');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            })
    );
});

// Background sync for payment notifications
self.addEventListener('sync', event => {
    if (event.tag === 'payment-reminder') {
        event.waitUntil(
            showPaymentNotification()
        );
    }
});

// Push notifications
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Payment reminder from Vicky Kumar',
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        vibrate: [200, 100, 200],
        data: {
            url: '/'
        },
        actions: [
            {
                action: 'pay-now',
                title: 'Pay Now',
                icon: '/pay-icon.png'
            },
            {
                action: 'remind-later',
                title: 'Remind Later',
                icon: '/remind-icon.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Payment Reminder - Amit Arya', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'pay-now') {
        // Open payment page
        event.waitUntil(
            clients.openWindow('/')
        );
    } else if (event.action === 'remind-later') {
        // Schedule another reminder
        scheduleReminder();
    } else {
        // Default action - open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

async function showPaymentNotification() {
    try {
        await self.registration.showNotification('Payment Due - Amit Arya', {
            body: '₹32,272 payment due to Vicky Kumar. Tap to pay now.',
            icon: '/icon-192x192.png',
            badge: '/badge-72x72.png',
            vibrate: [300, 100, 300],
            data: { url: '/' },
            requireInteraction: true,
            actions: [
                { action: 'pay-now', title: 'Pay Now' },
                { action: 'view-details', title: 'View Details' }
            ]
        });
    } catch (error) {
        console.error('Error showing notification:', error);
    }
}

function scheduleReminder() {
    // Schedule next reminder (in a real app, this would use a backend service)
    console.log('Reminder scheduled for later');
}
