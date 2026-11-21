/* SavComponents Academy — service worker: the Academy opens offline too.
   Network first (the site has no version in its addresses, so the newest copy wins), the cache when there is no network.
   The accounts API lives on another domain and is never cached. */
const CACHE = 'savc-academy-v1';
const SHELL = ['./', './index.html', './academy.css', './academy.js', './content.js', './manifest.webmanifest', './icons/icon.svg', './icons/icon-192.png',
  '../dist/sav.css', '../dist/sav.js', '../docs/components.js', '../docs/a11y.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('savc-academy-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(fetch(req).then((res) => {
    if (res.ok && (url.pathname.startsWith('/academy/') || /^\/(dist|docs|icons|flags|maps|v)\//.test(url.pathname))) {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy));
    }
    return res;
  }).catch(() => caches.match(req).then((r) => r || (req.mode === 'navigate' ? caches.match('./index.html') : Response.error()))));
});
