import React from 'react'

// ID selector RESERVED FOR CYPRESS
const LoginForm = (props) => {
  // console.log('props within loginform', props)
  const { handleLoginFunction, email, password, setEmail, setPassword } = props
  return (
    <div>
    <form className="login_form" onSubmit={handleLoginFunction}>
    <label>Username</label>
        <input
          type="text"
          id="email"
          value={email}
          name="email"
          onChange={({ target }) => setEmail(target.value)}
        />
      <label>Password</label>
        <input
          type="password"
          id="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      <button type="submit">LOGIN</button>
    </form>
    </div>
  )
}

export default LoginForm