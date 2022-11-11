import React from 'react'
import { Link } from 'react-router-dom'
import './Welcome.css'

const Welcome = () => {
  return (
    <div className='header'>
      <div>
      Welcome To Expence Tracker
      </div>
      <div>
        Your profile is incomplete : 
        <Link to='/Profile'>Complete Now</Link>
      </div>
    </div>
  )
}

export default Welcome