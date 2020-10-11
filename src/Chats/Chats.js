import React, { useState, useEffect } from "react";
import "./Chats.css";
import Chat from "./Chat/Chat";
import { database } from "./../firebase";
import MatchBar from "./MatchBar/MatchBar";

function Chats(loggedInUser) {
  const [chats, setChats] = useState([]);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [userDataLoaded, setUserDataLoaded] = useState(false);

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

                currentUser.pictures = [];
                Object.assign(currentUser.pictures, fetchedPictures);
              })
              .catch((error) => {
                // setError(error);
                console.log(error);
              });

            setMatchedUsers((oldUsers) => [...oldUsers, currentUser]);
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

  // useEffect(() => {
  //   const unsubscribe = database.collection("chats").onSnapshot((snapshot) =>
  //     setChats(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         data: doc.data(),
  //       }))
  //     )
  //   );

  //   console.log(loggedInUser);

  //   // find matches and get pictures

  //   // database
  //   //   .collection("users")
  //   //   .doc(loggedInUser.user.id)
  //   //   .collection("chats")
  //   //   .get()
  //   //   .then((response) => {
  //   //     console.log(response);
  //   //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  // return <div className="chatScreen"></div>;

  const reRenderUsers = () => {
    if (userDataLoaded === false) {
      // const copy = [...users];
      // setUsers(copy);
      setUserDataLoaded(true);
    }

    const copy = [...matchedUsers];
    setMatchedUsers(copy);

    // console.log(localUsers);
    // if (localUsers.length === 0) {
    //   setLocalUsers(users);
    // }
  };

  return (
    <div>
      {!userDataLoaded ? (
        <button onClick={reRenderUsers}> load users </button>
      ) : null}

      {matchedUsers.map((user) => (
        <div key={user.id}>
          <p>{user.id}</p>
          {user.username ? <p> {user.username}</p> : null}
          {user.pictures ? <p> bilder xd </p> : null}
        </div>
      ))}

      <MatchBar matchedUsers={matchedUsers} />

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
