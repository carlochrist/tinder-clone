import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { Button, Input } from "@material-ui/core";
import { database } from "./../firebase";
import "./MatchGame.css";
import Modal from "@material-ui/core/Modal";
import useDeepCompareEffect, {
  useDeepCompareEffectNoCheck,
} from "use-deep-compare-effect";

function MatchGame(loggedInUser) {
  const [users, setUsers] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [picture, setPicture] = useState(null);
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [userMatched, setUserMatched] = useState(null);

  const loadUserPictures = (userId) => {
    // setSelectedCinema(user);
    database
      .collection("users")
      .doc(userId)
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
          // fetchedPictures[0] = fetchedPicture;
        });

        setPictures((oldPictures) => [...oldPictures, fetchedPictures]);
      })
      .catch((error) => {
        // setError(error);
        console.log(error);
      });
  };

  // piece of code which runs based on a condition
  // useDeepCompareEffectNoCheck(() => {
  useEffect(() => {
    // this is where the code runs...

    let tempUser = null;

    const unsubscribe = database.collection("users").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const currentUser = {
          id: doc.id,
          ...doc.data(),
        };

        console.log(loggedInUser);

        // const currentUser = doc.data();
        // if (props.user.email === currentUser["email"]) {
        //   currentUser.id = doc.id;
        //   if (!currentUser.hasOwnProperty("gender")) {
        //     currentUser.gender = "male";
        //   }
        //   if (!currentUser.hasOwnProperty("lookingFor")) {
        //     currentUser.lookingFor = "";
        //   }
        //   if (!currentUser.hasOwnProperty("hereFor")) {
        //     currentUser.hereFor = [];
        //   }

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

                  currentUser.pictures = [];
                  Object.assign(currentUser.pictures, fetchedPictures);
                })
                .catch((error) => {
                  // setError(error);
                  console.log(error);
                });

              console.log(currentUser);

              setUsers((oldUsers) => [...oldUsers, currentUser]);
              // setUsers(users);

              console.log(users);
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

  // pushing
  // BAD
  // const user = [];
  // user.push('abc', 'def');

  // GOOD (push to an array in REACT)
  // setUser([...user, 'abc', 'def'])

  const onSwipe = (direction, user) => {
    console.log("You swiped: " + direction);
    // console.log("User: ", user);

    console.log(user);
    console.log(users);
    console.log(loggedInUser);

    if (direction === "left") {
      loggedInUser.user.dislikes.push(user.email);
      database.collection("users").doc(loggedInUser.user.id).set(
        {
          dislikes: loggedInUser.user.dislikes,
        },
        { merge: true }
      );
    } else {
      loggedInUser.user.likes.push(user.email);
      database.collection("users").doc(loggedInUser.user.id).set(
        {
          likes: loggedInUser.user.likes,
        },
        { merge: true }
      );

      // check for match
      if (user.likes.includes(loggedInUser.user.email)) {
        console.log("!!!");
        console.log(showMatchModal);
        setUserMatched(user);
        setShowMatchModal(true);
        console.log(showMatchModal);
      }
    }

    // console.log(pictures);
    // console.log(picture);

    // for (let i = 0; i < users.length; i++) {
    //   if (users[i].id === user.id) {
    //     users.splice(i, 1);
    //   }
    // }

    // setUsers(users);
  };

  const reRenderUsers = () => {
    console.log(users);
    console.log(pictures);

    // setUsers(users);

    if (userDataLoaded === false) {
      console.log("LOL");

      // const copy = [...users];
      // setUsers(copy);
      setUserDataLoaded(true);
    }

    const copy = [...users];
    setUsers(copy);
    // setUserDataLoaded(true);

    console.log(showMatchModal);
  };

  return (
    <div className="matchGame__outerCardContainer">
      {!userDataLoaded ? (
        <button onClick={reRenderUsers}> load users </button>
      ) : null}

      {userMatched ? (
        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={showMatchModal}
          onClose={() => setShowMatchModal(false)}
        >
          <div className="modal">
            <form className="app__signup">
              <h4>Yeassss!</h4>
              <p>You matched with {userMatched.username}</p>
              <center>
                <img
                  className=""
                  src={userMatched.pictures[0].imageUrl}
                  alt=""
                  width="10%"
                  heigth="10%"
                />
              </center>
              <Button type="submit" onClick="">
                Continue swiping
              </Button>
              <Button type="submit" onClick="">
                Jump to chat with {userMatched.username}
              </Button>
            </form>
          </div>
        </Modal>
      ) : null}

      {users.reverse().map((user, index) => (
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

// <div className="imagelol">
// <img src={user.pictures[0].imageUrl}></img>
// </div>

// <p>{user.username}</p>
// <p>{user.lookingFor}</p>
// <p>{user.hereFor}</p>

// <div className="matchGame__cardContainer">
// {users.map((user) => (
//   <TinderCard
//     className="swipe"
//     key={user.name}
//     preventSwipe={["up", "down"]}
//   >
//     <div
//       style={{ backgroundImage: `url(${user.url})` }}
//       className="card"
//     >
//       <h3 style={{ color: "black" }}>{user.name}</h3>
//     </div>
//   </TinderCard>
// ))}
// </div>

// <img src={picture.imageUrl} />

// style={{ backgroundImage: `url(${pictures[0].imageUrl})` }}

// <TinderCard
// className="swipe"
// key={user.username}
// preventSwipe={["up", "down"]}
// >
// <div
//   style={{ backgroundImage: `url(${picture.imageUrl})` }}
//   className="card"
// >
//   <h3 style={{ color: "black" }}>{user.username}</h3>
// </div>
// </TinderCard>

// {users.length > 0 ? <p> was </p> : <p> nix </p>}

// {users.map((user) => (
//   <TinderCard
//     className="swipe"
//     key={user.name}
//     preventSwipe={["up", "down"]}
//   >
//     <div
//       style={{ backgroundImage: `url(${user.url})` }}
//       className="card"
//     >
//       <h3 style={{ color: "black" }}>{user.name}</h3>
//     </div>
//   </TinderCard>
// ))}

// <div className="matchGame__cardContainer">
// {users.map((user) => (
//   return <div>
//   <p>{user.username}</p>
//   <img src={user.pictures[0].imageUrl} />
//   </div>
// ))}
// </div>

// <img src={user.mainPic} />

// {pictures.length > 0 ? (
//   <TinderCard
//     className="swipe"
//     key={user.id}
//     preventSwipe={["up", "down"]}
//   >
//     <div className="card">
//       style={{ backgroundImage: `url(${picture.imageUrl})` }}
//       <h3 style={{ color: "black" }}>{user.username}</h3>
//     </div>
//   </TinderCard>
// ) : null}
