const cacheName = "v1";
const cachesAssets = ["/index.html", "/about.html", "/js/main.js"];

self.addEventListener("install", (e) => {
  console.log("Service Worker :install");
  e.waitUntil(
    caches
      .open(cacheName)
      .then((caches) => {
        console.log("Service worker caches added");
        caches.addAll(cachesAssets);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  console.log("Service Worker :activate");
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      console.log(cacheNames);
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache != cacheName) {
            console.log("service worker old cache delete");
            caches.delete(cache);
          }
        })
      );
    })
  );
});

//call fetch event
self.addEventListener("fetch", (e) => {
  console.log("Service worker :Fetching", e.request);
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
