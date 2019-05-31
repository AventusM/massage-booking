import React, { useState, useEffect, Fragment, createContext } from "react"
import LoginIndex from './components/Login_index'
import Index from './components/logged_in/Index'
import RegistrationFormFragment from './components/logged_in/RegistrationForm'
import loginService from './services/login'
import useResource from './hooks/useResource'
import useField from './hooks/useField'
import Stats from "./components/logged_in/Stats";
import DashBoard from './components/logged_in/Dashboard'
import NotFoundPage from './components/NotFoundPage'
import ReservationView from './components/logged_in/ ReservationView'
import { BrowserRouter as Router, Route, Switch, Link, Redirect, withRouter } from 'react-router-dom'
import history from './history';
import logo from "./pics/unity5.png"
import Notification from './components/Notification'

// CREATING CONTEXTS TO BE CONSUMED BY INDIVIDUAL COMPONENTS INSTEAD OF PASSING PARAMETERS IN A CHAIN
const UserContext = createContext(null)
const AppointmentContext = createContext(null)


const App = () => {
  // userService CONTAINS APPOINTMENT ID
  const [users, userService] = useResource('/api/users')
  // appointmentService FETCHES ALL apps AND also all users apps by ID
  const [appointments, appointmentService] = useResource('/api/appointments')
  const [stats, statsService] = useResource('api/stats')

  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const email = useField('text')
  const password = useField('password')
  const registrationName = useField('text')
  const registrationEmail = useField('text')
  const registrationNumber = useField('text')
  const registrationPassword = useField('password')
  const registrationPasswordCheck = useField('password')

  const redirectToIndex = () => {
    history.push('/')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      // CUSTOM HOOKS --> const email and password no longer contain values straight up. 
      const loggedInUser = await loginService.login({ email: email.value, password: password.value })
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
      userService.setToken(loggedInUser.token)
      appointmentService.setToken(loggedInUser.token)

      setUser(loggedInUser)
      email.reset()
      password.reset()
      redirectToIndex()
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
      redirectToIndex()
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
      redirectToIndex()
    } catch (exception) {
      setErrorMessage("Registration failed")
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const userInCache = JSON.parse(loggedInUser)
      setUser(userInCache)
      userService.setToken(userInCache.token)
      appointmentService.setToken(userInCache.token)
    }
  }, [])

  useEffect(() => {
    userService.getAll()
    appointmentService.getAll()
    statsService.getAll()
  }, [user])


  if (user === null) {
    // Usage of <Redirect to="/path"/> seems to be broken (exhibit A - component hierarchy in return when currentUser has some values)
    // /api routes are protected in the backend, so it currently seems that this solution is sufficient...
    history.replace('/')
    return (
      <Fragment>
        <Router>
          <Route path="/" render={() => <LoginIndex handleLoginFunction={handleLogin} email={email} password={password} errorMessage={errorMessage} />} />
          <Route path="/registration" render={() => <RegistrationFormFragment handleRegistrationFunction={handleRegistration} name={registrationName} email={registrationEmail} number={registrationNumber} password={registrationPassword} passwordCheck={registrationPasswordCheck} />} />
        </Router>
      </Fragment>
    )
  }
  return (
    <Fragment>
      <Router history={history}>


        <nav className="navbar">
          <span className="navbar-toggle" id="js-navbar-toggle">
            <i onClick={() => document.getElementById("js-menu").classList.toggle('active')} className="fas fa-bars"></i>
          </span>
          <img src={logo} className="logo" />
          <ul className="main-nav" id="js-menu">
            <li>
              <Link className="nav-link" to="/">Index</Link>
            </li>
            <li>
              <Link className="nav-link" to="/dashboard">Admin dashboard</Link>
            </li>
            <li>
              <Link className="nav-link" to="/stats">Stats</Link>
            </li>
            <li>
              <i onClick={handleLogout} id="logout" className="fas fa-sign-out-alt"></i>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
          <UserContext.Provider value={{ user, setUser, users, userService }}>
            <AppointmentContext.Provider value={{ user, appointments, appointmentService, selectedDate, setSelectedDate, setErrorMessage }}>
              <Notification message={errorMessage}/>
              <Index />
            </AppointmentContext.Provider>
          </UserContext.Provider>  
          </Route>

          {/* ADD PROPER CONTEXT / STRAIGHT UP PROPS TO ACCESS APPOINTMENT STATS ETC.. */}
          {/* CURRENTLY ONLY DIRECT PROPS GIVEN TO STATS PAGE */}
          <Route exact path="/stats">
            <AppointmentContext.Provider value={{ appointments, appointmentService, stats}}>
              <Stats />
            </AppointmentContext.Provider>
          </Route>

          <Route exact path="/dashboard">
            <UserContext.Provider value={{ user, setUser, users, userService }}>
              <DashBoard />
            </UserContext.Provider>
          </Route>

          <Route render={() => <NotFoundPage />} />

        </Switch>
      </Router>
    </Fragment>
  )
}

export { AppointmentContext, UserContext }
export default App