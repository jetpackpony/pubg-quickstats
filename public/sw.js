/* global importScripts, workbox */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  workbox.precaching.precacheAndRoute([]);
  console.log(`Yay! Workbox is loaded! Ololo 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}