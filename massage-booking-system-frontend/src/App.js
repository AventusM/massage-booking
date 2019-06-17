import React, { useState, useEffect, Fragment, createContext } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Index from './components/logged_in/Index'
import MyPage from './components/logged_in/MyPage'
import useResource from './hooks/useResource'
import Stats from './components/logged_in/Stats'
import DashBoard from './components/logged_in/Dashboard'
import NotFoundPage from './components/NotFoundPage'
import Notification from './components/Notification'
import Header from './components/Header'
import * as types from './types/types'
import * as icons from './types/fa-icons'

const App = () => {
  const [users, userService] = useResource('/api/users')
  const [appointments, appointmentService] = useResource('/api/appointments')
  const [stats, statsService] = useResource('api/stats')

  const [notification, setNotification] = useState(null)
  const [notification_type, setType] = useState(null)
  const [notification_icon, setIcon] = useState(null)
  const [announcement, setAnnouncement] = useState('')

  const [message, setErrorMessage] = useState(null)

  const [user, setUser] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)


  const createNotification = (message, type) => {
    setNotification(message)
    if (type === types.SUCCESS) {
      setType(types.SUCCESS)
      setIcon(icons.SUCCESS)
    } else {
      setType(types.ERROR)
      setIcon(icons.ERROR)
    }
    setTimeout(() => {
      setNotification(null)
      setType(null)
      setIcon(null)
    }, 3500)
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
        <Notification icon={icons.GENERAL} type={types.GENERAL} message={announcement} />
        <Notification icon={notification_icon} type={notification_type} message={notification} />
        <div>
          <NotificationContext.Provider value={{ createNotification, announcement, setAnnouncement }}>
            <UserContext.Provider value={{ user, setUser, users, userService }}>
              <AppointmentContext.Provider
                value={{ user, appointments, appointmentService, selectedDate, setSelectedDate, setErrorMessage, createNotification }}>
                <Route exact path="/" render={() => <Index />} />
              </AppointmentContext.Provider>
            </UserContext.Provider>

            <UserContext.Provider value={{ user, setUser, users, userService}}>
              <Route exact path="/dashboard" render={() => <DashBoard />} />
            </UserContext.Provider>

            <UserContext.Provider value={{ user, setUser, users, userService }}>
              <AppointmentContext.Provider value={{ user, appointments, appointmentService, selectedDate, setSelectedDate, setErrorMessage }}>
                <Route exact path="/mypage" render={() => <MyPage />} />
              </AppointmentContext.Provider>
            </UserContext.Provider>

            <AppointmentContext.Provider value={{ appointments, appointmentService, stats }}>
              <Route exact path="/stats" render={() => <Stats />} />
            </AppointmentContext.Provider>
          </NotificationContext.Provider>
        </div>
      </Router>
    </Fragment >
  )
}

export const NotificationContext = createContext(null)
export const AppointmentContext = createContext(null)
export const UserContext = createContext(null)
export default App

