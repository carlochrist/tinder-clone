import React, { useEffect, useState } from "react";
import { database, auth } from "./../firebase";
import "./Profile.css";
import ImageUpload from "./ImageUpload/ImageUpload";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Profile(props) {
  const [user, setUser] = useState(null);
  const [pictures, setPictures] = useState([]);
  const carouselSettings = {
    dots: true,
    fade: true,
    infinte: true,
    speed: 500,
    slidesToShow: 1,
    swipeToSlide: true,
    arrows: true,
    slidesToScroll: 1,
    className: "slides",
  };

  useEffect(() => {
    let unsubscribe;

    // get loggedin user
    unsubscribe = database.collection("users").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const currentUser = doc.data();
        if (props.user.email === currentUser["email"]) {
          currentUser.id = doc.id;

          // setPictures([]);
          // console.log(pictures);

          database
            .collection("users")
            .doc(doc.id)
            .collection("pictures")
            .onSnapshot((snapshot) => {
              setPictures(snapshot.docs.map((doc) => doc.data()));
            });

          setUser(currentUser);
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
    console.log("props: ", props);
    console.log("user: ", user);
    console.log("pictures: ", pictures);
  };

  return (
    <div>
      <div className="profile">
        {pictures ? (
          <Carousel>
            {pictures.map((picture) => {
              // console.log(picture);
              return (
                <div className="profile__picture">
                  <img width="500px" src={picture.imageUrl} />
                </div>
              );
            })}
          </Carousel>
        ) : null}
      </div>

      {user ? <p>Welcome {user.username}!</p> : null}

      <input
        value={user ? { user } : null}
        onChange={(e) => {
          setUser(e.target.value);
        }}
      />
      <button onClick={onUpdate}>Update</button>
      <button onClick={logData}>log data</button>

      {props.user.email}
      <ImageUpload user={user} />
      <button onClick={deleteUser}>Logout</button>
    </div>
  );
}

export default Profile;

// {pictures ? (
//   <Slider {...carouselSettings} className="Slider">
//     {pictures.map((picture) => {
//       // console.log(picture);
//       return (
//         <div className="profile__picture">
//           <img width="500px" src={picture.imageUrl} />
//         </div>
//       );
//     })}
//   </Slider>
// ) : null}

// <div className="profile">
// {pictures ? (
//   <Slider {...carouselSettings} className="Slider">
//     {pictures.map((picture) => {
//       // console.log(picture);
//       return (
//         <div className="profile__picture">
//           <img width="500px" src={picture.imageUrl} />
//         </div>
//       );
//     })}
//   </Slider>
// ) : null}
// </div>
