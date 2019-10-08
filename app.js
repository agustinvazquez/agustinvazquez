const FirebaseKey = 'BL4TdAtrunMHDfBG7vlr_JUoS_jDik0VuCZA1WXYqRwrPUFOoxKQaT25xEe32CHLoCu5kinNomDdLtWRyixMraQ';
firebase.initializeApp(pushConfig);

const messaging = firebase.messaging();
messaging.usePublicVapidKey(FirebaseKey);

messaging.requestPermission()
.then( ()=>{
    console.log('Permiso ok');
    return messaging.getToken();   
})
.then(token=>{
    console.log(token);
})
.catch(err=>{
    console.log('Ocurrio un error', err);
});

messaging.onMessage(payload=>{
    console.log(payload);
});