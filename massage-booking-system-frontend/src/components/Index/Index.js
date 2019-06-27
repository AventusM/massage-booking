import React, { Fragment, useContext, useState, useEffect } from 'react'
//import Calendar from 'react-calendar';
import Calendar from 'react-calendar'
import { AppointmentContext, UserContext, NotificationContext } from '../../App'

import AllAppointments from '../AllAppointments/AllAppointments'
import LoginIndex from '../LoginIndex/LoginIndex'
import moment from 'moment'
import NextAppointment from '../NextAppointment/NextAppointment'
import Notification from '../Notification/Notification'
const Index = () => {
  const { user } = useContext(UserContext)
  if (user) {
    return <AuthIndex user={user} />
  }
  return <LoginIndex />
}

const AuthIndex = ({ user }) => {
  const { announcementNotification, announcement, notification } = useContext(NotificationContext)
  const { selectedDate, setSelectedDate, appointments } = useContext(AppointmentContext)
  const freeAppointments = appointments.filter(
    app => app.type_of_reservation === 0
  )
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])

  useEffect(() => {
    let startDate = new Date()
    const MONDAY_DATE_KEY = 1
    // If today not monday or tuesday
    // https://stackoverflow.com/a/27336600
    if (!(startDate.getDay() === 1 || startDate.getDay() === 2)) {
      const updatedDate = startDate.getDate() + (MONDAY_DATE_KEY + (7 - startDate.getDay())) % 7
      startDate.setDate(updatedDate)
    }
    setSelectedDate(startDate)
  }, [])

  const isMobile = width <= 1160


  let selectedMoment = moment(selectedDate)
  let now = moment()

  return (
    <Fragment>
      {notification && !isMobile
        ? <Notification notification={notification} />
        : <NextAppointment user={user} appointments={appointments} />
      }
      {isMobile
        ? <Notification notification={announcementNotification} />
        : null
      }
      {isMobile
        ? <div className="index_notification_container"><Notification notification={notification} /></div>
        : null}

      <div className="appointmentListWrapperMain">
        <div>
          <Calendar
            activeStartDate={selectedDate}
            value={selectedDate}
            locale={'en-UK'}
            onChange={value => {
              setSelectedDate(value)
            }}
            minDetail="year"
            prev2Label={null}
            next2Label={null}
            tileClassName={({ date, view }) => {
              if (view === 'month') {
                let dateMoment = moment(date)
                if (dateMoment.isBefore(now, 'days') || dateMoment.day() > 2 || dateMoment.day() === 0) {
                  return 'disabled'
                } else {
                  if (dateMoment.isSame(selectedMoment, 'days')) {
                    // selected
                    if (user.appointments.filter((app) => moment(app.start_date).isSame(dateMoment, 'days')).length > 0) {
                      // selected, user has appointment for day
                      return 'userHasAppSelected'
                    } else {
                      // selected, user does not have app for day
                      if (freeAppointments.filter(app => moment(app.start_date).isSame(dateMoment, 'day')).length > 0) {
                        // selected, user does not have app, day has free app
                        return 'hasFreeSelected'
                      } else {
                        // selected, user does not have app, no free apps
                        return 'noneFreeSelected'
                      }
                    }
                  } else {
                    // not selected
                    if (user.appointments.filter((app) => moment(app.start_date).isSame(dateMoment, 'days')).length > 0) {
                      // not selected, user has app for day
                      return 'userHasApp'
                    } else {
                      // not selected, user does not have app for day
                      if (freeAppointments.filter(app => moment(app.start_date).isSame(dateMoment, 'day')).length > 0) {
                        // not selected, user does not have app for day, day has free app
                        return 'hasFree'
                      } else {
                        // not selected, user does not have app for day, no free apps
                        return 'noneFree'
                      }
                    }
                  }
                }
              }
            }
            }
            tileDisabled={({ date, view }) =>
              view === 'month' && (date.getDay() > 2 || date.getDay() === 0)
            }
            showNeighboringMonth={false}
          />
          {!isMobile && announcement && announcement.message
            ? <div className="index_notice">
              <h2>Notice</h2>
              <p>{announcement.message}</p>
            </div>
            : null}
        </div>

        <div>

          <h1>All appointments</h1>
          <h5>Click on a Free appointment to reserve it</h5>
          < AllAppointments />
        </div>
      </div>
    </Fragment>
  )
}

export default Index
