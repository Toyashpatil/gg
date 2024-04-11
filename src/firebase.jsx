// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8_4TKOh47fJ0ILNeG7VCBeATWIMUg79U",
    authDomain: "code-editor-ea797.firebaseapp.com",
    projectId: "code-editor-ea797",
    storageBucket: "code-editor-ea797.appspot.com",
    messagingSenderId: "932802392153",
    appId: "1:932802392153:web:32d29242dc6d1cef00c148",
    measurementId: "G-EERWKHQD50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export {db};