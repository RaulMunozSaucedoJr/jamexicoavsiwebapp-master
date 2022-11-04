/*
IMPORTANTE: CONFIGURAR LAS NUEVAS CREDENCIALES PARA EL CORRECTOR FUNCIONAMIENTO DE FIREBASE
*/

/* Importing the initializeApp function from the firebase/app module. */
import {
  initializeApp
} from "firebase/app";
/* Importing the getAuth function from the firebase/auth module. */
import {
  getAuth
} from "firebase/auth";
/* Importing the getFirestore function from the firebase/firestore module. */
import {
  getFirestore
} from "firebase/firestore";
/* Importing the getStorage function from the firebase/storage module. */
import {
  getStorage
} from "firebase/storage";
/* The configuration for the firebase app. */
const firebaseConfig = {
  apiKey: "AIzaSyBg5RcR-5Tn_4A_557wDT0uXae1DNUzn74",
  authDomain: "webapp-d94e1.firebaseapp.com",
  projectId: "webapp-d94e1",
  storageBucket: "webapp-d94e1.appspot.com",
  messagingSenderId: "794721777604",
  appId: "1:794721777604:web:40c75a3d0e5c1feea75691"
};
/* Initializing the firebase app with the configuration and exporting the auth, db, and storage
modules. */
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;