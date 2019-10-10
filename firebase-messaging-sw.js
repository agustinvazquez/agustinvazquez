


self.addEventListener('notificationclick', function (event) {
  if (!event.action) {
    let url = 'https://www.google.com/';

    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(windowClients => {

        for (var i = 0; i < windowClients.length; i++) {
          var client = windowClients[i];

          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
    );
  }
  console.log(event.action);

  switch (event.action) {
    case 'coffee-action':
      console.log('User ❤️️\'s coffee.');
      break;
    case 'doughnut-action':
      console.log('User ❤️️\'s doughnuts.');
      break;
    case 'gramophone-action':
      console.log('User ❤️️\'s music.');
      break;
    case 'atom-action':
      console.log('User ❤️️\'s science.');
      break;
    default:
      console.log(`Unknown action clicked: '${event.action}'`);
      break;
  }
});

//     let url = 'https://www.google.com/';
//     event.notification.close(); // Android needs explicit close.
//     event.waitUntil(
//         clients.matchAll({type: 'window'}).then( windowClients => {
//             console.log(clients);
//             // Check if there is already a window/tab open with the target URL
//             for (var i = 0; i < windowClients.length; i++) {
//                 var client = windowClients[i];
//                 console.log(client);
//                 // If so, just focus it.
//                 if (client.url === url && 'focus' in client) {
//                     return client.focus();
//                 }
//             }
//             // If not, then open the target URL in a new window/tab.
//             if (clients.openWindow) {
//                 return clients.openWindow(url);
//             }
//         })
//     );
// });

// self.addEventListener('notificationclick', function(event) {
//     if (!event.action) {
//       console.log('Notification Click.');
//       window.location.href = 'https://www.google.com/';
//       return;
//     }

//     switch (event.action) {
//       case 'coffee-action':
//         console.log('User ❤️️\'s coffee.');
//         break;
//       case 'doughnut-action':
//         console.log('User ❤️️\'s doughnuts.');
//         break;
//       case 'gramophone-action':
//         console.log('User ❤️️\'s music.');
//         break;
//       case 'atom-action':
//         console.log('User ❤️️\'s science.');
//         break;
//       default:
//         console.log(`Unknown action clicked: '${event.action}'`);
//         break;
//     }
// });





//Section: Import
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

//Section: Vars
var messaging;

//Section: JS Default
async function useFetch(url, method, headers, body) {
  var response = {};

  try {
    await fetch(url,
      {
        method,
        headers,
        body
      })
      .then(async res => {
        response.status = res.status;

        await res.text().then(content => {
          response.content = JSON.parse(content);
        });
      });

    return response;
  }
  catch (ex) { console.log(ex); }
}

//Section Set Firebase 
GetPushConfig().then(config => {
  if (config) {
    firebase.initializeApp(config);
    messaging = firebase.messaging();
  }
});

//Section: GotoAPI
async function GetPushConfig() {
  let response = await useFetch(`${xUrlApi}/api/Fidelitytools/ConfiguracionServerPush/Obtener`, 'GET', undefined, undefined);

  if (response.status === 200) {
    return response.content;
  }

  return null;
}

//Section: Events
self.addEventListener('push', function (event) {
  let payload = JSON.parse(event.data.text()).data;

  const notificationTitle = payload.title;
  const notificationOptions = {
    body: payload.body,
    requireInteraction: payload.requireInteraction,
    image: payload.image,
    badge: payload.badge,
    icon: payload.icon,
    actions: payload.actions
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});