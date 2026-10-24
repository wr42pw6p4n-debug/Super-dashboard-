// Key Engineering jobs — receives "new job" pushes and shows a notification.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('push', e => {
  e.waitUntil(self.registration.showNotification('Key Engineering', {
    body: 'You have a new job. Tap to open.',
    tag: 'new-job', renotify: true,
    icon: 'icon-192.png', badge: 'icon-192.png'
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type: 'window', includeUncontrolled: true}).then(list => {
    for (const c of list) { if ('focus' in c) return c.focus(); }
    return self.clients.openWindow('./jobs.html');
  }));
});
