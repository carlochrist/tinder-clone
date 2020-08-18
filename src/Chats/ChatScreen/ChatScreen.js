import React, { useState } from "react";
import "./ChatScreen.css";
import Avatar from "@material-ui/core/Avatar";

function ChatScreen({}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      name: "Ellen",
      profilePic: "...",
      message: "hi",
    },
    {
      name: "Ellen",
      profilePic: "...",
      message: "how are you",
    },
    {
      name: "Ellen",
      profilePic: "...",
      message: "are you there?",
    },
    {
      message: "fine xd",
    },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    setMessages([...messages, { message: input }]);
    setInput("");
  };

  return (
    <div className="chatScreen">
      <p className="chatScreen__timestamp">
        You matched with XXX on 49920340923
      </p>
      {messages.map((message) =>
        message.name ? (
          <div className="chatScreen__message">
            <Avatar
              className="chatScreen__image"
              alt={message.name}
              src={message.image}
            />
            <p className="chatScreen__text">{message.message}</p>
          </div>
        ) : (
          <div className="chatScreen__message">
            <p className="chatScreen__text__self">{message.message}</p>
          </div>
        )
      )}

      <div>
        <form className="chatScreen__input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="chatScreen__inputField"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            onClick={handleSend}
            className="chatScreen__inputButton"
          >
            SEND
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatScreen;
