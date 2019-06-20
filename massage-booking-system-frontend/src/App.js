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
  const [stretching, stretchingService] = useResource('/api/stretching')

  const [announcement, announcementService] = useResource('/api/announcements')

  const [notification, setNotification] = useState(null)

  const [user, setUser] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)


  const createNotification = (message, type) => {
    let icon
    let messageType
    if (type === types.SUCCESS) {
      icon = icons.SUCCESS
      messageType = types.SUCCESS
    } else {
      icon = icons.ERROR
      messageType = types.ERROR
    }
    const notification = {
      message: message,
      icon: icon,
      type: messageType
    }
    setNotification(notification)

    setTimeout(() => {
      setNotification(null)
    }, 3500)
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
    stretchingService.getAll()
    announcementService.getAll()
  }, [])

  useEffect(() => {
    console.log('REFRESH USER EFFECT TRIGGERED')
    user &&
      userService.getOne(user._id).then(refreshedUser => setUser(refreshedUser))
  }, [appointments, stretching])

  const announcementNotification = {
    message: announcement ? announcement.message : '',
    type: types.GENERAL,
    icon: icons.GENERAL
  }

  return (
    <Fragment>
      <Router>
        <Header user={user} />
        {/* <Notification notification={announcementNotification} />
        <Notification notification={notification} /> */}
        <div>
          <NotificationContext.Provider value={{ createNotification, announcementService, announcement, announcementNotification, notification }}>
            <StretchContext.Provider value={{ stretching, stretchingService }}>
              <UserContext.Provider value={{ user, setUser, users, userService }}>
                <AppointmentContext.Provider value={{ appointments, appointmentService, selectedDate, setSelectedDate, stats }}>
                  <Route exact path="/" render={() => <Index />} />
                  <Route exact path="/dashboard" render={() => <DashBoard />} />
                  <Route exact path="/mypage" render={() => <MyPage />} />
                  <Route exact path="/stats" render={() => <Stats />} />
                  <Route exact path="/tvview" render={() => <TVview />} />
                </AppointmentContext.Provider>
              </UserContext.Provider>
            </StretchContext.Provider>
          </NotificationContext.Provider>
        </div>
      </Router>
    </Fragment >
  )
}

export const NotificationContext = createContext(null)
export const AppointmentContext = createContext(null)
export const UserContext = createContext(null)
export const StretchContext = createContext(null)
export default App

