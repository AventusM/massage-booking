import React, { useState, useEffect, Fragment } from "react"
import LoginIndex from './components/Login_index'
import Index from './components/logged_in/Index'
import RegistrationFormFragment from './components/logged_in/registrationForm'
import loginService from './services/login'
import useResource from './hooks/useResource'
import useField from './hooks/useField'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import UserHomepage from "./components/logged_in/UserHomepage";

const App = () => {
  const [users, userService] = useResource('/api/users')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const email = useField('text')
  const password = useField('password')
  const registrationName = useField('text')
  const registrationEmail = useField('text')
  const registrationNumber = useField('text')
  const registrationPassword = useField('password')
  const registrationPasswordCheck = useField('password')


  useEffect(() => {
    userService.getAll()
  }, [])

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
      // CUSTOM HOOKS --> const email and password no longer contain values straight up. 
      const loggedInUser = await loginService.login({ email: email.value, password: password.value })
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))

      // Appointmentservice.setToken tms tänne
      // Appointmentservice.setToken tms tänne
      // Appointmentservice.setToken tms tänne

      setUser(loggedInUser)
      email.reset()
      password.reset()
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedInUser')
      setUser(null)
    } catch (exception) {
      setErrorMessage("Couldn't logout")
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleRegistration = async (event) => {
    event.preventDefault()
    try {
      const userObject = {
        name: registrationName.value,
        number: registrationNumber.value,
        email: registrationEmail.value,
        admin: false,
        password: registrationPassword.value
      }
      userService.create(userObject)
    } catch (exception) {
      setErrorMessage("Registration failed")
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  } 


  return (
    <Fragment>
      <Router>
        <div>
          <div>
            <Link to="/registration">Registration</Link>
            {user ? <Link to="/myAppointments">{user.name}</Link> : <Link to="/">Login</Link>}
            <Link to="/calendar">Calendar</Link>
            {user && <button onClick={handleLogout}> Logout</button>}
            
          </div>
            <Route exact path="/" render={() => <LoginIndex handleLoginFunction={handleLogin} email={email} password={password} />} />
            <Route path="/registration" render={() => <RegistrationFormFragment handleRegistrationFunction={handleRegistration} name={registrationName} email={registrationEmail} number={registrationNumber} password={registrationPassword} passwordCheck={registrationPasswordCheck} />} /> 
            <Route path="/myAppointments" render={() => <UserHomepage user={user} />} />
            <Route path="/calendar" render={() => <Index user={user} />} />                       
        </div>
      </Router>
    </Fragment>
  )
}

const UserList = (props) => {
  const { users } = props
  return (
    <ul>
      {users.map(user => (
        <li key={user._id}>Name: {user.name}</li>
      ))}
    </ul>

  )
}

export default App