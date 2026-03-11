/* SEA DIARY: MATCH EDITION 
   VERSION 4.3.2 - TERMINAL SHUTDOWN
   FULL VOLUME SERVICE WORKER
*/

const CACHE_NAME = 'match-edition-v4.3.2-shutdown';

const ASSETS = [
  './',
  './index.html',
  '/competition-Scorer/manifest.json',
  '/competition-Scorer/icon.png'
];

self.addEventListener('install', (event) => {
  /* Immediate takeover of the terminal lockdown logic */
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Caching Gold Master 4.3.2 Assets');
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('SW: Purging Previous Version Cache');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  /* Finalize synchronization across all open instances */
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      /* Priority 1: Instant cache load for match site stability */
      if (response) {
        return response;
      }
      
      /* Priority 2: Network fetch for live cloud data updates */
      return fetch(event.request);
    })
  );
});
