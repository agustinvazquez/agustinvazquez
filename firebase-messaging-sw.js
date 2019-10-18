//Section: Import
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

//Section: Vars
var messaging;
// const xUrlApi = `http://localhost:53902`;
// const xUrlApi = `https://rest.fidelitytools.net`;
const xUrlApi = 'http://localserver3:8092';

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
//TODO: Registrar eventos

//Section: Events
self.addEventListener('push', function (event) {
  let payload = JSON.parse(event.data.text()).data;

  const notificationTitle = payload.title;
  const notificationOptions = {
    body: payload.body,
    requireInteraction: JSON.parse(payload.requireInteraction),
    image: payload.image,
    badge: payload.badge,
    icon: payload.icon,
    actions: JSON.parse(payload.actions),
    data: { click_action: payload.click_action }
  };

  //TODO: Registrar evento entregado

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  //TOOO: Registrar evento de click sobre notificacion

  event.notification.close();
  let url = '';

  if(!event.action){
    let notification = event.notification;
    url = notification.data.click_action;
  }
  else{
    url = event.action;
  }

  event.waitUntil(
    clients.openWindow(url)
  );
});

self.addEventListener('notificationclose', function(event) {
  //TODO: Notificacion ignorada
});