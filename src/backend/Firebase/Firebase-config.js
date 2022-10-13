import {
  initializeApp
} from "firebase/app";
import {
  getAuth
} from "firebase/auth";
import {
  getFirestore
} from "firebase/firestore";
/* Initializing the firebase app. */
const firebaseConfig = {
  apiKey: "AIzaSyBg5RcR-5Tn_4A_557wDT0uXae1DNUzn74",
  authDomain: "webapp-d94e1.firebaseapp.com",
  projectId: "webapp-d94e1",
  storageBucket: "webapp-d94e1.appspot.com",
  messagingSenderId: "794721777604",
  appId: "1:794721777604:web:40c75a3d0e5c1feea75691"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;