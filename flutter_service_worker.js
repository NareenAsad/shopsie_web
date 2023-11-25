'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "d90d27788eff1fc7982737596c25607d",
"assets/AssetManifest.bin.json": "3a3a99e9a4b6a7432b521cb610286127",
"assets/AssetManifest.json": "16008967c1492b9ac719c06e23897360",
"assets/assets/fonts/Agbalumo.ttf": "27cd170665cbb75101c35073b6e642ca",
"assets/assets/fonts/EduTASBeginner.ttf": "4de7026ab75bfb5887c8996ce97266c6",
"assets/assets/fonts/FjallaOne.ttf": "ec1b2f280f4da66724d41ecd5275ef27",
"assets/assets/images/1.jpg": "5eb8642a1812417abb18b3773315ae9c",
"assets/assets/images/2.png": "400c91262622cb7ca910a65a3ddd3316",
"assets/assets/images/3.png": "e20cc481036273a3d08f6260ad51e480",
"assets/assets/images/4.png": "28c2b493a1ce954a0b6f5b8e7f469f91",
"assets/assets/images/5.png": "77777c237a9f1078759e1dab3212c479",
"assets/assets/images/6.png": "2fdc3aa5de4389a7f26c9c9aa8f887b5",
"assets/assets/images/pic-1.png": "338319a4ef7f232de07552cf2b39eed3",
"assets/assets/images/pic-2.png": "fa8ea9e523f862a7c7923edbd1d30fa3",
"assets/assets/images/pic-3.png": "32fc1f6bd4534be6a2e9fe444558863d",
"assets/assets/images/pic-4.png": "0b7962d5fede8eb1615df14ec2704ea4",
"assets/assets/images/pic-5.png": "6d66253a38766129f65e2bb9fe19c408",
"assets/assets/images/pic-6.png": "e775eb9115527e4b8057a3fbaa81011f",
"assets/assets/images/pic-7.png": "a653a1121a14e3e9afd87dd3b5886bbc",
"assets/assets/images/pic1.png": "e993ad978c295e03dccd05af58c24391",
"assets/assets/images/pic10.png": "4bc623da45da6148f2cfebecbe6b2fc0",
"assets/assets/images/pic2.png": "0a8cf1ec0a64fa47a7a06104aac435cd",
"assets/assets/images/pic3.png": "821def0b06ac7ab6a5f844c198387e9a",
"assets/assets/images/pic4.png": "8dba5d69359073657bd90f62bdd74a65",
"assets/assets/images/pic5.png": "e159605f0cb809d7ff48450f88e41f72",
"assets/assets/images/pic6.png": "6794619b6cce98541d4ea879df7ba244",
"assets/assets/images/pic7.png": "03dddfda7a58f5c081ebf8089923f564",
"assets/assets/images/pic8.png": "743e6136dc49467e55a1464061810bab",
"assets/assets/images/pic9.png": "a3eebd5a0d60c71bd19b1aaf0aa36d5a",
"assets/FontManifest.json": "5f1a0828ab90c9818f73908cd1f16699",
"assets/fonts/MaterialIcons-Regular.otf": "7efa182d866e8d97e9d39d68be81d588",
"assets/NOTICES": "d04822a72a3d5465360b305c187f199d",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "64edb91684bdb3b879812ba2e48dd487",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "f87e541501c96012c252942b6b75d1ea",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "4124c42a73efa7eb886d3400a1ed7a06",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "59a12ab9d00ae8f8096fffc417b6e84f",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "b3e9cad0f1670cb8a73b048ac2a18392",
"/": "b3e9cad0f1670cb8a73b048ac2a18392",
"main.dart.js": "edcca7c6dd80b83f7fcac725372ce1a7",
"manifest.json": "3aa4ac3a10dd358f305049eb49dc013f",
"version.json": "e4612168cbcd7cd178a0a5a970b6fde5"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
