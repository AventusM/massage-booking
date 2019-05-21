import React from 'react'

const RegistrationForm = (props) => {
  const { handleRegistrationFunction, name, email, setEmail, password, setPassword, setPasswordCheck } = props
  return (
    <form onSubmit={handleRegistrationFunction}>
      <div>Name
        <input
          type="text"
          id="name"
          value={name}
          name="name"
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <div>Email
        <input
          type="text"
          id="email"
          value={email}
          name="email"
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>
      <div>Phone Number
        <input
          type="text"
          id="number"
          value={number}
          name="number"
          onChange={({ target }) => setNumber(target.value)}
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
        <div>Retype Password
        <input
          type="passwordCheck"
          id="passwordCheck"
          value={passwordCheck}
          name="passwordCheck"
          onChange={({ target }) => setPasswordCheck(target.value)}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  )
}

export default RegistrationForm