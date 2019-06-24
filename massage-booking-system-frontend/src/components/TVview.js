import React, { useContext } from 'react'
import Appointment from './logged_in/Appointment'
import { AppointmentContext, UserContext, NotificationContext } from '../App'
import Clock from './Clock'
import unity4 from '../pics/unity4.png'
import moment from 'moment'
import formatStartDate from '../utils/formatStartDate'
import DaysAppointments from './DaysAppointments'

const TVview = () => {
  const { appointments } = useContext(AppointmentContext)
  const { announcement } = useContext(NotificationContext)
  // console.log('appointments length', appointments.length)
  const { users } = useContext(UserContext)
  const now = moment()

  /* every 24 minutes force page refresh to keep next appointment uptodated. */
  setInterval(() => {
    window.location.reload()
  }, 1440000)


  /* Find next appointment */

  const comingAppointments = appointments.filter((app) => {
    let appStartTime = moment(app.start_date)
    return appStartTime.isAfter(now)
  })

  comingAppointments.sort((a, b) => {
    let dateA = new Date(a.start_date)
    let dateB = new Date(b.start_date)

    if (dateA < dateB) {
      return -1
    }

    if (dateA > dateB) {
      return 1
    }

    return 0
  })

  let next = comingAppointments[0]
  // console.log('next ', next)

  return (
    <div className="tv_view">
      <div>
        <Clock />

        <h2>NEXT APPOINTMENT</h2>
        {next ? <ul className="tvViewAppointmentList"><Appointment
          id={next._id}
          start_date={formatStartDate(next.start_date)}
          type_of_reservation={next.type_of_reservation}
          appUser={users.find(u => u._id === next.user_id)}
        /> </ul> : ''}
        <div className="tv_notice">
          <h2>Notice</h2>
          <p>{announcement.message}</p>
        </div>
        <img className="logoTV"
          id="unity4" src={unity4}></img>
      </div>
      <div className="day-view"><DaysAppointments dayNumber={1} lastdayWithAppointments={2} /></div>
      <div className="day-view"><DaysAppointments dayNumber={2} lastdayWithAppointments={2} /></div>

      <div>

      </div>
    </div>

  )
}

export default TVview