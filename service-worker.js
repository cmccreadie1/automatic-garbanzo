/* SEA DIARY: MATCH EDITION 
   OFFICIAL SERVICE WORKER - VERSION 4.0.1
   RESTORATION: FULL VOLUME Logic
*/

const CACHE_NAME = 'match-edition-v4.0.1-restored';

const ASSETS = [
  './',
  './index.html',
  '/competition-Scorer/manifest.json',
  '/competition-Scorer/icon.png'
];

self.addEventListener('install', (event) => {
  /* Force immediate activation */
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Opening Cache');
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
            console.log('Service Worker: Clearing Old Cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  /* Claim clients to ensure immediate control after update */
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      /* Return cached asset if found, otherwise fetch from network */
      if (response) {
        return response;
      }
      
      return fetch(event.request);
    })
  );
});
