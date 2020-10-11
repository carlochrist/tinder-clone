import React from "react";
import Avatar from "@material-ui/core/Avatar";

function MatchBar(matchedUsers) {
  console.log(matchedUsers);

  return (
    <div>
      {matchedUsers.matchedUsers.map((user) => (
        <div key={user.id}>
          {user.pictures && (
            <Avatar
              key={user.id}
              className="chat__image"
              src={user.pictures[0].imageUrl}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default MatchBar;

// <img
// className=""
// src={user.pictures[0].imageUrl}
// alt=""
// width="50%"
// heigth="50%"
// />
