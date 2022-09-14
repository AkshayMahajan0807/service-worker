const cacheName = "v2";

self.addEventListener("install", (e) => {
  console.log("Service Worker :install");
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
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const resClone = res.clone();
        console.log("response:", resClone);
        caches.open(cacheName).then((cache) => cache.put(e.request, resClone));
        return res;
      })
      .catch((err) => caches.match(e.request).then((res) => res))
  );
});
