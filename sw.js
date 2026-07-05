// Daily Dashboard Service Worker — HTML always from network, cache other assets
// Version: 2026-07-05-v4 (HTML never cached, forces fresh load every time)

const CACHE = 'daily-dash-v4';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Only handle GET requests
  if (e.request.method !== 'GET') {
    e.respondWith(fetch(e.request));
    return;
  }
  // HTML pages: always fetch from network, never cache
  const url = new URL(e.request.url);
  const ext = url.pathname.split('.').pop();
  const isHTML = !ext || ext === 'html' || ext === 'htm' || url.pathname === '/' || url.pathname.endsWith('/');
  if (isHTML) {
    e.respondWith(
      fetch(e.request)
        .then(res => res)
        .catch(() => caches.match(e.request))
    );
    return;
  }
  // Non-HTML: network-first, cache for offline
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const resClone = res.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, resClone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
