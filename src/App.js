import React, { useState } from "react";
import "./App.css";
import Header from "./Header/Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MatchGame from "./MatchGame/MatchGame";
import SwipeButtons from "./Swipe/SwipeButtons";
import Chats from "./Chats/Chats";
import ChatScreen from "./Chats/ChatScreen/ChatScreen";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";

function App() {
  const [user, setUser] = useState(null);

  const handleChange = (newUser) => {
    // console.log(newUser);
    setUser(newUser);
  };

  // We pass a callback to Child
  // return <Child value={value} onChange={handleChange} />;

  return (
    <div className="">
      {user === null ? (
        <Login user={user} onChange={handleChange} />
      ) : (
        <Router>
          <Switch>
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
              <Chats />
            </Route>
            <Route path="/">
              <Header />
              <MatchGame />
              <SwipeButtons />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
