//Section: Variables set
var suscribirAutomaticamente = false;
var segundos = 0;

//Section: Vars
var messaging;
const xUrlApi = `http://localhost:53902`;
// const xUrlApi = `https://rest.fidelitytools.net`;
// const xUrlApi = 'http://localserver3:8092';

const xUrlSW = 'http://127.0.0.1:5500/firebase-messaging-sw.js';
var xSuscripcion = {}; 

//Section: Init
init();
function init() {
    if (Notification.permission === "default") {
        InitFirebase();

        window.onload = () => {
            document.querySelector('#btn-suscripcion-ft').style.visibility = 'visible';
        }
    }
    else {
        window.onload = () => {
            document.querySelector('#btn-suscripcion-ft').style.display = 'none';
        }
    }
}

//Section: GotoAPI
async function GetPushConfig() {
    let response = await useFetch(`${xUrlApi}/api/Fidelitytools/ConfiguracionServerPush/Obtener`, 'GET', undefined, undefined);

    if (response.status === 200) {
        return response.content;
    }

    return null;
}
async function PostSuscripcion(body) {
    let response = useFetch(`${xUrlApi}/api/Suscripcion`, 'POST', undefined, body);

    if (response.status === 201) {
        return true;
    }

    return false;
}

//Section: ServiceWorker
function RegistrarServiceWorker() {
    navigator.serviceWorker.register(`${xUrlSW}`)
        .then(
            registration => {
                return true;
            }, err => {
                console.log('Service Worker registration failed', err);
                return false;
            })
}

// Section: Set Firebase
function InitFirebase() {
    GetPushConfig()
        .then(config => {
            if (config) {
                firebase.initializeApp(config);
                messaging = firebase.messaging();
                messaging.usePublicVapidKey(config.parKey);
            }
        })
        .then(() => {
            if (suscribirAutomaticamente) { Suscribir(segundos); }
        });
}

//Section: Firebase Functions
function Suscribir(seconds) {
    RegistrarServiceWorker();
    setTimeout(() => {
        messaging.requestPermission()
            .then(() => {
                return messaging.getToken();
            })
            .then(token => {
                console.log(token);
                RegistrarServiceWorker();
                xSuscripcion.token = token;
                console.log(JSON.stringify(xSuscripcion));
                return false;
                // return PostSuscripcion(xSuscripcion);
            })
            .then(suscripto => {
                if(suscripto){
                    //TODO: Mensaje 'Suscripto exitosamente'
                }
                else{
                    console.log('Ocurrio un error suscribiendo al dispositivo.');
                }
            })
            .catch(err => {
                //TODO: Permiso bloqueado
            });
    }, (parseInt(seconds) * 1000));

    document.querySelector('#btn-suscripcion-ft').style.display = 'none';
}

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

function setSuscripcion(suscripcion) {
    xSuscripcion = suscripcion;
}