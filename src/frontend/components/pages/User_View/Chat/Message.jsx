import React from "react";
import { auth } from "../../../../../backend/Firebase/Firebase-config.js";

const Message = ({ message }) => {
  const messageClass = message.uid === auth.currentUser.uid;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 message">
            {`${messageClass}`}
            <p className="name">{message.name}</p>
            <p className="text">{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
