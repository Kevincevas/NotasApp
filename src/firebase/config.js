// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9131asMqbrNhSaIpkcY7SVqt0eac_92w",
  authDomain: "journal-2c821.firebaseapp.com",
  projectId: "journal-2c821",
  storageBucket: "journal-2c821.appspot.com",
  messagingSenderId: "343326895826",
  appId: "1:343326895826:web:c8fa041b1b0f0a1f58c70b"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp)