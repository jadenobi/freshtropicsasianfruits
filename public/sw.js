// Service Worker for Fresh Tropics PWA
// Implements offline support, caching strategies, and push notifications

const CACHE_NAME = 'fresh-tropics-v1'
const RUNTIME_CACHE = 'fresh-tropics-runtime-v1'
const API_CACHE = 'fresh-tropics-api-v1'
const IMAGE_CACHE = 'fresh-tropics-images-v1'

const STATIC_ASSETS = [
  '/',
  '/offline',
  '/favicon.ico',
  '/globals.css',
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.log('Cache install error:', err)
      })
    })
  )
  self.skipWaiting()
})

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME &&
              cacheName !== RUNTIME_CACHE &&
              cacheName !== API_CACHE &&
              cacheName !== IMAGE_CACHE
          })
          .map((cacheName) => caches.delete(cacheName))
      )
    })
  )
  self.clients.claim()
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // API requests - network first with cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const cache = caches.open(API_CACHE)
          cache.then((c) => c.put(request, response.clone()))
          return response
        })
        .catch(() => {
          return caches.match(request).then((response) => {
            return response || new Response('Offline - API unavailable', { status: 503 })
          })
        })
    )
    return
  }

  // Image requests - cache first with network fallback
  if (request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) return response

          return fetch(request).then((networkResponse) => {
            cache.put(request, networkResponse.clone())
            return networkResponse
          }).catch(() => {
            return new Response(null, { status: 404 })
          })
        })
      })
    )
    return
  }

  // HTML pages - network first with cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const cache = caches.open(RUNTIME_CACHE)
          cache.then((c) => c.put(request, response.clone()))
          return response
        })
        .catch(() => {
          return caches.match(request).then((response) => {
            if (response) return response
            return caches.match('/offline')
          })
        })
    )
    return
  }

  // Other requests - cache first with network fallback
  event.respondWith(
    caches.match(request).then((response) => {
      if (response) return response

      return fetch(request).then((networkResponse) => {
        const cache = caches.open(RUNTIME_CACHE)
        cache.then((c) => c.put(request, networkResponse.clone()))
        return networkResponse
      }).catch(() => {
        return new Response('Offline', { status: 503 })
      })
    })
  )
})

// Push notification event
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {}
  const title = data.title ?? 'Fresh Tropics'
  const options = {
    body: data.body ?? 'New update available',
    icon: '/logo.svg',
    badge: '/logo.svg',
    tag: data.tag ?? 'notification',
    requireInteraction: false,
    actions: [
      {
        action: 'open',
        title: 'Open App',
      },
      {
        action: 'close',
        title: 'Dismiss',
      },
    ],
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'close') {
    return
  }

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // Focus existing window if available
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i]
        if ('focus' in client) {
          return client.focus()
        }
      }
      // Open new window if none exist
      if (clients.openWindow) {
        return clients.openWindow('/')
      }
    })
  )
})

// Background sync for orders
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-orders') {
    event.waitUntil(
      fetch('/api/orders/sync', { method: 'POST' })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Sync failed')
          }
        })
        .catch(() => {
          // Retry sync
          return self.registration.sync.register('sync-orders')
        })
    )
  }
})

// Message handler for client communication
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
