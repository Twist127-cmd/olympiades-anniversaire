const CACHE = "olympiades-v5";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=5",
  "./app.js?v=5",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(request, fallback) {
  try {
    const response = await fetch(request, { cache: "no-store" });
    if (response.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return (await caches.match(request, { ignoreSearch: true })) || caches.match(fallback);
  }
}

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  if (event.request.mode === "navigate") {
    event.respondWith(networkFirst(event.request, "./index.html"));
    return;
  }

  const url = new URL(event.request.url);
  if (url.origin === self.location.origin) {
    event.respondWith(networkFirst(event.request, "./index.html"));
  }
});
