const CACHE = 'sayumin-tech-v1';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./','./index.html','./products.json'])));
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request).then(f => {
        let copy = f.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return f;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
