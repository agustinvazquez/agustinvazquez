importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

const pushConfig = {
    apiKey: "AIzaSyC1TuClaax7dttB-eNVeaEEuN4j_yT6ojc",
    authDomain: "fidelitypush.firebaseapp.com",
    databaseURL: "https://fidelitypush.firebaseio.com",
    projectId: "fidelitypush",
    storageBucket: "fidelitypush.appspot.com",
    messagingSenderId: "278414756419",
    appId: "1:278414756419:web:28833783e5fd7919da22f6"
};

firebase.initializeApp(pushConfig);

const messaging = firebase.messaging();


self.addEventListener('notificationclick', function(event) {
    if (!event.action) {
        let url = 'https://www.google.com/';

        event.waitUntil(
            clients.matchAll({type: 'window'}).then( windowClients => {

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

self.addEventListener('push', function(event) {
    let payload = JSON.parse(event.data.text());

    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        badge: payload.data.click_action,
        requireInteraction: true,
        image: 'img/fav.fidelitytools.png',
        badge: 'img/fav.fidelitytools.png',
        icon: 'img/fav.fidelitytools.png',
        actions: [
            {
              action: 'https://www.google.com/',
              title: 'Coffee',
              icon: 'img/fav.fidelitytools.png'
            },
            {
              action: 'https://www.google.com/',
              title: 'Doughnut',
              icon: 'img/fav.fidelitytools.png'
            },
            {
              action: 'gramophone-action',
              title: 'gramophone',
              icon: 'img/fav.fidelitytools.png'
            },
            {
              action: 'atom-action',
              title: 'Atom',
              icon: 'img/fav.fidelitytools.png'
            }
          ]
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});


// messaging.setBackgroundMessageHandler(payload => {
//     const notificationTitle = payload.data.title;
//     const notificationOptions = {
//         body: payload.data.body,
//         badge: payload.data.click_action,
//         requireInteraction: true,
//         image: 'img/fav.fidelitytools.png',
//         badge: 'img/fav.fidelitytools.png',
//         icon: 'img/fav.fidelitytools.png',
//         actions: [
//             {
//               action: 'coffee-action',
//               title: 'Coffee',
//               icon: 'img/fav.fidelitytools.png'
//             },
//             {
//               action: 'doughnut-action',
//               title: 'Doughnut',
//               icon: 'img/fav.fidelitytools.png'
//             },
//             {
//               action: 'gramophone-action',
//               title: 'gramophone',
//               icon: 'img/fav.fidelitytools.png'
//             },
//             {
//               action: 'atom-action',
//               title: 'Atom',
//               icon: 'img/fav.fidelitytools.png'
//             }
//           ]
//     };

//     return self.registration.showNotification(notificationTitle,
//         notificationOptions);
// });