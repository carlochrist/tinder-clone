import React, { useState, useEffect } from "react";
import "./Chats.css";
import Chat from "./Chat/Chat";
import { database } from "./../firebase";
import MatchBar from "./MatchBar/MatchBar";

function Chats(loggedInUser) {
  const [chats, setChats] = useState([]);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  //Matchedwith als Objekt —> + chatId

  useEffect(() => {
    const unsubscribe = database.collection("users").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const currentUser = {
          id: doc.id,
          ...doc.data(),
        };

        if (loggedInUser.user.email !== currentUser.email) {
          if (
            loggedInUser.user.likes.includes(currentUser.email) &&
            currentUser.likes.includes(loggedInUser.user.email)
          ) {
            console.log(currentUser);

            database
              .collection("users")
              .doc(currentUser.id)
              .collection("pictures")
              .get()
              .then((response) => {
                const fetchedPictures = [];
                response.forEach((document) => {
                  const fetchedPicture = {
                    id: document.id,
                    ...document.data(),
                  };
                  fetchedPictures.push(fetchedPicture);
                });

                currentUser.pictures = fetchedPictures;
                setMatchedUsers((oldUsers) => [...oldUsers, currentUser]);
              })
              .catch((error) => {
                // setError(error);
                console.log(error);
              });
          }
        }
      });
    });

    return () => {
      // this is the cleanup...
      unsubscribe();
    };

    // this will run ONCE when the component loads and never again
  }, []);

  useEffect(() => {
    const unsubscribe = database.collection("chats").onSnapshot((snapshot) =>
      snapshot.forEach((doc) => {
        const currentChat = {
          id: doc.id,
          ...doc.data(),
        };

        if (
          currentChat.userEmail1 === loggedInUser.user.email ||
          currentChat.userEmail2 === loggedInUser.user.email
        ) {
          database
            .collection("chats")
            .doc(currentChat.id)
            .collection("messages")
            .get()
            .then((response) => {
              const fetchedMessages = [];
              response.forEach((message) => {
                const fetchedMessage = {
                  id: message.id,
                  ...message.data(),
                };
                fetchedMessages.push(fetchedMessage);
              });

              currentChat.messages = fetchedMessages;
              setChats((oldChats) => [...oldChats, currentChat]);
            })
            .catch((error) => {
              // setError(error);
              console.log(error);
            });

          // setChats((oldChats) => [...oldChats, currentChat]);
        }

        // console.log(currentChat);
      })
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // return <div className="chatScreen"></div>;

  // {chat.map((message, index) => (
  //   <div key={message.id} className="">
  //     <p>{chat.userEmail1}</p>
  //   </div>
  // ))}

  // {chat.messages.map((message, index) => (
  //   <div key={message.id} className="">
  //     <p>{message.userEmail}</p>
  //     <p>{message.timestamp}</p>
  //     <p>{message.message}</p>
  //   </div>
  // ))}

  const logData = () => {
    console.log(chats);
  };

  return (
    <div>
      <MatchBar matchedUsers={matchedUsers} />

      {chats.map((chat, index) => (
        <div key={chat.id} className="">
          <p>{chat.userEmail1}</p>
          <p>{chat.userEmail2}</p>

          <button onClick={logData}>log</button>

          {chat.messages.map((message, index) => (
            <div key={message.id} className="">
              <p>{message.userEmail}</p>
              <p>{message.timestamp}</p>
              <p>{message.message}</p>
            </div>
          ))}
        </div>
      ))}

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
