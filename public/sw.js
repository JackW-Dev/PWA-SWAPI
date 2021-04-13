const CACHE_NAME = "starpedia-cache-v1";
const urlsToCache = ["index.html", "instructions.html", "images.html", "search.html",
    "/styles.css",
    "/scripts/index.js", "/scripts/theme.js", "/scripts/search.js",
    "images/death-star-192x192.png", "images/death-star-512x512.png",
    "images/admiral-akbar/landscape/admiral-akbar-2400x1600.webp", "images/admiral-akbar/landscape/admiral-akbar-2400x1600.jpg",
    "images/admiral-akbar/landscape/admiral-akbar-1200x800.webp", "images/admiral-akbar/landscape/admiral-akbar-1200x800.jpg",
    "images/admiral-akbar/square/admiral-akbar-800x800.webp", "images/admiral-akbar/square/admiral-akbar-800x800.jpg",
    "images/admiral-akbar/square/admiral-akbar-400x400.webp", "images/admiral-akbar/square/admiral-akbar-400x400.jpg",
    "images/c3po/landscape/c3po-2400x1600.webp", "images/c3po/landscape/c3po-2400x1600.jpg",
    "images/c3po/landscape/c3po-1200x800.webp", "images/c3po/landscape/c3po-1200x800.jpg",
    "images/c3po/square/c3po-800x800.webp", "images/c3po/square/c3po-800x800.jpg",
    "images/c3po/square/c3po-400x400.webp", "images/c3po/square/c3po-400x400.jpg",
    "images/storm-trooper/landscape/storm-trooper-2400x1600.webp", "images/storm-trooper/landscape/storm-trooper-2400x1600.jpg",
    "images/storm-trooper/landscape/storm-trooper-1200x800.webp", "images/storm-trooper/landscape/storm-trooper-1200x800.jpg",
    "images/storm-trooper/square/storm-trooper-800x800.webp", "images/storm-trooper/square/storm-trooper-800x800.jpg",
    "images/storm-trooper/square/storm-trooper-400x400.webp", "images/storm-trooper/square/storm-trooper-400x400.jpg",
    "images/tuscan-raider.gif"
];

self.addEventListener("install", function(event) {
    //Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            //If in cache then return, else, go to network
            return response || fetch(event.request);
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