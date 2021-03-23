const CACHE_NAME = "starpedia-cache-v1";
const urlsToCache = ["index.html","about.html", "instructions.html", "search.html",
                    "/styles.css",
                    "/scripts/index.js", "/scripts/theme.js", "/scripts/search.js"];

self.addEventListener("install", function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log("Opened cache");
                return cache.addAll(urlsToCache);
            })
    );
});

// Intercept any network requests
self.addEventListener("fetch", function(event) {    
    // We have intercepted a fetch request, how should we respond?
    // -> If we have a match for the resource in our cache, respond with it!
    // -> Otherwise, return an "outside" fetch request for it (try to go to the network to get it)
    event.respondWith(
        caches.match(event.request).then(function(response){
            // Did we find a match for this request in our caches?
            if(response){
                // Yes, return it from the cache
                console.log(`Returning ${event.request.url} from cache!`);
                return response;
            }
            // No, so return an outside fetch request for it (go to network)
                console.log(`Sorry, ${event.request.url} not found in cache`);
            return fetch(event.request);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName.startsWith("starpedia-cache-") && CACHE_NAME !== cacheName) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
  