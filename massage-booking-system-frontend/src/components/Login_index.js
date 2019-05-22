import React, { Fragment } from 'react'
import LoginForm from './LoginForm'

const LoginIndex = (props) => {
  // console.log('Login index props', props)
  return (
    <Fragment>
      <h1>Unity massage booking system</h1>
      <h3>Log in</h3>
      <LoginForm {...props} />
    </Fragment>
  )
}

export default LoginIndex