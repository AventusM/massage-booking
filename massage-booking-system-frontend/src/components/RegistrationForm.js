import React from 'react'

const RegistrationForm = props => {
  const {
    handleRegistrationFunction,
    name,
    email,
    number,
    password,
    passwordCheck,
  } = props
  return (
    <form onSubmit={handleRegistrationFunction}>
      <label>Name</label>
      <input
        type={name.type}
        id="name"
        value={name.value}
        name="name"
        onChange={name.handleFieldChange}
      />

      <label>Email</label>
      <input
        type={email.type}
        id="email"
        value={email.value}
        name="email"
        onChange={email.handleFieldChange}
      />

      <label>Phone number</label>
      <input
        type={number.type}
        id="number"
        value={number.value}
        name="number"
        onChange={number.handleFieldChange}
      />

      <label>Password</label>
      <input
        type={password.type}
        id="password"
        value={password.value}
        name="password"
        onChange={password.handleFieldChange}
      />

      <label>Retype password</label>
      <input
        type={passwordCheck.type}
        id="passwordCheck"
        value={passwordCheck.value}
        name="passwordCheck"
        onChange={passwordCheck.handleFieldChange}
      />
      <button type="submit">Register</button>
    </form>
  )
}

export default RegistrationForm
