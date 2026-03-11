/* SEA DIARY: MATCH EDITION 
   ELEMENT LOCK BUILD - VERSION 4.0.8
   FULL VOLUME Logic
*/

const CACHE_NAME = 'match-edition-v4.0.8-stable';

const ASSETS = [
  './',
  './index.html',
  '/competition-Scorer/manifest.json',
  '/competition-Scorer/icon.png'
];

self.addEventListener('install', (event) => {
  /* Force the update to take effect immediately */
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Opening fresh cache for v4.0.8');
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
            console.log('SW: Purging old logic cache');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  /* Take control of all open pages */
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      /* Return from cache if possible, otherwise fetch */
      if (response) {
        return response;
      }
      
      return fetch(event.request);
    })
  );
});
