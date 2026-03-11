/* SEA DIARY: MATCH EDITION 
   OFFICIAL STABILITY BUILD - VERSION 4.0.5
   FULL VOLUME Logic
*/

const CACHE_NAME = 'match-edition-v4.0.5-direct';

const ASSETS = [
  './',
  './index.html',
  '/competition-Scorer/manifest.json',
  '/competition-Scorer/icon.png'
];

self.addEventListener('install', (event) => {
  /* Force immediate activation of the new logic */
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching Gold Master Assets');
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
            console.log('Service Worker: Purging Old Cache Storage');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  /* Take control of all clients to ensure the fix applies everywhere */
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      /* Priority 1: Cache response for speed and offline stability */
      if (response) {
        return response;
      }
      
      /* Priority 2: Network fetch for live data sync */
      return fetch(event.request);
    })
  );
});
