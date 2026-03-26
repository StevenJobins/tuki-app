const CACHE_NAME = 'tuki-family-v17'
const urlsToCache = ['/tuki-app/', '/tuki-app/index.html']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  )
  self.skipWaiting()
})

self.addEventListener('fetch', (event) => {
  // Never cache API calls (Supabase, etc.)
  if (event.request.url.includes('supabase.co') || event.request.url.includes('/auth/') || event.request.url.includes('/rest/')) {
    return
  }
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((response) => {
        if (response) return response
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
