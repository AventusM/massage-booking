import React, { Fragment, useContext, useState, useEffect } from 'react'
//import Calendar from 'react-calendar';
import Calendar from 'react-calendar'
import { AppointmentContext, UserContext, NotificationContext } from '../../App'

import AllAppointments from './AllAppointments'
import LoginIndex from '../Login_index'
import moment from 'moment'
import NextAppointment from './NextAppointment'
import Notification from '../Notification'
const Index = () => {
  const { user } = useContext(UserContext)
  if (user) {
    return <AuthIndex user={user} />
  }
  return <LoginIndex />
}

const AuthIndex = ({ user }) => {
  console.log('RENDERING INDEX')
  const { setSelectedDate, appointments } = useContext(AppointmentContext)
  const { announcementNotification, announcement, notification } = useContext(NotificationContext)

  const freeAppointments = appointments.filter(
    app => app.type_of_reservation === 0
  )
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])

  const isMobile = width <= 1160

  return (
    <Fragment>
      {notification && !isMobile
        ? <Notification notification={notification} />
        : <NextAppointment user={user} appointments={appointments} />
      }
      {isMobile
        ? notification
          ? <Notification notification={notification}/>
          : <Notification notification={announcementNotification}/>
        : null}
      <div className="appointmentListWrapperMain">
        <div className="appointmentListWrapperCalendar">
          <Calendar
            locale={'en-UK'}
            onChange={value => {
              console.log('value ', value, 'value type', typeof value)
              setSelectedDate(value)
            }}
            minDetail="year"
            prev2Label={null}
            next2Label={null}
            tileClassName={({ date, view }) =>
              view === 'month' &&
                freeAppointments.filter(app =>
                  moment(app.start_date).isSame(moment(date), 'day')
                ).length > 0
                ? 'availableDay'
                : view === 'month' && moment(date).isBefore(moment())
                  ? 'disabled'
                  : view === 'month' && date.getDay() < 3 && date.getDay() !== 0
                    ? 'nonAvailableDay'
                    : view === 'month'
                      ? 'disabled'
                      : null
            }
            /* tileDisabled={({ date, view }) =>
              view === 'month' && (date.getDay() > 2 || date.getDay() === 0)
            } */
            showNeighboringMonth={false}
          />
          {!isMobile && announcement && announcement.message
            ? <div className="index_notice">
              <h2>Notice</h2>
              <p>{announcement.message}</p>
            </div>
            : null}
        </div>

        <div className="all_apps_div">

          <h1>All appointments</h1>
          <h5>Click on a Free appointment to reserve it</h5>
          < AllAppointments />
        </div>
      </div>
    </Fragment>
  )
}

export default Index
