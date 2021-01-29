import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB20VO-OJe9ZaVxmmSG6svh8UbD9DopQ5M",
    authDomain: "menu-b8774.firebaseapp.com",
    databaseURL: "https://menu-b8774-default-rtdb.firebaseio.com",
    projectId: "menu-b8774",
    storageBucket: "menu-b8774.appspot.com",
    messagingSenderId: "219560601323",
    appId: "1:219560601323:web:0c8d548d1cb5ddadaf00ae",
    measurementId: "G-Z6VMGZ9BC4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth;
export const db = firebase.database();