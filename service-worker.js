/* SEA DIARY: MATCH EDITION 
   VERSION 4.3.7 - STEWARD DELEGATION FIX
   FULL VOLUME SERVICE WORKER
*/

const CACHE_NAME = 'match-edition-v4.3.7-fullfix';

const ASSETS = [
  './',
  './index.html',
  '/competition-Scorer/manifest.json',
  '/competition-Scorer/icon.png'
];

self.addEventListener('install', (event) => {
  /* Force the corrected logic to take effect immediately */
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Caching Gold Master 4.3.7 Full Assets');
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
            console.log('SW: Purging Legacy Logic');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  /* Synchronize all clients for universal stability */
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      /* Priority 1: Instant cache load for reliability */
      if (response) {
        return response;
      }
      
      /* Priority 2: Network fetch for live sync */
      return fetch(event.request);
    })
  );
});
