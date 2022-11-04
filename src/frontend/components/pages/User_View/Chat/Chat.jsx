import React, { useState, useRef, useEffect } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { db } from "../../../../../backend/Firebase/Firebase-config.js";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";

const Chat = () => {
  /* The above code is using the useState hook to create a state variable called messages and a function
 called setMessages. */
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  /* This is a hook that is called when the component is mounted. It is a way to do the same thing as
 componentDidMount. */
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="container main mt-1">
      <div className="row">
        <div className="col-12">
          {messages &&
            messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
        </div>
        {/* Send Message Compoenent */}
        <SendMessage scroll={scroll} />
        <span ref={scroll}></span>
      </div>
    </div>
  );
};

export default Chat;
