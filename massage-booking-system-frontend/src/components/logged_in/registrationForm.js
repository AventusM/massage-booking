import React, { Fragment } from 'react'
import RegistrationForm from './RegistrationForm'

const RegistrationForm = (props) => {
  return (
    <Fragment>
      <h1>Unity massage booking system</h1>
      <h3>Create new user</h3>
      <RegistrationForm {...props} />
    </Fragment>
  )
}

export default RegistrationForm