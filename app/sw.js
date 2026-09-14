'use strict';
// Change VERSION whenever any precached file changes. Updates activate after all old windows close.
const VERSION='pixel-day-shell-v1';
const ROOT=new URL('./',self.location.href);
const ASSETS=['./','index.html','pixel-font.css','pixel-theme.css','pwa.js','pwa.css','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(VERSION).then(cache=>cache.addAll(ASSETS.map(p=>new URL(p,ROOT).href)))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('pixel-day-shell-')&&key!==VERSION)await caches.delete(key);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==ROOT.origin||!url.pathname.startsWith(ROOT.pathname))return;event.respondWith((async()=>{const cache=await caches.open(VERSION);const hit=await cache.match(event.request,{ignoreSearch:true});if(hit)return hit;try{return await fetch(event.request)}catch(error){if(event.request.mode==='navigate')return await cache.match(new URL('index.html',ROOT).href);throw error}})());});
