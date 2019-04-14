var firebase = require('firebase-admin');

var serviceAccount = require('./serviceAccountKey.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://weeping-201a8.firebaseio.com'
});

var db = firebase.database();
var ref = db.ref("server/saving-data/fireblog");
var usersRef = ref.child("users");
usersRef.set({
  alanisawesome: {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  },
  gracehop: {
    date_of_birth: "December 9, 1906",
    full_name: "Grace Hopper"
  }
});
console.log('done ..');