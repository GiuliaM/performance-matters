var cacheName = 'v2';
var cacheFiles = [ //files that need to be cached
    '/static/bundle.js',
    '/static/style.css',
    'https://fonts.googleapis.com/css?family=Alegreya+Sans:300,400,700'
]

self.addEventListener('install', function(event) {
    console.log("[SW] Installed")

    // the install event has to wait untill this promise event is resolved
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log("[SW] Caching cacheFiles");
            return cache.addAll(cacheFiles);
        })
    )
})


self.addEventListener('activate', function(event) {
    console.log("[SW] Activated")

    event.waitUntil( // loop through cache and remove anything that corresponds to a cache name other than cacheName
        caches.keys().then(function(cacheNames) {
            // loop through cache
            return Promise.all(cacheNames.map(function(thisCacheName){

                // check if there is cache that doesn't respond to cacheName and delete that
                if (thisCacheName !== cacheName) {
                    console.log("[SW] Removing Cached files from thisCacheName");
                    return caches.delete(thisCacheName);
                }
            }))
        })
    )
})

self.addEventListener('fetch', function(event) {
    console.log('[ServiceWorker] Fetch', event.request.url);

    // e.respondWidth Responds to the fetch event
    event.respondWith(
       //does the requested url exist, then start function(response)
        caches.match(event.request).then(function(response) {
                // If the request is in the cache
                if (response) {
                    console.log("[ServiceWorker] Found in Cache", event.request.url, response);
                    // Return the cached version
                    return response;
                }

                // If the request is NOT in the cache, fetch and cache
                var requestClone = event.request.clone(); //Need to clone request to save API images in cache
                fetch(requestClone)
                    .then(function(response) {
                        if ( !response ) {
                            console.log("[ServiceWorker] No response from fetch ")
                            return response;
                        }

                        var responseClone = response.clone();

                        //  Open the cache
                        caches.open(cacheName).then(function(cache) {

                            // Put the fetched response in the cache
                            cache.put(event.request, responseClone);
                            console.log('[ServiceWorker] New Data Cached', event.request.url);

                            // Return the response
                            return response;

                        }); // end caches.open

                    })
                    .catch(function(err) {
                        console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
                    });

            }) // end caches.match(e.request)
    ); // end e.respondWith
});
