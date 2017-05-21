var cacheName = 'v2';
var cacheFiles = [ //files that need to be cached
    '/static/bundle.js', // evt . toevoegen
    '/static/style.css', // evt . toevoegen
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

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);

    // e.respondWidth Responds to the fetch event
    e.respondWith(

        // Check in cache for the request being made
        caches.match(e.request)


            .then(function(response) {

                // If the request is in the cache
                if ( response ) {
                    console.log("[ServiceWorker] Found in Cache", e.request.url, response);
                    // Return the cached version
                    return response;
                }

                // If the request is NOT in the cache, fetch and cache

                var requestClone = e.request.clone();
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
                            cache.put(e.request, responseClone);
                            console.log('[ServiceWorker] New Data Cached', e.request.url);

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

//self.addEventListener('fetch', function(event){
//    console.log("[SW] Fetching", event.request.url);
//    //responding to fetch event
//    event.respondWith(
//        //does the requested url exist, then start function(response)
//        caches.match(event.request).then(function(response) {
//            if (response) {
//                console.log("[SW] found in cache", event.request.url);
//                return response; //return cached version
//            }
//
//            //Need to clone request to save API images in cache
//            var requestClone = event.request.clone();
//
//            //if its not found in the cache, fetch it
//            fetch(requestClone)
//                .then(function(response) {
//                    if (!response) {
//                        console.log("[SW] No response from fetch");
//                        return response;
//                    }
//
//                var responseClone = response.clone();
//
//                caches.open(cacheName).then(function(cache) {
//                    cache.put(event.request, responsClone);
//                    return response;
//                });
//                })
//        })
//    )
//});
