import React from 'react'

// ID selector RESERVED FOR CYPRESS
const LoginForm = (props) => {
  // console.log('props within loginform', props)
  const { handleLoginFunction, email, password, setEmail, setPassword } = props
  return (
    <form onSubmit={handleLoginFunction}>
      <div>Username
        <input
          type="text"
          id="email"
          value={email}
          name="email"
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>
      <div>Password
        <input
          type="password"
          id="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">log in</button>
    </form>
  )
}

export default LoginForm