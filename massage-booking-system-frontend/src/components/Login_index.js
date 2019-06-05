import React, { useState, useEffect, Fragment } from 'react'
import LoginForm from './LoginForm'
import unity5 from '../pics/unity5.png'
import unity4 from '../pics/unity4.png'

const LoginIndex = props => {
  // console.log('Login index props', props)

  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])

  const isMobile = width <= 700
  if (isMobile) {
    return (
      <div className="login_wrapper_mobile">
        <img id= "unity" src = {unity5}></img>
        <h1>Massage Booking</h1>
        <LoginForm {...props} />
      </div>
    )
    }else {
      return (
        <div className="login_wrapper_desktop">
        
         
         <div className="form-div">
         <h1>Massage Booking</h1>
          <LoginForm {...props} />
        </div>
        <img id="unity4" src={unity4} />
      </div>
    )
  }
}

export default LoginIndex
