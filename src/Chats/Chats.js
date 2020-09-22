import React, { useState, useEffect } from "react";
import "./Chats.css";
import Chat from "./Chat/Chat";
import { database } from "./../firebase";

function Chats() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = database.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // return <div className="chatScreen"></div>;

  return (
    <div className="chats">
      <Chat
        name="Swoto"
        message="Hola"
        timestamp="40 sec ago"
        // profilePic="https://ih1.redbubble.net/image.714575138.7695/st,small,507x507-pad,600x600,f8f8f8.u2.jpg"
      />
      <Chat
        name="Swoto"
        message="Hola"
        timestamp="40 sec ago"
        profilePic="https://ih1.redbubble.net/image.714575138.7695/st,small,507x507-pad,600x600,f8f8f8.u2.jpg"
      />
      <Chat
        name="Swoto"
        message="Hola"
        timestamp="40 sec ago"
        profilePic="https://ih1.redbubble.net/image.714575138.7695/st,small,507x507-pad,600x600,f8f8f8.u2.jpg"
      />
      <Chat
        name="Swoto"
        message="Hola"
        timestamp="40 sec ago"
        profilePic="https://ih1.redbubble.net/image.714575138.7695/st,small,507x507-pad,600x600,f8f8f8.u2.jpg"
      />
    </div>
  );
}

export default Chats;
