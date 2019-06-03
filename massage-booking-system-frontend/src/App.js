import React, { useState, useEffect, Fragment, createContext } from 'react'
import LoginIndex from './components/Login_index'
import Index from './components/logged_in/Index'
import RegistrationFormFragment from './components/logged_in/RegistrationForm'
import loginService from './services/login'

import useResource from './hooks/useResource'
import useField from './hooks/useField'
import Stats from './components/logged_in/Stats'
import DashBoard from './components/logged_in/Dashboard'
import NotFoundPage from './components/NotFoundPage'
import ReservationView from './components/logged_in/ ReservationView'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom'
import history from './history'
import logo from './pics/unity5.png'
import Notification from './components/Notification'

// CREATING CONTEXTS TO BE CONSUMED BY INDIVIDUAL COMPONENTS INSTEAD OF PASSING PARAMETERS IN A CHAIN
// const UserContext = createContext(null)
// const AppointmentContext = createContext(null)

const App = () => {
  // userService CONTAINS APPOINTMENT ID
  const [users, userService] = useResource('/api/users')
  // appointmentService FETCHES ALL apps AND also all users apps by ID
  const [appointments, appointmentService] = useResource('/api/appointments')
  const [stats, statsService] = useResource('api/stats')

  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)

  const redirectToIndex = () => {
    history.push('/')
  }

  const handleLogin = event => {
    event.preventDefault()
    window.open('http://127.0.0.1:3001/auth/google', '_self')
    redirectToIndex()
  }

  const handleLogout = async event => {
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

  useEffect(() => {
    let params = new URL(document.location).searchParams
    let token = params.get('token')
    let id = params.get('id')
    if (token) {
      userService.getOne(id).then(user => {
        setUser(user)
        window.localStorage.setItem(
          'loggedInUser',
          JSON.stringify({ ...user, token })
        )
        userService.setToken(token)
        appointmentService.setToken(token)
      })

      redirectToIndex()
    } else if (window.localStorage.getItem('loggedInUser')) {
      const loggedInUser = window.localStorage.getItem('loggedInUser')
      const userInCache = JSON.parse(loggedInUser)
      setUser(userInCache)
      userService.setToken(userInCache.token)
      appointmentService.setToken(userInCache.token)
    }
  },)

  useEffect(() => {
    userService.getAll()
    appointmentService.getAll()
    statsService.getAll()
  }, [])

  // useEffect(() => {
  //   if (window.localStorage.length > 0) {
  //     const local_storage_data = window.localStorage.getItem('loggedInUser')
  //     const parsed_local_storage_data = JSON.parse(local_storage_data)
  //     const id = parsed_local_storage_data._id
  //     userService.getOne(id).then(user => {
  //       setUser(user)
  //     })
  //   }
  // }, [appointments])

  if (user === null) {
    // Usage of <Redirect to="/path"/> seems to be broken (exhibit A - component hierarchy in return when currentUser has some values)
    // /api routes are protected in the backend, so it currently seems that this solution is sufficient...
    return (
      <Fragment>
        <Router>
          <Route exact path="/">
            <LoginIndex
              handleLoginFunction={handleLogin}
              errorMessage={errorMessage}
            />
          </Route>
        </Router>
      </Fragment>
    )
  }
  return (
    <Fragment>
      <Router history={history}>
        <nav className="navbar">
          <span className="navbar-toggle" id="js-navbar-toggle">
            <i
              onClick={() =>
                document.getElementById('js-menu').classList.toggle('active')
              }
              className="fas fa-bars"
            />
          </span>
          <img src={logo} className="logo" />
          <ul className="main-nav" id="js-menu">
            <li>
              <Link className="nav-link" to="/">
                Index
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/dashboard">
                Admin dashboard
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/stats">
                Stats
              </Link>
            </li>
            <li>
              <i
                onClick={handleLogout}
                id="logout"
                className="fas fa-sign-out-alt"
              />
            </li>
          </ul>
        </nav>

        <UserContext.Provider value={{ user, setUser, users, userService }}>
          <AppointmentContext.Provider
            value={{
              user,
              appointments,
              appointmentService,
              selectedDate,
              setSelectedDate,
              setErrorMessage,
            }}
          >
            <Route exact path="/" render={() => <Index />} />
          </AppointmentContext.Provider>
        </UserContext.Provider>

        <UserContext.Provider value={{ user, setUser, users, userService }}>
          <Route exact path="/dashboard" render={() => <DashBoard />} />
        </UserContext.Provider>

        <AppointmentContext.Provider value={{ appointments, appointmentService, stats }}>
          <Route exact path="/stats" render={() => <Stats />} />
        </AppointmentContext.Provider>


      </Router>
    </Fragment >
  )
}

export const AppointmentContext = createContext(null)
export const UserContext = createContext(null)
// export {AppointmentContext, UserContext }
export default App
