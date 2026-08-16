const CACHE_NAME = 'tuki-family-v33'
const urlsToCache = ['/', '/index.html']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  )
  self.skipWaiting()
})

/**
 * Die Seite selbst kommt zuerst aus dem Netz, alles andere zuerst aus dem Cache.
 *
 * Vorher war auch index.html cache-first. Damit blieb bei jedem, der die App
 * schon einmal geoeffnet hatte, die alte Seite stehen: sie verwies auf das alte
 * JavaScript, und neue Versionen kamen nie an. Offline funktioniert weiterhin
 * alles, dann greift der Cache als Rueckfallebene.
 */
self.addEventListener('fetch', (event) => {
  const istSeite = event.request.mode === 'navigate' || event.request.destination === 'document'

  if (istSeite) {
    event.respondWith(
      fetch(event.request)
        .then((antwort) => {
          const kopie = antwort.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put('/index.html', kopie))
          return antwort
        })
        .catch(() => caches.match(event.request).then((r) => r || caches.match('/index.html')))
    )
    return
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
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
    icon: '/tuki-icon-192.png',
    badge: '/tuki-icon-192.png',
    tag: data.tag || 'tuki-daily',
    data: { url: data.url || '/' },
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
  const url = event.notification.data?.url || '/'
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.startsWith(self.location.origin) && 'focus' in client) {
          return client.focus()
        }
      }
      return clients.openWindow(url)
    })
  )
})