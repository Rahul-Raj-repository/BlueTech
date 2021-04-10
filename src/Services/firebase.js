import * as firebase from "firebase/app"
import 'firebase/analytics';
import 'firebase/auth'
import 'firebase/firestore';
import 'firebase/firebase-app';
import 'firebase/firebase-storage'; 

var firebaseConfig = {
    apiKey: "AIzaSyCkrjCogxwqHRvPhRCH5Z1xYETxQzKTi10",
    authDomain: "bluetech-31f7d.firebaseapp.com",
    databaseURL: "https://bluetech-31f7d.firebaseio.com",
    projectId: "bluetech-31f7d",
    storageBucket: "bluetech-31f7d.appspot.com",
    messagingSenderId: "926163002753",
    appId: "1:926163002753:web:d24948d660fca155ddb480"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  
  export default firebase;