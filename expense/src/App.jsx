import React from 'react'
import { useContext } from 'react'
import AuthForm from './Components/Auth/AuthForm'
import Welcome from './Components/Layout/Welcome'
import AuthContext from './Components/Store/AuthContext'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from './Components/Profile/Profile'

const App = () => {
 const loginCtx=useContext(AuthContext)
 const loggedIn=loginCtx.isLoggedIn

  return (
    <BrowserRouter>
    <Routes>
      { loggedIn && <Route path="/Welcome" element={<Welcome/>} />}
      <Route path="/" element={<AuthForm/>} /> 
      {loggedIn && <Route path="/Profile" element={<Profile/>} />}
      
      </Routes>
      </BrowserRouter>
  )
}

export default App
