/* SEA DIARY: MATCH EDITION 
   STABILITY RELEASE - VERSION 4.0.3
   FULL VOLUME Logic
*/

const CACHE_NAME = 'match-edition-v4.0.3-stable';

const ASSETS = [
  './',
  './index.html',
  '/competition-Scorer/manifest.json',
  '/competition-Scorer/icon.png'
];

self.addEventListener('install', (event) => {
  /* Immediate Activation */
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Caching Production Assets');
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
            console.log('SW: Purging Obsolete Cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  /* Take control of all open tabs immediately */
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      /* Priority 1: Cached File */
      if (response) {
        return response;
      }
      
      /* Priority 2: Network Fetch */
      return fetch(event.request);
    })
  );
});
