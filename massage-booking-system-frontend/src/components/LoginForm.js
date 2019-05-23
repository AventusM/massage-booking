import React from 'react'
import Notification from './Notification'


// ID selector RESERVED FOR CYPRESS
const LoginForm = (props) => {
  // console.log('props within loginform', props)
  const { handleLoginFunction, email, password, errorMessage } = props
  return (
    <div>
    <form className="login_form" onSubmit={handleLoginFunction}>
    <label>Username</label>
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
      
      
      <button type="submit">LOGIN</button>
      <Notification message={errorMessage} />
    </form>
    </div>
  )
}

export default LoginForm