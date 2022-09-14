if ("serviceWorker" in navigator) {
  console.log("browser available for service worker ");
  navigator.serviceWorker
    .register(
      navigator.onLine ? "../sw_caches_site.js" : "../sw_caches_pages.js"
    )
    .then((reg) => console.log("Service worker registered"))
    .catch((err) => console.log(`Service Worker Error:${err}`));
}
