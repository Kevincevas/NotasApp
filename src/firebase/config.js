// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore/lite";
import { getEnvironments } from "../helpers/getEnvironments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


//VARIABLES DE ENTORNO paso 1 -> getEnvironments
//ver las variables de entorno
// console.log( import.meta.env );
// console.log(process.env);
const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
  VITE_MEASUREMENTID,
} = getEnvironments();


// Your web app's Firebase configuration
//Dev/Prod
// const firebaseConfig = {
  // apiKey: "AIzaSyA9131asMqbrNhSaIpkcY7SVqt0eac_92w",
  // authDomain: "journal-2c821.firebaseapp.com",
  // projectId: "journal-2c821",
  // storageBucket: "journal-2c821.appspot.com",
  // messagingSenderId: "343326895826",
  // appId: "1:343326895826:web:c8fa041b1b0f0a1f58c70b"
// };

//Dev/Testing
// const firebaseConfig = {
//   apiKey: "AIzaSyC5WWVuxKQF2_WhzWP6qDx05XliMStoYCg",
//   authDomain: "journalnoauth.firebaseapp.com",
//   projectId: "journalnoauth",
//   storageBucket: "journalnoauth.appspot.com",
//   messagingSenderId: "1036181057543",
//   appId: "1:1036181057543:web:7342b9a4d7b14836fcfaa2",
//   measurementId: "G-7SB0KH56SX"
// };

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
  measurementId: VITE_MEASUREMENTID,
};
// console.log(firebaseConfig)

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp)