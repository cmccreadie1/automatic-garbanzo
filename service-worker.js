/* SEA DIARY: MATCH EDITION 
   OFFICIAL SERVICE WORKER - VERSION 4.0.2
   FULL VOLUME EXPANSION
*/

const CACHE_NAME = 'match-edition-v4.0.2-ironclad';

const ASSETS = [
  './',
  './index.html',
  '/competition-Scorer/manifest.json',
  '/competition-Scorer/icon.png'
];

self.addEventListener('install', (event) => {
  /* Skip waiting to ensure the update applies immediately */
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching Assets');
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
            console.log('Service Worker: Deleting Old Cache');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  /* Ensure the new Service Worker takes control immediately */
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      /* If asset is in cache, return it. Otherwise, fetch from network. */
      if (response) {
        return response;
      }
      
      return fetch(event.request);
    })
  );
});
