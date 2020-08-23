import React, { useEffect, useState } from "react";
import { database, auth } from "./../firebase";
import ImageUpload from "./ImageUpload/ImageUpload";

function Profile(props) {
  console.log(props.user);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribe;

    unsubscribe = database.collection("users").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const currentUser = doc.data();
        if (props.user.email === currentUser["email"]) {
          setUser(currentUser);
        }
      });

      // setUsers(
      //   snapshot.docs.map((doc) => ({
      //     user: doc.data(),
      //   }))
      // );

      // console.log("im snap");
      // console.log(users);

      // setUser(snapshot.docs.map((doc) => doc.data()));

      //   setComments(snapshot.docs.map((doc) => doc.data()));
    });

    // users.map((user) => {
    //   console.log(user);
    //   console.log(user.email);
    //   console.log(props);
    //   console.log(props.email);
    //   if (user.email === props.email) {
    //     setUser(user);
    //   }
    // });

    return () => {
      unsubscribe();
    };
    // [postId] --> dependency? listener?
  }, []);

  useEffect(() => {
    users.map((user) => {
      console.log(user.email);
      console.log(props.user.email);
      if (user.email === props.user.email) {
        setUser(user);
      }
    });
  }, [users]);

  const deleteUser = () => {
    auth.signOut();
    props.onChange(null);
  };

  const onUpdate = () => {
    // database
    //   .collection("users")
    //   .doc("0yTqcVR4JbkbpoBSzYV7")
    //   .set({
    //     ...user,
    //     user,
    //   });
    console.log(user);
  };

  const logData = () => {
    console.log(users);
    console.log(user);
  };

  return (
    <div>
      <input
        value={user}
        onChange={(e) => {
          setUser(e.target.value);
        }}
      />
      <button onClick={onUpdate}>Update</button>
      <button onClick={logData}>log data</button>

      {props.user.email}
      <ImageUpload />
      <button onClick={deleteUser}>Logout</button>
    </div>
  );
}

export default Profile;
