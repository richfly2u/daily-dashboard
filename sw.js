// Daily Dashboard Service Worker — always fetch from network, never cache
// Version: 2026-07-05-v3 (bumped to force cache refresh for reorder feature)

const CACHE = 'daily-dash-v3';

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
  // Only cache GET requests for static assets
  if (e.request.method !== 'GET') {
    e.respondWith(fetch(e.request));
    return;
  }
  // Network-first: try network, fallback to cache only if offline
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Clone response for cache (only static resources)
        const resClone = res.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, resClone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
