import React, {useState} from "react";
import { auth, db } from "../../../../../backend/Firebase/Firebase-config.js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
/**
 * It takes a scroll ref as a prop, and it returns a form that sends a message to the database when
 * submitted
 * @returns A form with an input and a button.
 */

const SendMessage = ({ scroll }) => {
  const [input, setInput] = useState("");

/**
 * When the user clicks the send button, we prevent the default action, check if the input is empty,
 * and if it's not, we add a new document to the messages collection with the text, name, uid, and
 * timestamp
 * @returns The return statement is returning the JSX code that is being rendered to the screen.
 */
  const sendMessage = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a valid message");
      return;
    }
    const { uid, displayName } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: input,
      name: displayName,
      uid,
      timestamp: serverTimestamp(),
    });
    setInput("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 pt-3">
          <form onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Mensaje"
              className="form-control"
            />
            <button className="btn btn-submit mt-2" type="submit">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
