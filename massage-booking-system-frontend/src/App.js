import React, { useState, useEffect, Fragment, createContext } from 'react'
import axios from 'axios'
import moment from 'moment'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Index from './components/logged_in/Index'
import MyPage from './components/logged_in/MyPage'
import useResource from './hooks/useResource'
import Stats from './components/logged_in/Stats'
import DashBoard from './components/logged_in/Dashboard'
import Notification from './components/Notification'
import Header from './components/Header'
import TVview from './components/TVview'
import * as types from './types/types'
import * as icons from './types/fa-icons'

const App = () => {
  console.log('RENDERING APP')
  const [users, userService] = useResource('/api/users')
  const [appointments, appointmentService] = useResource('/api/appointments')
  const [stats, statsService] = useResource('api/stats')

  const [announcement, announcementService] = useResource('/api/announcements')

  const [notification, setNotification] = useState(null)
  const [notification_type, setType] = useState(null)
  const [notification_icon, setIcon] = useState(null)

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
    }, 50)
  }

  useEffect(() => {
    console.log('SET USER EFFEECT TRIGGERED')
    axios
      .get('/api/users/current_user')
      .then(response => setUser(response.data))
  }, [])

  useEffect(() => {
    console.log('GET ALL EFFECT TRIGGERED')
    userService.getAll()
    let twoWeeksAgo = moment().subtract(15, 'days') 
    let sixWeeksFromNow = moment().add(43, 'days')
    appointmentService.getInterval(twoWeeksAgo, sixWeeksFromNow)
    // appointmentService.getAll()
    statsService.getAll()
    announcementService.getAll()
  }, [])

  useEffect(() => {
    console.log('REFRESH USER EFFECT TRIGGERED')
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
              <AppointmentContext.Provider value={{ appointments, appointmentService, selectedDate, setSelectedDate, setErrorMessage }}>
                <Route exact path="/" render={() => <Index />} />
                <Route exact path="/dashboard" render={() => <DashBoard />} />
                <Route exact path="/mypage" render={() => <MyPage />} />
                <Route exact path="/stats" render={() => <Stats />} />
              </AppointmentContext.Provider>
            </UserContext.Provider>            
          </NotificationContext.Provider>
        </div>
      </Router>
    </Fragment >
  )
  return (
    <Fragment>
      <Router>
        <Header user={user} />
        <Notification icon={icons.GENERAL} type={types.GENERAL} message={announcement.message ? announcement.message : null} />
        <Notification icon={notification_icon} type={notification_type} message={notification} />
        <div>
          <NotificationContext.Provider value={{ createNotification, announcement, announcementService }}>
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

            <UserContext.Provider value={{ user, setUser, users, userService }}>
              <AppointmentContext.Provider
                value={{
                  user, appointments, appointmentService, selectedDate, setSelectedDate, setErrorMessage, createNotification
                }}>
                <Route exact path="/tvview" render={() => <TVview />} />
              </AppointmentContext.Provider>
            </UserContext.Provider> 
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

