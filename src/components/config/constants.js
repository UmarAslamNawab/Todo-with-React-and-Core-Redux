import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDfAmUWFNE6vG4UIt7hs7zvYXrn080g6UY",
    authDomain: "todo-using-rea.firebaseapp.com",
    databaseURL: "https://todo-using-rea.firebaseio.com",
    projectId: "todo-using-rea",
    storageBucket: "todo-using-rea.appspot.com",
    messagingSenderId: "1059799570687"
};

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth