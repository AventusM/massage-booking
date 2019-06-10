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

// Temporarily here for data fetching as authentication is completely server-side now
import axios from 'axios'
// const Header = (props) => {
//   const { user, logOutFunction } = props

//   return (
//     <nav className="header">
//       <img src={logo} className="logo" />

//       <div className="links">
//         {user
//           ? <a href="/auth/logout">LOGOUT</a>
//           : <a href="/auth/google">LOGIN WITH GOOGLE</a>}
//       </div>
//     </nav>
//   )
// }

const AuthHeader = (props) => {
  const { user } = props
  return (
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
          <i onClick={() => window.location.href="/auth/logout"} id="logout" className="fas fa-sign-out-alt"></i>
        </li>
      </ul>
    </nav>
  )
}

const NonAuthHeader = (props) => {
  return (
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
          <a href="/auth/google">Log in</a>
        </li>
      </ul>
    </nav>
  )
}

const Header = (props) => {
  const { user } = props
  if (user) {
    return <AuthHeader user={user} />
  }
  return <NonAuthHeader />
}


const App = () => {
  // userService CONTAINS APPOINTMENT ID
  const [users, userService] = useResource('/api/users')
  // appointmentService FETCHES ALL apps AND also all users apps by ID
  const [appointments, appointmentService] = useResource('/api/appointments')
  const [stats, statsService] = useResource('api/stats')

  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)

  const logOut = async () => {
    const response = await axios.get('/auth/logout')
    console.log('response data logout', response)
    setUser(response.data)
  }

  useEffect(() => {
    axios.get('/api/users/current_user')
      .then(response => setUser(response.data))
  }, [])

  useEffect(() => {
    userService.getAll()
    appointmentService.getAll()
    statsService.getAll()
  }, [])

  useEffect(() => {
    user && userService
      .getOne(user._id)
      .then(refreshedUser => setUser(refreshedUser))
  }, [appointments])

  return (
    <Fragment>
      <Router>
        <Header user={user} />
        <UserContext.Provider value={{ user, setUser, users, userService }}>
          <AppointmentContext.Provider
            value={{
              user, appointments, appointmentService, selectedDate, setSelectedDate, setErrorMessage,
            }}>
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
    </Fragment>
  )
}

export const AppointmentContext = createContext(null)
export const UserContext = createContext(null)
export default App
