import React, { useState, useEffect, Fragment, createContext } from 'react'
// Temporarily here for data fetching as authentication is completely server-side now
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom'

import Index from './components/logged_in/Index'
import MyPage from './components/logged_in/MyPage'
import useResource from './hooks/useResource'
import Stats from './components/logged_in/Stats'
import DashBoard from './components/logged_in/Dashboard'
import NotFoundPage from './components/NotFoundPage'
import Notification from './components/Notification'
import Header from './components/Header'

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
    axios
      .get('/api/users/current_user')
      .then(response => setUser(response.data))
  }, [])

  useEffect(() => {
    userService.getAll()
    appointmentService.getAll()
    statsService.getAll()
  }, [])

  useEffect(() => {
    user &&
      userService.getOne(user._id).then(refreshedUser => setUser(refreshedUser))
  }, [appointments])

  return (
    <Fragment>
      <Router>
        <Header user={user} />
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
            <Route exact path="/mypage" render={() => <MyPage />} />
          </AppointmentContext.Provider>
        </UserContext.Provider>

        <AppointmentContext.Provider
          value={{ appointments, appointmentService, stats }}
        >
          <Route exact path="/stats" render={() => <Stats />} />
        </AppointmentContext.Provider>
      </Router>
    </Fragment>
  )
}

export const AppointmentContext = createContext(null)
export const UserContext = createContext(null)
export default App
