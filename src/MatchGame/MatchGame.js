import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { database } from "./../firebase";
import "./MatchGame.css";

function MatchGame() {
  const [users, setUser] = useState([]);

  // piece of code which runs based on a condition
  useEffect(() => {
    // this is where the code runs...

    const unsubscribe = database
      .collection("users")
      .onSnapshot((snapshot) =>
        setUser(snapshot.docs.map((doc) => doc.data()))
      );

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

  return (
    <div>
      <div className="matchGame__cardContainer">
        {users.map((user) => (
          <TinderCard
            className="swipe"
            key={user.name}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{ backgroundImage: `url(${user.url})` }}
              className="card"
            >
              <h3 style={{ color: "black" }}>{user.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default MatchGame;
