/* SEA DIARY: MATCH EDITION 
   VERSION 4.3.0 - FINAL POLISH
   FULL VOLUME SERVICE WORKER
*/

const CACHE_NAME = 'match-edition-v4.3.0-polish';

const ASSETS = [
  './',
  './index.html',
  '/competition-Scorer/manifest.json',
  '/competition-Scorer/icon.png'
];

self.addEventListener('install', (event) => {
  /* Force immediate update of the guide text and UI controls */
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Caching Polish Build 4.3.0 Assets');
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
  
  /* Ensure the SW takes immediate control of the active page */
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      /* Priority 1: Instant cache load for field reliability */
      if (response) {
        return response;
      }
      
      /* Priority 2: Network fetch for live match synchronization */
      return fetch(event.request);
    })
  );
});
