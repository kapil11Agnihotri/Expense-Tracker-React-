import React, { useRef } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Store/AuthContext";
import classes from "./Profile.module.css";

const Profile = () => {
  const nameInputRef = useRef();
  const urlInputRef = useRef();

  const AuthCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredUrl = urlInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCm5L7G1RQwkRNv8SpcRkiunQDVORXBR48",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: AuthCtx.token,
          displayName: enteredName,
          photoUrl: enteredUrl,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      console.log(res);
      alert('Success')
    }).catch((err)=>{
        console.log(err)
        alert('Failed')
    })
  };

  return (
    <>

    <section className={classes.profile}>
        <Link to='/Welcome'>
            {<button className={classes.remove}>X</button>}
        </Link>
        
      <form onSubmit={submitHandler}>
        <h1>Contact Details</h1>
        <div >
          <div className={classes.control}>
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="name" ref={nameInputRef} />
          </div>
          <div className={classes.control} >
            <label>Profile Photo Url</label>
            <input type="text" id="url" ref={urlInputRef} />
          </div>
        </div>
        <div className={classes.actions}>
        <button>Update</button>
        </div>
      </form>
    </section>
    </>
  );
};

export default Profile;
