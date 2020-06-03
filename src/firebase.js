import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6eGf-YOXK0U1qs3S_IAgpcG-WuitCkMg",
    authDomain: "crud-products2020.firebaseapp.com",
    databaseURL: "https://crud-products2020.firebaseio.com",
    projectId: "crud-products2020",
    storageBucket: "crud-products2020.appspot.com",
    messagingSenderId: "656711100750",
    appId: "1:656711100750:web:f57b8b70aced4c3c79961f"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db= firebase.firestore();
const auth= firebase.auth()

export {db, auth}