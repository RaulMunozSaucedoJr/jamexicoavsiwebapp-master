import { useContext, createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
} from "firebase/auth";
import app  from "../../backend/Firebase/Firebase-config.js";
const auth = getAuth(app);

/* Creating a context object. */
const AuthContext = createContext();

/**
 * It returns the AuthContext.Provider component, which is a component that allows us to provide the
 * value prop to the AuthContext.Provider component. The value prop is an object that contains the
 * signUp, logIn, googleSignIn, facebookSignIn, logOut, and user functions
 * @returns The AuthContext.Provider component is being returned.
 */
export const AuthContextProvider = ({ children }) => {
 /* A hook that allows us to use state in a functional component. */
  const [user, setUser] = useState({});
  const [rol, setRol] = useState({});
  /**
   * It takes in an email, password, and role, and returns a promise that resolves to a user object if
   * the user is successfully logged in, or rejects with an error if the user is not logged in
   * @param email - The email address of the user.
   * @param password - The password of the user.
   * @param rol - is the role of the user, it can be "admin" or "user"
   * @returns The function signInWithEmailAndPassword is being returned.
   */
  const logIn = (email, password, rol) => {
    return signInWithEmailAndPassword(auth, email, password, rol);
  };

  /**
   * It takes in an email, password, repeatpassword and rol, and returns a promise that will resolve to
   * a user object if the user signs up successfully
   * @param email - The email address of the user.
   * @param password - The password for the new account.
   * @param repeatpassword - This is the password that the user will enter to confirm that they have
   * entered the correct password.
   * @param rol - is the role of the user, it can be "admin" or "user"
   * @returns The function createUserWithEmailAndPassword is being returned.
   */
  const signUp = (email, password, repeatpassword, rol) => {
    return createUserWithEmailAndPassword(auth, email, password, repeatpassword, rol);
  };
/**
 * It calls the signOut function from the auth.js file, which is imported at the top of the file
 */
  const logOut = () => {
    signOut(auth);
  };
/**
 * It creates a new GoogleAuthProvider object and then calls the signInWithPopup function with the auth
 * object and the provider object.
 */
  const googleSignIn = (rol) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider, rol);
  };

/**
 * It creates a new FacebookAuthProvider object, and then calls the signInWithPopup function with the
 * auth object and the provider object as arguments
 */
  const facebookSignIn = (rol) => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider, rol);
  };

/* A hook that allows us to use state in a functional component. */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser, currentRol) => {
      setUser(currentUser);
      setRol(currentRol);
    });
    return () => {
      unsubscribe();
    };
  }, []);

/* Returning the AuthContext.Provider component, which is a component that allows us to
provide the value prop to the AuthContext.Provider component. The value prop is an object that
contains the signUp, logIn, googleSignIn, facebookSignIn, logOut, and user functions. */
  return (
    <AuthContext.Provider value={{ signUp, logIn, googleSignIn, facebookSignIn, logOut, user, rol }}>
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
