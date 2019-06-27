// cache names
const STATIC_CACHE = 'static-site-cache';
const DYNAMIC_CHACHE = 'dynamic-site-cache';

// static resources
const STATIC_CACHE_LIST = [
  '/awt-pwa/', '/awt-pwa/data/videos.json', '/awt-pwa/manifest.json',
  '/awt-pwa/favicon.ico', '/awt-pwa/asset-manifest.json', '/awt-pwa/index.html',
  '/awt-pwa/static/js/2.2c4eb6d8.chunk.js',
  '/awt-pwa/static/js/main.ec5e1fd6.chunk.js',
  '/awt-pwa/static/js/runtime~main.a5205106.js',
  '/awt-pwa/static/css/2.266e55a5.chunk.css',
  '/awt-pwa/precache-manifest.7c7249dae3d0b8c2832489efcb235b0d.js'
];

// caches static resources
self.addEventListener('install', function(event) {
  event.waitUntil(
      caches.open(STATIC_CACHE)
          .then(function(cache) {
            return cache.addAll(STATIC_CACHE_LIST);
          })
          .then(self.skipWaiting())  // run new service worker right away
          .then(success => console.log('Static resources cached'))
          .catch(
              error => console.log(
                  'An Error occured while caching static resources!', error)));
});


// garbage collector for old caches
self.addEventListener('activate', function(event) {
  // checks of cache types
  let cacheList = [STATIC_CACHE, DYNAMIC_CHACHE];

  event.waitUntil(
      caches.keys()
          .then(function(cacheNames) {
            return cacheNames.filter(
                cacheName =>
                    !cacheList.includes(cacheName));  // find old caches
          })
          .then(function(cachesToDelete) {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
              return caches.delete(cacheToDelete);  // delete cache
            }));
          })
          .then(() => self.clients.claim())
          .then(success => console.log('Old caches successfully deleted.'))
          .catch(
              error => console.log(
                  'An Error occured while deleting old caches!', error)));
});


// handle fetch events
self.addEventListener('fetch', function(event) {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(caches.match(event.request).then(function(cachedResp) {
      // try to find cached resources
      if (cachedResp) {
        return cachedResp;
      } else {
        // fallback: make network request and cache new resources
        return caches.open(DYNAMIC_CHACHE).then(function(cache) {
          console.log('Cache opened.');
          return fetch(event.request).then(function(resp) {
            console.log('Data fetched.');
            return cache.put(event.request, resp.clone()).then(() => {
              console.log('Data cached.');
              return resp;
            });
          });
        });
      }
    }));
  }
});