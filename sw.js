const CACHE_NAME = 'tuki-family-v31'
const urlsToCache = ['/tuki-app/', '/tuki-app/index.html']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  )
  self.skipWaiting()
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        if (event.request.destination === 'document') {
          return caches.match('/tuki-app/index.html')
        }
      })
    })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    })
  )
  self.clients.claim()
})


// Push notification handler
self.addEventListener('push', (event) => {
  let data = { title: 'Tuki Family', body: 'Du hast neue Inhalte!' }
  try {
    if (event.data) data = event.data.json()
  } catch (e) {}

  const options = {
    body: data.body || 'Schau vorbei!',
    icon: '/tuki-app/tuki-icon-192.png',
    badge: '/tuki-app/tuki-icon-192.png',
    tag: data.tag || 'tuki-daily',
    data: { url: data.url || '/tuki-app/' },
    actions: data.actions || [
      { action: 'open', title: 'Anschauen' }
    ],
    vibrate: [100, 50, 100]
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'Tuki Family', options)
  )
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data?.url || '/tuki-app/'
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('tuki-app') && 'focus' in client) {
          return client.focus()
        }
      }
      return clients.openWindow(url)
    })
  )
})