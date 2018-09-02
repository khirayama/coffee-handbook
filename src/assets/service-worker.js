importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

if (workbox) {
  workbox.routing.registerRoute(
    /.*/,
    workbox.strategies.networkFirst({
      cacheName: 'all-cache',
    }),
  );
  workbox.routing.registerRoute(
    /.*\.(?:css|js)/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'assets-cache',
    }),
  );
  workbox.routing.registerRoute(
    /images\/*\.(?:webp|png|jpg|jpeg|svg|gif)/,
    workbox.strategies.cacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        }),
      ],
    }),
  );
}
