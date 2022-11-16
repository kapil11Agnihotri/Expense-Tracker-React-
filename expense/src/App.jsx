import React from 'react'
//import { useContext } from 'react'
import AuthForm from './Components/Auth/AuthForm'
import Welcome from './Components/Layout/Welcome'
//import AuthContext from './Components/Store/AuthContext'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from './Components/Profile/Profile'
import Verification from './Components/Auth/Verification'
import ResetPassword from './Components/Auth/ResetPassword'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { authActions } from './Components/Store/AuthReducer'
import { getExpenseData, sendExpenseData} from './Components/Store/expense-actions';
import Footer from './Components/Layout/Footer';

let isInitial=true
const App = () => {
 //  const loginCtx=useContext(AuthContext)
 //  const loggedIn=loginCtx.isLoggedIn
 const loggedIn=useSelector(state=>authActions.login)
 const dispatch=useDispatch()
 const expense=useSelector(state=>state.expense)
 let totalAmount=0 
 

 totalAmount=expense.expenses?.reduce((ack,item)=>{
 return ack+=Number(item.enteredAmount)
  
 },0)

 console.log(totalAmount)

  useEffect(()=>{
   dispatch(authActions.initialToken())
  },[])

  useEffect(()=>{
  
    dispatch(getExpenseData())
  },[dispatch])

  useEffect(()=>{
    if(isInitial){
      isInitial=false
      return
     }
     if(expense.changed){
      dispatch(sendExpenseData(expense))
     }
   
  },[expense,dispatch])

  return (
    <BrowserRouter>
    <Routes>
      { loggedIn && <Route path="/Welcome" element={<Welcome/>} />}
      <Route path="/" element={<AuthForm/>} /> 
      {loggedIn && <Route path="/Verification" element={<Verification/>} />}
      {loggedIn && <Route path="/Profile" element={<Profile/>} />}
      <Route path="/Reset" element={<ResetPassword/>} /> 
      
      </Routes>
     <div>
     {totalAmount>=10000?<Footer/>:<></> }
     </div>
      </BrowserRouter>

  )
}

export default App
