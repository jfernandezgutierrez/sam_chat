// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD24KAKYnNssB5RgWAfsmU4G65gmQau62Y",
  authDomain: "samchat-65e5c.firebaseapp.com",
  projectId: "samchat-65e5c",
  storageBucket: "samchat-65e5c.appspot.com",
  messagingSenderId: "229346514728",
  appId: "1:229346514728:web:d6e1102e6ce246e54ae21d",
  measurementId: "G-PJRS7EPDVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
export {auth, db,createUserWithEmailAndPassword};