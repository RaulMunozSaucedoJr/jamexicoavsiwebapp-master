/* This is importing the necessary functions from the firebase/auth library. */
import { useContext, createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../../backend/Firebase/Firebase-config.js";

/* Creating a context object. */
const AuthContext = createContext();

/**
 * It's a React component that uses the useState and useEffect hooks to manage the user's
 * authentication state
 */
export const AuthContextProvider = ({ children }) => {
  /* It's a React hook that allows you to manage state in a functional component. */
  const [user, setUser] = useState({});

  /**
   * `logIn` and `signUp` are functions that take in an email and password and return a promise that
   * resolves to a user object
   * @param email - The email address of the user.
   * @param password - The user's password.
   * @returns the promise that is returned from the firebase function.
   */
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  /**
   * It signs out the user.
   */
  const logOut = () => {
    signOut(auth);
  };

  /**
   * It creates a new GoogleAuthProvider object, and then uses the signInWithRedirect method to sign
   * in the user
   */
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  /* It's a React hook that allows you to perform side effects in a functional component. */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("User", currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  /* It's returning the AuthContext.Provider component with the value of the signUp, logIn,
   googleSignIn, logOut, and user functions. */
  return (
    <AuthContext.Provider value={{ signUp, logIn, googleSignIn, logOut, user }}>
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
