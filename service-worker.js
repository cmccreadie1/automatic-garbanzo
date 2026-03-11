/* SEA DIARY: MATCH EDITION 
   OFFICIAL GOLD MASTER v2 
   FULL VOLUME SERVICE WORKER
*/

const CACHE_NAME = 'match-gold-v2-restored';

const ASSETS = [
  './',
  './index.html',
  '/competition-Scorer/manifest.json',
  '/competition-Scorer/icon.png'
];

self.addEventListener('install', (event) => {
  /* Force the waiting service worker to become active */
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache Opened: Version Gold Master v2');
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
            console.log('Clearing old cache logic');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  /* Ensure the new SW takes immediate control */
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      /* Return from cache if found */
      if (response) {
        return response;
      }
      
      /* Otherwise fetch from network */
      return fetch(event.request);
    })
  );
});
