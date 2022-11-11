import React from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../Store/AuthContext'
import './Welcome.css'

const Welcome = () => {
  const ctx=useContext(AuthContext)
  const location=useNavigate()

  const logoutHandler=()=>{
  ctx.logout()
  location('/')
  }


  return (
    <div className='header'>
      <div>
      Welcome To Expence Tracker
      </div>
      <div>
        Your profile is incomplete : 
       
        <Link to='/profile'>Complete Now</Link>
      </div>
      <div >
        <button className='button' onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  )
}

export default Welcome