import React from 'react'
import Notification from './Notification'

// ID selector RESERVED FOR CYPRESS
const LoginForm = props => {
  // console.log('props within loginform', props)
  const { handleLoginFunction, email, password, errorMessage } = props
  return (
    <div className="login_button">
      <a href="/auth/google">Login</a>
    </div>
  )
}

export default LoginForm
