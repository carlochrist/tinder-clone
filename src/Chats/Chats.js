import React from "react";
import "./Chats.css";
import Chat from "./Chat/Chat";

function Chats() {
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
