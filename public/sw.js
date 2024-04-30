self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('velogruppe60plus').then(cache => {
      return cache.addAll(['/', '/alle-touren']);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
