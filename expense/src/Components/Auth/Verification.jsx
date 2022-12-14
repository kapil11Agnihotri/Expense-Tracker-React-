import axios from "axios";
import React from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import classes from "./Verification.module.css";

const Verification = () => {
  //const ctx = useContext(AuthContext);
  const location = useNavigate();
  const token=useSelector(state=>state.auth.token)
 

  const submitHandler = async () => {
    const obj = {
      requestType: "VERIFY_EMAIL",
      idToken:token,
    };

    const resp = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCm5L7G1RQwkRNv8SpcRkiunQDVORXBR48",
      obj
    );
    console.log(resp);
    location('/Welcome')

    //  const object={
    //     oobCode:'conferm',
    //  }
    // const verifyResp = await axios.post(
    //   "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCm5L7G1RQwkRNv8SpcRkiunQDVORXBR48",
    //   object
    // );
    // console.log(verifyResp)
  };

  return (
    <div className={classes.verify}>
      <button onClick={submitHandler}>Verify Email</button>
    </div>
  );
};

export default Verification;
