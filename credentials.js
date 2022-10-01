// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZpKZNOXzI2GQdSCRFXwNKRHStJDBNFqc",
    authDomain: "user-details-1a938.firebaseapp.com",
    databaseURL: "https://user-details-1a938-default-rtdb.firebaseio.com",
    projectId: "user-details-1a938",
    storageBucket: "user-details-1a938.appspot.com",
    messagingSenderId: "937883910095",
    appId: "1:937883910095:web:cd187c937a4669088f9cba",
    measurementId: "G-K608L4F2Q3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

sighUp.addEventListener('click', (e) => {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            set(ref(database, 'users/' + user.uid), {
                username: username,
                email: email
            })

            alert('user created!');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(errorMessage);
            // ..
        });

});