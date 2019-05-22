import React from 'react'


// ID selector RESERVED FOR CYPRESS
const LoginForm = (props) => {
  console.log('props within loginform', props)
  const { handleLoginFunction, email, password } = props
  return (
    <form onSubmit={handleLoginFunction}>
      <div>Username
        <input
          type={email.type}
          id="email"
          value={email.value}
          name="email"
          onChange={email.handleFieldChange}
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
      <button type="submit">log in</button>
    </form>
  )
}

export default LoginForm