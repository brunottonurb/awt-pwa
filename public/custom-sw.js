// create two cache types
const STATIC_CACHE = 'static-site-cache';
const DYNAMIC_CHACHE = 'dynamic-site-cache';

// required static resources
const STATIC_CACHE_LIST = [
  '/awt-pwa/', '/awt-pwa/data/videos.json', '/awt-pwa/manifest.json',
  '/awt-pwa/favicon.ico', '/awt-pwa/asset-manifest.json', '/awt-pwa/index.html',
  '/awt-pwa/icons/faviconSmall.png', '/awt-pwa/icons/faviconMedium.png',
  '/awt-pwa/icons/faviconLarge.png', '/awt-pwa/icons/faviconExtraLarge.png',
  '/awt-pwa/static/css/2.d64b8b57.chunk.css',
  '/awt-pwa/static/js/2.9583270a.chunk.js',
  '/awt-pwa/static/js/main.28749014.chunk.js',
  '/awt-pwa/static/js/runtime~main.a5205106.js',
  '/awt-pwa/precache-manifest.6f3dcfd772731b366c74368802f42947.js'
];

// initiate cache with static resources
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(function (cache) {
        return cache.addAll(STATIC_CACHE_LIST);
      })
      .then(self.skipWaiting())  // run new service worker right away
      //.then(success => console.log('Resources cached'))
      .catch(
        error => console.log(
          'An Error occured while caching static resources!', error)));
});


// delete old cache
self.addEventListener('activate', function (event) {
  // checks both cache types
  let cacheList = [STATIC_CACHE, DYNAMIC_CHACHE];

  event.waitUntil(
    caches.keys()
      .then(function (cacheNames) {
        return cacheNames.filter(
          cacheName =>
            !cacheList.includes(cacheName));  // find old files
      })
      .then(function (cachesToDelete) {
        return Promise.all(cachesToDelete.map(cacheToDelete => {
          return caches.delete(cacheToDelete);  // delete files
        }));
      })
      .then(() => self.clients.claim())
      //.then(success => console.log('Old caches successfully deleted.'))
      .catch(
        error => console.log(
          'An Error occured while deleting old caches!', error)));
});


// handle fetch events
self.addEventListener('fetch', function (event) {
  //check origin
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(caches.match(event.request).then(function (cachedResp) {
      // try to find cached resources
      if (cachedResp) {
        return cachedResp;
      } else {
        // fallback: make network request and cache new resources
        return caches.open(DYNAMIC_CHACHE).then(function (cache) {
          //console.log('Cache opened.');
          return fetch(event.request).then(function (resp) {
            //console.log('Data fetched.');
            return cache.put(event.request, resp.clone()).then(() => {
              //console.log('Data cached.');
              return resp;
            });
          });
        });
      }
    }));
  }
});