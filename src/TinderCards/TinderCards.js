import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import database from "./../firebase";
import "./TinderCards.css";

function TinderCards() {
  const [people, setPeople] = useState([]);

  // piece of code which runs based on a condition
  useEffect(() => {
    // this is where the code runs...

    const unsubscribe = database
      .collection("people")
      .onSnapshot((snapshot) =>
        setPeople(snapshot.docs.map((doc) => doc.data()))
      );

    return () => {
      // this is the cleanup...
      unsubscribe();
    };

    // this will run ONCE when the component loads and never again
  }, [people]);

  // pushing
  // BAD
  // const people = [];
  // people.push('abc', 'def');

  // GOOD (push to an array in REACT)
  // setPeople([...people, 'abc', 'def'])

  return (
    <div>
      <div className="tinderCards__cardContainer">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.name}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{ backgroundImage: `url(${person.url})` }}
              className="card"
            >
              <h3 style={{ color: "black" }}>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default TinderCards;
