import React from "react";
import SignIn from "./SignIn";
import LogOut from "./LogOut";
import { auth } from "../../../../../backend/Firebase/Firebase-config.js";
import { useAuthState } from "react-firebase-hooks/auth";

const NavbarChat = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="chat-navbar">
      <button
        type="button"
        className="btn btn-sm btn-login"
      >
        {user ? <LogOut /> : <SignIn />}
      </button>
    </div>
  );
};

export default NavbarChat;
