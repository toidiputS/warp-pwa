const CACHE_NAME = 'warp-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/index.css',
];

// Install — cache shell assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// Fetch — network-first for API calls, cache-first for assets
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Skip non-GET and chrome-extension requests
    if (request.method !== 'GET' || request.url.startsWith('chrome-extension')) return;

    // Network-first for API / Gemini calls
    if (request.url.includes('generativelanguage.googleapis.com')) {
        event.respondWith(
            fetch(request).catch(() => caches.match(request))
        );
        return;
    }

    // Cache-first for static assets, fallback to network
    event.respondWith(
        caches.match(request).then((cached) => {
            const fetchPromise = fetch(request).then((response) => {
                // Cache successful responses
                if (response && response.status === 200 && response.type === 'basic') {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                }
                return response;
            }).catch(() => cached);

            return cached || fetchPromise;
        })
    );
});
