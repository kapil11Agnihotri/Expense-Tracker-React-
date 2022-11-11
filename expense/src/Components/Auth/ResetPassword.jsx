import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AuthForm.module.css";

const ResetPassword = () => {
  const emailInputRef = useRef();
  const location=useNavigate()

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;

    const obj={
        requestType:"PASSWORD_RESET",
        email:enteredEmail,
    }

    const response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCm5L7G1RQwkRNv8SpcRkiunQDVORXBR48",obj
    );
    console.log(response)
    location('/')
  };

  return (
    <>
      <div className="header">Reset Password</div>
      <section className={classes.auth}>
        <h4>Enter the email with which you have registered.</h4>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <input type="email" ref={emailInputRef} />
          </div>
          <div className={classes.actions}>
            <button>Send Link</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default ResetPassword;
