import React, { useState, useRef } from "react";
import { useContext } from "react";
import AuthContext from "../Store/AuthContext";
import classes from './AuthForm.module.css'
import { useNavigate } from "react-router-dom";
import Logo from '../Assets/Logo.png'

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLodding,setIsLoading]=useState(false)
  const emailRef = useRef();
  const passwordRef = useRef();
  const history=useNavigate()
 
  const authCtx=useContext(AuthContext) 

  const submitHandler=(event)=>{
    event.preventDefault()

    const enteredEmail=emailRef.current.value
    const enteredPassword=passwordRef.current.value
    setIsLoading(true)
    let url;
    if(isLogin){
      url= "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCm5L7G1RQwkRNv8SpcRkiunQDVORXBR48";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCm5L7G1RQwkRNv8SpcRkiunQDVORXBR48";
    }
    fetch(url,{
      method:'POST',
      body:JSON.stringify({
        email:enteredEmail,
        password:enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res)=>{
      if(res.ok){
        setIsLoading(false)
        return res.json();
      }else{
        return res.json().then((data)=>{
          let errorMessage='Authentication Failed'
          if(data && data.error && data.error.message){
            errorMessage=data.error.message;
          }
          alert(errorMessage)
          throw new Error(errorMessage)
        })
      }
    }).then((data)=>{
      authCtx.login(data.idToken)
      history('/Verification')
      
    }).catch((error)=>{
      alert(error.message)
    })
  }
  

  return (
    <>
    <div className="header">
      <div style={{display:'flex'}}>
        <img className="img" src={Logo} alt='logoimg'/>
        <div style={{margin:'10px'}}>Expense Tracker</div>
      </div>
    </div>
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "SignUp"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" required ref={passwordRef}/>
        </div>
        <div className={classes.actions}>
          {!isLodding &&<button>{isLogin ? "Login" : "Create Account"}</button>}
          {isLodding && <h3>Sending Request....</h3>}
        </div>
      </form>
      <div>
      <div className={classes.actions}>
      <button
            onClick={() => {
              setIsLogin((pre) => !pre);
            }}
            className={classes.toggle}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
      </div>
      </div>
    </section>
    </>
  );
};

export default AuthForm;
