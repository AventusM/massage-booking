import React from 'react'

const LoginForm = (props) => {
    const { handleLoginFunction, email, password, setEmail, setPassword } = props
    return (
      <form onSubmit={handleLoginFunction}>
        <div>Käyttäjätunnus
        <input
            type="text"
            value={email}
            name="email"
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div>Salasana
        <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    )
  }

  export default LoginForm