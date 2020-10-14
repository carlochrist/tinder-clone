import React, { useState, useEffect, useRef } from "react";
import TinderCard from "react-tinder-card";
import { Button, Input } from "@material-ui/core";
import { database, firebaseApp } from "./../firebase";
import "./MatchGame.css";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import useDeepCompareEffect, {
  useDeepCompareEffectNoCheck,
} from "use-deep-compare-effect";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const usePreviousValue = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  // console.log(ref.current);
  return ref.current;
};

function MatchGame(props) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [loggedInUser, setLoggedInUser] = useState(props);
  const [users, setUsers] = useState([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [userMatched, setUserMatched] = useState(null);
  const history = useHistory();

  let initialLoadedUsers = [];

  const prevValue = usePreviousValue(users);

  const jumpIntoChat = () => {
    history.push("/chat");
  };

  // piece of code which runs based on a condition
  // useDeepCompareEffectNoCheck(() => {
  useEffect(() => {
    const unsubscribe = database.collection("users").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const currentUser = {
          id: doc.id,
          ...doc.data(),
        };

        if (loggedInUser.user.email !== currentUser.email) {
          if (
            loggedInUser.user.lookingFor === currentUser.gender ||
            loggedInUser.user.lookingFor === "both"
          ) {
            if (
              !loggedInUser.user.dislikes.includes(currentUser.email) &&
              !loggedInUser.user.likes.includes(currentUser.email)
            ) {
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

                  setUsers((oldUsers) => {
                    if (
                      oldUsers.find((user) => user.email === currentUser.email)
                    )
                      return oldUsers;
                    return [...oldUsers, currentUser];
                  });
                })
                .catch((error) => {
                  // setError(error);
                  console.log(error);
                });
            }
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

  const useMountEffect = (fun) => useEffect(fun, []);

  const logUsers = () => {
    console.log(prevValue);
    console.log(users);
  };

  // pushing
  // BAD
  // const user = [];
  // user.push('abc', 'def');

  // GOOD (push to an array in REACT)
  // setUser([...user, 'abc', 'def'])

  const onSwipe = (direction, user) => {
    console.log("You swiped: " + direction);
    console.log("User: ", user);

    // delete undefined entrys

    // if (  loggedInUser.user.dislikes.length === 0) {
    //   loggedInUser.user.dislikes = [];
    // }
    // for (let i = 0; loggedInUser.user.dislikes.length; i++) {
    //   if (loggedInUser.user.dislikes[i] === undefined) {
    //     loggedInUser.user.dislikes.splice(i, 1);
    //   }
    // }

    if (direction === "left" || direction === "right") {
      if (direction === "left") {
        if (!loggedInUser.user.dislikes.includes(user.email)) {
          loggedInUser.user.dislikes.push(user.email);
          database.collection("users").doc(loggedInUser.user.id).set(
            {
              dislikes: loggedInUser.user.dislikes,
            },
            { merge: true }
          );
        }
      } else {
        loggedInUser.user.likes.push(user.email);
        database.collection("users").doc(loggedInUser.user.id).set(
          {
            likes: loggedInUser.user.likes,
          },
          { merge: true }
        );

        // check for match
        console.log(user);
        console.log(loggedInUser.user);
        if (user.hasOwnProperty("likes")) {
          if (user.likes.includes(loggedInUser.user.email)) {
            //Matchedwith als Objekt —> + chatId

            // add new chat and get id
            database.collection("chats").add({
              userEmail1: loggedInUser.user.email,
              userEmail2: user.email,
              messages: [],
            });

            // // add matchedUser to loggedInUser
            // database
            //   .collection("users")
            //   .doc(loggedInUser.user.id)
            //   .update({
            //     matchedWith: firebase.firestore.FieldValue.arrayUnion({
            //       matchedWith: user.email,
            //       chatId: 123,
            //     }),
            //   });

            // // add loggedInUser to matchedUser
            // database
            //   .collection("users")
            //   .doc(user.id)
            //   .update({
            //     matchedWith: firebase.firestore.FieldValue.arrayUnion({
            //       matchedWith: loggedInUser.user.email,
            //       chatId: 123,
            //     }),
            //   });

            console.log("MATCH!");
            setUserMatched(user);
            setShowMatchModal(true);
          }
        }
      }
    }
  };

  return (
    <div className="matchGame__outerCardContainer">
      {userMatched ? (
        <Modal open={showMatchModal} onClose={() => setShowMatchModal(false)}>
          <div style={modalStyle} className={classes.paper}>
            <form className="matchgame__match">
              <center>
                <h4>Yeassss!</h4>
                <p>You matched with {userMatched.username}</p>
              </center>
              <center>
                <img
                  className=""
                  src={userMatched.pictures[0].imageUrl}
                  alt=""
                  width="50%"
                  heigth="50%"
                />
              </center>
              <Button onClick={() => setShowMatchModal(false)}>
                Continue swiping
              </Button>
              <Button onClick={jumpIntoChat}>
                Jump to chat with {userMatched.username}
              </Button>
            </form>
          </div>
        </Modal>
      ) : null}

      {users.map((user, index) => (
        <div key={user.id} className="matchGame__innerCardContainer">
          {user.pictures && (
            <TinderCard
              className="swipe"
              key={user.username}
              preventSwipe={["up", "down"]}
              onSwipe={(dir) => onSwipe(dir, user)}
            >
              <div
                style={{
                  backgroundImage: `url(${user.pictures[0].imageUrl})`,
                  position: index === 0 ? "relative" : "relative",
                }}
                className="card"
              >
                <h3 style={{ color: "black" }}>{user.username}</h3>
                <p>{index}</p>
              </div>
            </TinderCard>
          )}

          <br />
          <br />
        </div>
      ))}
    </div>
  );
}

export default MatchGame;
