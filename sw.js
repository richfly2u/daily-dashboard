// Daily Dashboard Service Worker — always fetch from network, never cache
// Version: 2026-05-26-v2 (changed version to bust all caches)

const CACHE = 'daily-dash-v2';

self.addEventListener('install', e => {
  // Don't pre-cache anything — let network handle it
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Delete ALL old caches
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Network-first: try network, fallback to cache only if offline
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Clone response for cache
        const resClone = res.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, resClone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
