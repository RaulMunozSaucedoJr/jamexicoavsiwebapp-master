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
  apiKey: "AIzaSyByqSXELcISr_8W1JNaipazzEcjjYMhsNU",
  authDomain: "jamexicoavsi-c7768.firebaseapp.com",
  projectId: "jamexicoavsi-c7768",
  storageBucket: "jamexicoavsi-c7768.appspot.com",
  messagingSenderId: "129841723417",
  appId: "1:129841723417:web:34604a746391eb7d8d5288"
};
/* Initializing the firebase app with the configuration and exporting the auth, db, and storage
modules. */
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;