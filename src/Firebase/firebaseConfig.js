// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA6AWxU697AngBus0bHan3Ew-8A2Uh1bg",
  authDomain: "ejercicio-f7.firebaseapp.com",
  projectId: "ejercicio-f7",
  storageBucket: "ejercicio-f7.appspot.com",
  messagingSenderId: "253962556636",
  appId: "1:253962556636:web:a648b7e87077b0beb41019",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); //Se inicializa el servicio de autenticación de Firebase
export const dataBase = getFirestore(app); //Se inicializa el servicio de cloud Firestore
export const googleProvider = new GoogleAuthProvider();
