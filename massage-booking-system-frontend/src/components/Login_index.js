import React, { useState, useEffect } from 'react'
import unity5 from '../pics/unity5.png'
import unity4 from '../pics/unity4.png'
import GoogleButton from 'react-google-button'

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
        <img id="unity" src={unity5} />
        <h1>Massage Booking</h1>
        <div className="login_button">
          <GoogleButton
            type="light"
            onClick={() => (window.location.href = '/auth/google')}
          />
        </div>
      </div>
    )
  } else {
    return (
      <div className="login_wrapper_desktop">
        <h1>Massage Booking</h1>
        <div className="login_button">
          <GoogleButton
            type="light"
            onClick={() => (window.location.href = '/auth/google')}
          />
        </div>
        <img id="unity4" src={unity4} />
      </div>
    )
  }
}

export default LoginIndex
