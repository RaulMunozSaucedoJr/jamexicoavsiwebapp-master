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
  apiKey: "AIzaSyByqSXELcISr_8W1JNaipazzEcjjYMhsNU",
  authDomain: "jamexicoavsi-c7768.firebaseapp.com",
  projectId: "jamexicoavsi-c7768",
  storageBucket: "jamexicoavsi-c7768.appspot.com",
  messagingSenderId: "129841723417",
  appId: "1:129841723417:web:34604a746391eb7d8d5288"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

/*
 apiKey: "AIzaSyByqSXELcISr_8W1JNaipazzEcjjYMhsNU",
  authDomain: "jamexicoavsi-c7768.firebaseapp.com",
  projectId: "jamexicoavsi-c7768",
  storageBucket: "jamexicoavsi-c7768.appspot.com",
  messagingSenderId: "129841723417",
  appId: "1:129841723417:web:34604a746391eb7d8d5288"
*/