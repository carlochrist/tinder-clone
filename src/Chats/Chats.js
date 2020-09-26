import React, { useState, useEffect } from "react";
import "./Chats.css";
import Chat from "./Chat/Chat";
import { database } from "./../firebase";
import MatchBar from "./MatchBar/MatchBar";

function Chats(loggedInUser) {
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

    // find matches and get pictures

    // database
    //   .collection("users")
    //   .doc(loggedInUser.user.id)
    //   .collection("chats")
    //   .get()
    //   .then((response) => {
    //     console.log(response);
    //   });

    return () => {
      unsubscribe();
    };
  }, []);

  // return <div className="chatScreen"></div>;

  return (
    <div>
      <MatchBar />

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
    </div>
  );
}

export default Chats;
