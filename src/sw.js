// Service Worker for Paradise Nursery PWA
// This file handles offline functionality and caching

const CACHE_NAME = 'paradise-nursery-v1'
const STATIC_CACHE = 'paradise-nursery-static-v1'
const DYNAMIC_CACHE = 'paradise-nursery-dynamic-v1'

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/vite.svg',
  '/src/main.jsx',
  '/src/App.jsx',
  '/src/style.css'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        return self.skipWaiting()
      })
  )
})

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE
            })
            .map((cacheName) => {
              console.log('Service Worker: Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            })
        )
      })
      .then(() => {
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip chrome-extension and moz-extension requests
  if (url.protocol === 'chrome-extension:' || url.protocol === 'moz-extension:') {
    return
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Serve from cache
          return cachedResponse
        }

        // Network request with caching
        return fetch(request)
          .then((networkResponse) => {
            // Don't cache non-successful responses
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse
            }

            // Clone the response for caching
            const responseToCache = networkResponse.clone()

            // Cache based on URL patterns
            if (shouldCacheDynamically(request.url)) {
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseToCache)
                })
            }

            return networkResponse
          })
          .catch((error) => {
            console.log('Service Worker: Network request failed:', error)

            // Return offline fallback for navigation requests
            if (request.destination === 'document') {
              return caches.match('/index.html')
            }

            // Return a generic offline response for other requests
            return new Response('Offline content not available', {
              status: 503,
              statusText: 'Service Unavailable'
            })
          })
      })
  )
})

// Helper function to determine if a request should be cached dynamically
function shouldCacheDynamically(url) {
  // Cache images from Unsplash
  if (url.includes('images.unsplash.com')) {
    return true
  }

  // Cache API responses
  if (url.includes('/api/')) {
    return true
  }

  // Cache fonts
  if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) {
    return true
  }

  return false
}

// Handle background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered')

  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle any queued actions when back online
      handleBackgroundSync()
    )
  }
})

async function handleBackgroundSync() {
  // This would handle any offline actions like form submissions
  // when the user comes back online
  console.log('Service Worker: Handling background sync')
}

// Handle push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received')

  const options = {
    body: event.data ? event.data.text() : 'New update from Paradise Nursery!',
    icon: '/vite.svg',
    badge: '/vite.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/vite.svg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/vite.svg'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('Paradise Nursery', options)
  )
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked')

  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})