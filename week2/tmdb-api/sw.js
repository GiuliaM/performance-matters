var cacheName ='v1';
var cacheFiles =[
    '/static/bundle.js',
    '/static/style.css'
]

self.addEventListener('install', function(event){
    console.log("[sw] installed");
});

self.addEventListener('activate', function (event) {
    console.log(' Service worker activated');

});

self.addEventListener('fetch', function(event){
    console.log("[sw] Fetching", event.request.url);
});
