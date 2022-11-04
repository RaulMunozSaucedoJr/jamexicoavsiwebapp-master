/* Importing the necessary libraries to use the function. */
import {useState} from "react";
import Swal from "sweetalert2";
import { auth, db } from "../Firebase-config";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

/**
 * It fetches the current user's data from the database and sets it to a state variable.
 */
export const FetchCurrentUserData = async () => {
  const [user] = useAuthState(auth);
  const [setName] = useState("");
  try {
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    const doc = await getDocs(q);
    const data = doc.docs[0].data();
    setName(data.name);
  } catch (err) {
    Swal.fire({
      title: "¡Atención!",
      icon: "info",
      text: `No se ha podido cargar la información del usuario en cuestión. \n Comunicar el error ${err.message} al equipo de TI`,
      showCancelButton: false,
      showConfirmButton: false,
      timer: 4000,
    });
    console.error(err);
  }
};