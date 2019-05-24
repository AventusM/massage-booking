import React, { useState, useEffect, Fragment, createContext } from "react"
import LoginIndex from './components/Login_index'
import Index from './components/logged_in/Index'
import RegistrationFormFragment from './components/logged_in/RegistrationForm'
import loginService from './services/login'
import useResource from './hooks/useResource'
import useField from './hooks/useField'
import UserHomepage from "./components/logged_in/UserHomepage";
import DashBoard from './components/logged_in/Dashboard'
// import { Navbar, Nav } from 'react-bootstrap'
import NotFoundPage from './components/NotFoundPage'
import ReservationView from './components/logged_in/ ReservationView'
import { BrowserRouter as Router, Route, Switch, Link, Redirect, withRouter } from 'react-router-dom'
import history from './history';

// CREATING CONTEXTS TO BE CONSUMED BY INDIVIDUAL COMPONENTS INSTEAD OF PASSING PARAMETERS IN A CHAIN
const UserContext = createContext({ user: null, setUser: () => console.log('if you are seeing this you did not pass setUser To Usercontext'), user: null })
const AppointmentContext = createContext(null)


const App = () => {
  // userService CONTAINS APPOINTMENT ID
  const [users, userService] = useResource('/api/users')
  // appointmentService FETCHES ALL apps AND also all users apps by ID
  const [appointments, appointmentService] = useResource('/api/appointments')

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
  }, [])

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
      history.push('/')
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
      history.push('/')
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

        {/* <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto mt-2 mt-lg-0">
              <div className="nav-item"> */}
        <Link className="nav-link" to="/">Index</Link>
        {/* </div> */}
        {/* <div className="nav-item"> */}
        <Link className="nav-link" to="/dashboard">Admin dashboard</Link>
        {/* </div> */}
        {/* <div className="nav-item"> */}
        <Link className="nav-link" to="/profile">Profile</Link>
        {/* </div> */}
        {/* </Nav> */}
        {/* <div class="nav-item"> */}
        <button class="btn btn-dark my-2 my-sm-0" onClick={handleLogout}>Logout</button>
        {/* </div> */}

        {/* </Navbar.Collapse> */}
        {/* </Navbar> */}



        <Switch>

          <Route exact path="/">
            <AppointmentContext.Provider value={{ user, appointments, appointmentService }}>
              <Index />
            </AppointmentContext.Provider>
          </Route>

          <Route exact path="/profile">
            <UserContext.Provider value={{ user, setUser, users, userService }}>
              <UserHomepage />
            </UserContext.Provider>
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