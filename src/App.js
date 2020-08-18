import React from "react";
import "./App.css";
import Header from "./Header/Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TinderCard from "react-tinder-card";
import TinderCards from "./TinderCards/TinderCards";
import SwipeButtons from "./Swipe/SwipeButtons";
import Chats from "./Chats/Chats";
import ChatScreen from "./Chats/ChatScreen/ChatScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/profile">
            <Header />
            <h1>I am the profile-page</h1>
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
            <TinderCards />
            <SwipeButtons />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

{
  /* Tinder Cards */
}
{
  /* Buttons below Tinder Cards */
}

{
  /* Chats Screen */
}
{
  /* Individual chat screen */
}
