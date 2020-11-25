import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header/Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MatchGame from "./MatchGame/MatchGame";
import SwipeButtons from "./Swipe/SwipeButtons";
import Chats from "./Chats/Chats";
import ChatScreen from "./Chats/ChatScreen/ChatScreen";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";
import { database } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  // console.log(user);

  const handleChange = (newUser) => {
 
    if (newUser === null) {
      console.log("test");
      setUser(null);
    } else {
      database.collection("users").onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          const currentUser = doc.data();
          if (newUser.email === currentUser["email"]) {
            currentUser.id = doc.id;
            if (!currentUser.hasOwnProperty("gender")) {
              currentUser.gender = "male";
            }
            if (!currentUser.hasOwnProperty("lookingFor")) {
              currentUser.lookingFor = "";
            }
            if (!currentUser.hasOwnProperty("hereFor")) {
              currentUser.hereFor = [];
            }
            if (!currentUser.hasOwnProperty("likes")) {
              currentUser.likes = [];
            }
            if (!currentUser.hasOwnProperty("dislikes")) {
              currentUser.dislikes = [];
            }
            if (!currentUser.hasOwnProperty("matches")) {
              currentUser.matches = [];
            }
            setUser(currentUser);
          }
        });
      });
    }
  };

  // passing a callback to a Child:
  // return <Child value={value} onChange={handleChange} />;

  return (
    <div className="">
      {user === null ? (
        <Login user={user} onChange={handleChange} />
      ) : (
        <Router>
          <Switch>
            <Route path="/" exact>
              <Header />
              <MatchGame user={user} />
              <SwipeButtons />
            </Route>
            <Route path="/profile">
              <Header />
              <Profile user={user} onChange={handleChange} />
            </Route>
            <Route path="/chat/:person">
              <Header backButton="/chat" />
              <ChatScreen />
            </Route>
            <Route path="/chat">
              <Header backButton="/" />
              <Chats user={user} />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
