//navn på statisk cache
const staticCacheName = "site-static-v1.5"

//navn på dynamic cache
const dynamicCacheName = "site-dynamic-v1.4"


//array til statisk cache
const assets = [
   
    "/index.html",
    "/css/style.css",
    "/oversigt.html",
    "/historik.html",
    "/fallback.html"
]


// Funktion til styring af antal filer i en given cache
const limitCacheSize = (cacheName, numberOfAllowedFiles) => {
	// Åbn den angivede cache
	caches.open(cacheName).then(cache => {
		// Hent array af cache keys 
		cache.keys().then(keys => {
			// Hvis mængden af filer overstiger det tilladte
			if(keys.length > numberOfAllowedFiles) {
				// Slet første index (ældste fil) og kør funktion igen indtil antal er nået
				cache.delete(keys[0]).then(limitCacheSize(cacheName, numberOfAllowedFiles))
			}
		})
	})
}



if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js')
	.then(reg => console.log('service worker registered', reg))
	.catch(err => console.error('service worker not registered', err)) 
}


// install sw og cacher nødvendinge filer
self.addEventListener('install', event => {
    console.log('service worker installed');
// skriver filter til statisk cache
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('skriver til statisk cache');
            cache.addAll(assets)
        })
    )
})

// aktivere sw
self.addEventListener('activate', event => {
    console.log('service worker activate');
    
    //sletter tidlgere versioner af cache
    event.waitUntil(
        caches.keys().then(keys => {
                const filteredkeys = keys.filter(key => key !== staticCacheName)
                filteredkeys.map(key => caches.delete(key))
          
        })
    )
})


self.addEventListener('fetch', (event) => {
    console.log('fetch', event.request)
    event.respondWith(
        caches.match(event.request).then(cacheRes=> {
            return cacheRes || fetch(event.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(event.request.url, fetchRes.clone())
                    
                    limitCacheSize(dynamicCacheName, 25)
                    return fetchRes
                })
            })
        }).catch(() => {
            return caches.match('fallback.html')
        })
     
    )
})