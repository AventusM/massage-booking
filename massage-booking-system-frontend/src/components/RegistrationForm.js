import React from 'react'

const RegistrationForm = (props) => {
  const { handleRegistrationFunction, name, email, number, password, passwordCheck} = props
  return (
    <form onSubmit={handleRegistrationFunction}>
      <div>Name
        <input
          type={name.type}
          id="name"
          value={name.value}
          name="name"
          onChange={name.handleFieldChange}
        />
      </div>
      <div>Email
        <input
          type={email.type}
          id="email"
          value={email.value}
          name="email"
          onChange={email.handleFieldChange}
        />
      </div>
      <div>Phone Number
        <input
          type={number.type}
          id="number"
          value={number.value}
          name="number"
          onChange={number.handleFieldChange}
        />
      </div>
      <div>Password
        <input
          type={password.type}
          id="password"
          value={password.value}
          name="password"
          onChange={password.handleFieldChange}
        />
        </div>
        <div>Retype Password
        <input
          type={passwordCheck.type}
          id="passwordCheck"
          value={passwordCheck.value}
          name="passwordCheck"
          onChange={passwordCheck.handleFieldChange}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  )
}

export default RegistrationForm