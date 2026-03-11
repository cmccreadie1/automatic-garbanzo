/* SEA DIARY: MATCH EDITION 
   DIAGNOSTIC BUILD - VERSION 4.0.6
   FULL VOLUME SERVICE WORKER
*/

const CACHE_NAME = 'match-edition-v4.0.6-diagnostic';

const ASSETS = [
  './',
  './index.html',
  '/competition-Scorer/manifest.json',
  '/competition-Scorer/icon.png'
];

self.addEventListener('install', (event) => {
  /* Force the new diagnostic logic to take over immediately */
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching Gold Master v2 Assets');
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
            console.log('Service Worker: Clearing Legacy Cache');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  /* Ensure the diagnostic SW takes control of all pages */
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      /* Priority 1: Instant load from cache */
      if (response) {
        return response;
      }
      
      /* Priority 2: Live network fetch for real-time scoring */
      return fetch(event.request);
    })
  );
});
