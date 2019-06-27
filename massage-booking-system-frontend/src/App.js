import React, { useState, useEffect, Fragment, createContext } from 'react'
import axios from 'axios'
import moment from 'moment'
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import Index from './components/Index/Index'
import MyPage from './components/MyPage/MyPage'
import useResource from './hooks/useResource'
import Stats from './components/Stats/Stats'
import DashBoard from './components/Dashboard/Dashboard'
import Header from './components/Header/Header'
import LoginIndex from './components/LoginIndex/LoginIndex'
import TV from './components/TV/TV'
import StretchAppointmentDisplay from './components/StretchingSessions/StretchingSessions'
import InfoPage from './components/InfoPage/InfoPage'
import * as types from './types/types'
import * as icons from './types/fa-icons'

const App = () => {
  const [users, userService] = useResource('/api/users')
  const [appointments, appointmentService] = useResource('/api/appointments')
  const [stats, statsService] = useResource('api/stats')
  const [stretching, stretchingService] = useResource('/api/stretching')
  const [announcement, announcementService] = useResource('/api/announcements')
  const [info, infoService] = useResource('/api/info')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)

  const createNotification = (message, type, length) => {
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
    }, (length * 1000) || 3500)
  }

  useEffect(() => {
    axios
      .get('/api/users/current_user')
      .then(response => setUser(response.data))
  }, [])

  useEffect(() => {
    userService.getAll()
    let twoWeeksAgo = moment().subtract(15, 'days')
    let sixWeeksFromNow = moment().add(43, 'days')
    appointmentService.getInterval(twoWeeksAgo, sixWeeksFromNow)
    // appointmentService.getAll()
    statsService.getAll()
    stretchingService.getAll()
    announcementService.getAll()
    infoService.getAll()
  }, [])

  useEffect(() => {
    user &&
      userService.getOne(user._id).then(refreshedUser => setUser(refreshedUser))
  }, [appointments, stretching])



  const announcementNotification = {
    message: announcement ? announcement.message : '',
    type: types.GENERAL,
    icon: icons.GENERAL
  }
  if (user === null) {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <LoginIndex />} />
          <Route exact path="/tv" render={() => <TV />} />
          <Route render={() => <Redirect to={{ pathname: '/' }} />} />
        </Switch>
      </Router>
    )
  } else {
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
                    <Route exact path="/stretching" render={() => <StretchAppointmentDisplay />} />
                    <Route exact path="/dashboard" render={() => <DashBoard />} />
                    <Route exact path="/mypage" render={() => <MyPage />} />
                    <Route exact path="/stats" render={() => <Stats stats={stats} />} />
                    <Route exact path="/tv" render={() => <TV />} />
                    <Route exact path="/info" render={() => <InfoPage info={info} infoService={infoService}/>} />
                  </AppointmentContext.Provider>
                </UserContext.Provider>
              </StretchContext.Provider>
            </NotificationContext.Provider>
          </div>
        </Router>
      </Fragment >
    )
  }
}

export const NotificationContext = createContext(null)
export const AppointmentContext = createContext(null)
export const UserContext = createContext(null)
export const StretchContext = createContext(null)
export default App

