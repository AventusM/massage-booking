import React, { useState, useEffect, Fragment, createContext } from "react"
import LoginIndex from './components/Login_index'
import Index from './components/logged_in/Index'
import RegistrationFormFragment from './components/logged_in/registrationForm'
import loginService from './services/login'
import useResource from './hooks/useResource'
import useField from './hooks/useField'
import UserHomepage from "./components/logged_in/UserHomepage";
import DashBoard from './components/logged_in/Dashboard'
import ReservationView from './components/logged_in/ ReservationView'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'

// CREATING CONTEXTS TO BE CONSUMED BY INDIVIDUAL COMPONENTS INSTEAD OF PASSING PARAMETERS IN A CHAIN
const UserContext = createContext(null)
const AppointmentContext = createContext(null)


const App = () => {
  // userService CONTAINS APPOINTMENT ID
  const [users, userService] = useResource('/api/users')
  // appointmentService FETCHES ALL apps AND also all users apps by ID
  const [appointments, appointmentService] = useResource('/api/appointments')

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
    appointmentService.getAll()
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const userInCache = JSON.parse(loggedInUserJSON)
      setUser(userInCache)
      console.log('you are logged in as ', user)
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
      console.log('loggedInUser ', loggedInUser)
      setUser(loggedInUser)
      email.reset()
      password.reset()
      console.log('logged in as ', user)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out')
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
    console.log('handleRegistration called')
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


  if (user === null) {
    return (
      <Fragment>
        <Router>
          <Link to="/registration">Registration</Link>
          <Link to="/">Login</Link>
          <Route exact path="/" render={() => <LoginIndex handleLoginFunction={handleLogin} email={email} password={password} errorMessage={errorMessage} />} />
          <Route path="/registration" render={() => <RegistrationFormFragment handleRegistrationFunction={handleRegistration} name={registrationName} email={registrationEmail} number={registrationNumber} password={registrationPassword} passwordCheck={registrationPasswordCheck} />} />
        </Router>
      </Fragment>
    )
  }
  return (
    <Fragment>
      <Router>
        <Link to="/index">Index</Link>
        <Link to="/dashboard">Admin dashboard</Link>
        <button onClick={handleLogout}>Logout</button>
        <AppointmentContext.Provider value={[user, appointments, appointmentService]}>
          <Route path="/index" render={() => <Index />} />
        </AppointmentContext.Provider>
        <Route path="/myAppointments" render={() => <UserHomepage user={user} />} />
        <UserContext.Provider value={[user, users, userService]}>
          <Route path="/dashboard" render={() => <DashBoard />} />
        </UserContext.Provider>
      </Router>
    </Fragment>
  )
}

export { UserContext, AppointmentContext }
export default App