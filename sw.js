const V='vzs-v1',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;
 if(q.mode==='navigate'){e.respondWith(fetch(q).then(r=>{const c=r.clone();caches.open(V).then(h=>h.put('index.html',c));return r}).catch(()=>caches.match('index.html')));return}
 e.respondWith(caches.match(q).then(r=>r||fetch(q).then(s=>{const c=s.clone();caches.open(V).then(h=>h.put(q,c));return s})))});
