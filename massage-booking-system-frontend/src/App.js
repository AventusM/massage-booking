import React, { useState, useEffect, Fragment, createContext } from "react"
import LoginIndex from './components/Login_index'
import Index from './components/logged_in/Index'
import RegistrationFormFragment from './components/logged_in/registrationForm'
import loginService from './services/login'
import useResource from './hooks/useResource'
import useField from './hooks/useField'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import UserHomepage from "./components/logged_in/UserHomepage";
import DashBoard from './components/logged_in/Dashboard'


// CREATING CONTEXTS TO BE CONSUMED BY INDIVIDUAL COMPONENTS INSTEAD OF PASSING PARAMETERS IN A CHAIN
const UserContext = createContext(null)

const App = () => {
  const [users, userService] = useResource('/api/users')
  const [errorMessage, setErrorMessage] = useState('')
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
            <Link to="/">Login</Link>
            <Link to="/registration">Registration</Link>
            <Link to="/dashboard">Admin dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <Route exact path="/" render={() => <LoginIndex handleLoginFunction={handleLogin} email={email} password={password} errorMessage={errorMessage} />} />
          <Route path="/registration" render={() => <RegistrationFormFragment handleRegistrationFunction={handleRegistration} name={registrationName} email={registrationEmail} number={registrationNumber} password={registrationPassword} passwordCheck={registrationPasswordCheck} />} />
          <Route path="/calendar" render={() => <Index user={user} />} />
          <UserContext.Provider value={[user, users, userService]}>
            <Route path="/dashboard" render={() => <DashBoard />} />
          </UserContext.Provider>
        </div>
      </Router>
    </Fragment>
  )
}

export { UserContext }
export default App