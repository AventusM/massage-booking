import React, { useState, useEffect, Fragment } from 'react'
import LoginForm from './LoginForm'
import unity from '../pics/unity1.png'
import unityBackground from '../pics/unity3.png'


const LoginIndex = (props) => {
  // console.log('Login index props', props)

  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth))
  }, [])


  const isMobile = width <= 500
  if (isMobile) {
    return (
      <div className="login_wrapper_mobile">
       <img id= "unity" src = {unity}></img>
        <h1>Massage booking <br/>system</h1>
        <LoginForm {...props} />
      </div>
    )
    }else {
      return (
        <div className="login_wrapper_desktop">
        
         
         <div className="form-div">
         <h1>Massage booking <br/>system</h1>
          <LoginForm {...props} />
          </div>
          <img id= "unityBackground" src = {unityBackground}></img>
        </div>
      )
    }    
  }

export default LoginIndex