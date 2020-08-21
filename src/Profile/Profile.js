import React from "react";
import { database, auth } from "./../firebase";

function Profile(props) {
  return (
    <div>
      {props.email}
      <button onClick={() => auth.signOut()}>Logout</button>
    </div>
  );
}

export default Profile;

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
