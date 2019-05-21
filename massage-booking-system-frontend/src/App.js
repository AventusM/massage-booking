import React, { useState, useEffect, Fragment } from "react"
import './css/style.css'
import LoginForm from './components/LoginForm'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)

      // Appointmentservice.setToken tms tänne
      // Appointmentservice.setToken tms tänne
      // Appointmentservice.setToken tms tänne
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({ email, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))

      // Appointmentservice.setToken tms tänne
      // Appointmentservice.setToken tms tänne
      // Appointmentservice.setToken tms tänne

      setUser(loggedInUser)
      setEmail('')
      setPassword('')

    } catch (exception) {
      console.log('virhe kirjautumisessa', exception)
    }
  }

  const handleLogoff = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }


  // TODO -- REACT ROUTER
  // TODO -- REACT ROUTER
  // TODO -- REACT ROUTER
  return (
    <Fragment>
      {user === null && <LoginForm handleLoginFunction={handleLogin} email={email} password={password} setEmail={setEmail} setPassword={setPassword} />}
      {user !== null && <Index user={user} />}
    </Fragment>
  )
}

const Index = (props) => {
  const { user } = props
  return (
    <Fragment>
      Hei {user.name}!
    </Fragment>
  )
}

export default App