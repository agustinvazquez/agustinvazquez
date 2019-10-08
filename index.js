firebase.initializeApp(pushConfig);

const messaging = firebase.messaging();
messaging.usePublicVapidKey(parKey);

function PedirPermiso(){
    messaging.requestPermission()
    .then( ()=>{
        console.log('Permiso ok');
        return messaging.getToken();   
    })
    .then(token=>{
        document.querySelector('#token').innerHTML =  token;
    })
    .catch(err=>{
        console.log('Ocurrio un error', err);
    });
}

function copiar(){
    document.querySelector('#token').select();

    document.execCommand("copy");

    document.querySelector('#copy').style.display = 'block';
}
