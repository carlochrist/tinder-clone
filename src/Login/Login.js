import React, { useState, useEffect } from "react";
import { Button, Input } from "@material-ui/core";
import "./Login.css";
import { database, auth } from "./../firebase";

function Login(props) {
  console.log(props);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [signInPressed, setSignInPressed] = useState(false);
  const [signUpPressed, setSignUpPressed] = useState(false);

  const sendData = (authUser) => {
    console.log(authUser);
    console.log(props);
    props.onChange(authUser);
  };

  useEffect(() => {
    // backend-listener
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in
        console.log(authUser);
        setUser(authUser);
        // handleChange(user);

        console.log(props);
        console.log(props.handleChange);
        sendData(authUser);
        // props.handleChange(props.item.id)}
      } else {
        // user logged out
        setUser(null);
      }
    });

    return () => {
      // perfom cleanup actions
      unsubscribe();
    };

    // frontend-listener
  }, [user, username]);

  const handleChange = (event) => {
    // Here, we invoke the callback with the new value
    console.log(event);
    props.onChange(event.target.value);
  };

  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  };

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
  };

  const openSignUp = (event) => {
    event.preventDefault();
    setSignUpPressed(true);
  };

  const openSignIn = (event) => {
    event.preventDefault();
    setSignUpPressed(false);
    setSignInPressed(true);
  };

  const backToStart = (event) => {
    event.preventDefault();
    setSignUpPressed(false);
    setSignInPressed(false);
  };

  return (
    <div>
      <form className="login">
        <div className="login__logo" onClick={backToStart}>
          <img
            className="header__logo"
            src="https://1000logos.net/wp-content/uploads/2018/07/tinder-logo.png"
            alt="tinder logo"
          />
          <h1 style={{ color: "white" }}>tinder</h1>
        </div>

        {signUpPressed ? (
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        ) : null}

        {signInPressed || signUpPressed ? (
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : null}

        {signInPressed || signUpPressed ? (
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        ) : null}

        {!(signInPressed || signUpPressed) ? (
          <div className="login__container">
            <button onClick={openSignIn}>Sign In</button>
            <button onClick={openSignUp}>Sign Up</button>
          </div>
        ) : signInPressed ? (
          <button onClick={signIn}>Sign In</button>
        ) : (
          <button onClick={signUp}>Sign Up</button>
        )}
      </form>
    </div>
  );
}

export default Login;

// {user ? (
//     <button onClick={() => auth.signOut()}>Logout</button>
//   ) : (
//     <div className="login__container">
//       <button onClick={<i class="fa fa-sign-in" aria-hidden="true"></i>}>
//         Sign In
//       </button>
//       <button onClick={signUp}>Sign Up</button>
//     </div>
//   )}
