import React from 'react'
import Notification from './Notification'


// ID selector RESERVED FOR CYPRESS
const LoginForm = (props) => {
  // console.log('props within loginform', props)
  const { handleLoginFunction, email, password, errorMessage } = props
  return (
    <form onSubmit={handleLoginFunction}>

      <label>Email</label>
      <input
        type={email.type}
        id="email"
        value={email.value}
        name="email"
        onChange={email.handleFieldChange}
      />

      <label>Password</label>
      <input
        type={password.type}
        id="password"
        value={password.value}
        name="password"
        onChange={password.handleFieldChange}
      /> 
      
      <Notification message={errorMessage} />
      <button id="login_button" type="submit">Log in</button>
      
    </form>
  )
}

export default LoginForm