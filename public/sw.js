const CACHE_NAME = "starpedia-cache-v1";
const urlsToCache = ["index.html", "instructions.html", "images.html", "search.html",
    "/styles.css",
    "/scripts/index.js", "/scripts/theme.js", "/scripts/search.js",
    "images/death-star-192x192.png", "images/death-star-512x512.png",
    "images/Admiral-Akbar-600x600.jpg",
    "images/c3po-600x600.jpg",
    "images/storm-trooper-600x400.jpg",
    "images/tuscan-raider.gif"];

self.addEventListener("install", function (event) {
    //Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
                //If in cache then return, else, go to network
                return response || fetch(event.request);
            })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName.startsWith("starpedia-cache-") && CACHE_NAME !== cacheName) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
