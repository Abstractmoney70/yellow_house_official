const CACHE_NAME = 'gandhi-house-v1';
const ASSETS = [
  '/yellow_house_official/index.html',
  '/yellow_house_official/404.html',
  '/yellow_house_official/submit.html',
  '/yellow_house_official/css/main.css',
  '/yellow_house_official/css/reading.css',
  '/yellow_house_official/css/print.css',
  '/yellow_house_official/js/data.js',
  '/yellow_house_official/js/utils.js',
  '/yellow_house_official/js/components.js',
  '/yellow_house_official/js/panels.js',
  '/yellow_house_official/js/easter-eggs.js',
  '/yellow_house_official/js/features.js',
  '/yellow_house_official/js/main.js',
  '/yellow_house_official/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});
