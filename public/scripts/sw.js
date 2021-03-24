const CACHE_NAME = "starpedia-cache-v1";
const urlsToCache = ["index.html","images.html", "instructions.html", "search.html",
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

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                return response || fetch(event.request); /*If in cache then return, else, go to newtwork*/
            })
    );
});

self.addEventListener("activate", function(event) {
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


