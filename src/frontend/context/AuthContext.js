import { useContext, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

/* This is importing the firebase configuration file and then using the functions to get the auth and
firestore. */
import app from "../../backend/Firebase/Firebase-config";
const auth = getAuth(app);
const db = getFirestore(app);

/* It's creating a context for the authentication. */
const AuthContext = createContext();
 
/* It's creating a new instance of the GoogleAuthProvider and FacebookAuthProvider classes. */
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

/**
 * It's a React component that provides the AuthContext to its children
 */
export const AuthContextProvider = ({ children }) => {
  /* It's creating a state variable called user and a function to update it. */
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  /**
   * It returns the result of calling the signInWithEmailAndPassword function, passing in the auth
   * object and the email and password arguments
   * @param email - The email address of the user.
   * @param password - The password for the user.
   * @returns The function signInWithEmailAndPassword is being returned.
   */
  const logIn = (email, password, timestamp) => {
    return signInWithEmailAndPassword(auth, email, password, timestamp);
  };
  /**
   * It creates a new user with the given email and password
   * @param email - The email address of the user.
   * @param password - The password for the new account.
   * @param repeatpassword - This is the password that the user will enter to confirm that they have
   * entered the correct password.
   * @param rol - is the role of the user, it can be "admin" or "user"
   * @returns The function createUserWithEmailAndPassword is being returned.
   */
  const signUp = async (email, password, repeatpassword, rol, timestamp) => {
    return createUserWithEmailAndPassword(
      auth,
      email,
      password,
      repeatpassword,
      rol,
      timestamp
    );
  };

  /**
   * It calls the signOut function from the auth.js file, which is imported at the top of the file
   */
  const logOut = () => {
    signOut(auth);
  };

  /**
   * It signs in the user with Google, and if the user is not in the database, it adds the user to the
   * database
   */
  const googleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "Google",
          email: user.email,
          rol: "user",
          timestamp: serverTimestamp(),
          photoURL: user.photoURL,
          adress: "",
          mobilephone: "",
          correoelectronico: "",
          sociallinks: "",
          lastschoolgrade: "",
          jobplaces: "",
          jobactivities: "",
          usedtools: "",
          lastonnection: "",
        });
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "¡Bienvenido!",
            text: `Hola ${user.displayName}, por favor complete su perfil para poder hacer uso de la plataforma`,
            showCancelButton: false,
            showConfirmButton: false,
            timer: 2500,
          });
        }, 300);
        navigate("/Resume");
      } else {
        Swal.fire({
          icon: "success",
          title: "¡Bienvenido!",
          text: `Hola ${user.displayName}, un gusto tenerte de nuevo en la plataforma.`,
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "¡Atención!",
        icon: "info",
        text: `Se ha generado el siguiente error ${err.message}. Por lo que NO se podrá ingresar con su cuenta de Google. \n Favor de comunicar este error al equipo de TI.`,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 3500,
      });
    }
  };

  /**
   * It signs in the user with Facebook, and if the user is not in the database, it adds the user to the
   * database
   */
  const facebookSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, facebookProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "Facebook",
          email: user.email,
          rol: "user",
          timestamp: serverTimestamp(),
          photoURL: user.photoURL,
          adress: "",
          mobilephone: "",
          correoelectronico: "",
          sociallinks: "",
          lastschoolgrade: "",
          jobplaces: "",
          jobactivities: "",
          usedtools: "",
          lastconnection: "",
        });
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "¡Bienvenido!",
            text: `Hola ${user.displayName}, por favor complete su perfil para poder hacer uso de la plataforma`,
            showCancelButton: false,
            showConfirmButton: false,
            timer: 2500,
          });
        }, 300);
        navigate("/Resume");
      } else {
        Swal.fire({
          icon: "success",
          title: "¡Bienvenido!",
          text: `Hola ${user.displayName}, un gusto tenerte de nuevo en la plataforma.`,
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/");
      }
    } catch (err) {
      Swal.fire({
        title: "¡Atención!",
        icon: "info",
        text: `Se ha generado el siguiente error ${err.message}. Por lo que NO se podrá ingresar con su cuenta de Facebook. \n Favor de comunicar este error al equipo de TI.`,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 3500,
      });
    }
  };

  /**
   * It sends a password reset email to the user
   * @param email - The email address of the user.
   */
  const passwordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: `Se ha enviado el link para reestablecer la contraseña al siguiente correo ${email}.\n Favor de vericiar su correo basura y/o no deseado.`,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "¡Atención!",
        text: `No se ha podido enviar el link para reestablcer la contraseña. \n Favor de comunicar el siguiente error ${err.message} al equipo de TI.`,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 3500,
      });
    }
  };

  /* It's a function that is being called when the component is mounted and it's being used to
subscribe to the authentication state. */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  /* It's returning the AuthContext.Provider component, which is a component that provides the
AuthContext to its children. */
  return (
    <AuthContext.Provider
      value={{
        signUp,
        logIn,
        logOut,
        passwordReset,
        googleSignIn,
        facebookSignIn,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * It returns the value of the AuthContext
 * @returns The AuthContext object.
 */
export const UserAuth = () => {
  return useContext(AuthContext);
};
