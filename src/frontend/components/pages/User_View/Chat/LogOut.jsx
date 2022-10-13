import React from "react";
import { auth } from "../../../../../backend/Firebase/Firebase-config.js";

const LogOut = () => {
  const signOut = () => {
    signOut(auth);
  };
  return (
    <button className="btn btn-sm" type="button" onClick={() => auth.signOut()}>
      Logout
    </button>
  );
};

export default LogOut;
