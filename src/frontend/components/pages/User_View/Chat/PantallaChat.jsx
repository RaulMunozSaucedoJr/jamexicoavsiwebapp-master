import React from "react";
import Chat from "./Chat";

import { auth } from "../../../../../backend/Firebase/Firebase-config.js";
import { useAuthState } from "react-firebase-hooks/auth";

const PantallaChat = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 center pantalla-chat">
            {user ? <Chat /> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default PantallaChat;
