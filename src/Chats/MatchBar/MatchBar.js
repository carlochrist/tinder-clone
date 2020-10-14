import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

function MatchBar(matchedUsers) {
  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        textAlign: "center",
      }}
      className="matchedUsers"
    >
      {matchedUsers.matchedUsers.map((user) => (
        <div
          key={user.id}
          style={{
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          {user.pictures && (
            <Avatar
              key={user.id}
              className={classes.large}
              src={user.pictures[0].imageUrl}
            />
          )}
          <p>{user.username}</p>
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
