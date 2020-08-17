import React from "react";
import "./App.css";
import Header from "./Header/Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TinderCard from "react-tinder-card";
import TinderCards from "./TinderCards/TinderCards";
import SwipeButtons from "./Swipe/SwipeButtons";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/chat">
            <h1>I am the chat-page</h1>
          </Route>
          <Route path="/">
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
