import React from 'react'
import Notification from './Notification'


// ID selector RESERVED FOR CYPRESS
const LoginForm = (props) => {
  // console.log('props within loginform', props)
  const { handleLoginFunction, email, password, errorMessage } = props
  return (
    <form onSubmit={handleLoginFunction}>

      <button id="login_button" type="submit">Log in</button>
      
    </form>
  )
}

export default LoginForm