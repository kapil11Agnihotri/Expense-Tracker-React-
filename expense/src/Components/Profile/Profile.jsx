import React, {  useRef } from "react";
import { Link } from "react-router-dom";
import classes from "./Profile.module.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Profile = () => {
  const nameInputRef = useRef();
  const urlInputRef = useRef();

 
  const token=useSelector(state=>state.auth.token)

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredUrl = urlInputRef.current.value;

    const obj = {
      idToken: token,
      displayName: enteredName,
      photoUrl: enteredUrl,
      returnSecureToken: true,
    };

    const response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCm5L7G1RQwkRNv8SpcRkiunQDVORXBR48",
      obj
    );
    console.log(response);
  };

  const getDetail = async () => {
    const obj = {
      idToken:token,
    };
    const res = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCm5L7G1RQwkRNv8SpcRkiunQDVORXBR48",
      obj
    );
    console.log(res);
    nameInputRef.current.value=res.data.users[0].displayName
    urlInputRef.current.value=res.data.users[0].photoUrl
    
  };
  getDetail();


  return (
    <>
      <div className="header">
        <div>Winners naver quite , Quitters naver win.</div>
        <div>Your profile is Complete</div>
      </div>
      <section className={classes.profile}>
        <Link to="/Welcome">
          {<button className={classes.remove}>X</button>}
        </Link>

        <form onSubmit={submitHandler}>
          <h1>Contact Details</h1>
          <div>
            <div className={classes.control}>
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="name" ref={nameInputRef} />
            </div>
            <div className={classes.control}>
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
