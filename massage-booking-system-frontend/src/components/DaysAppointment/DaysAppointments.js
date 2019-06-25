import React, { useContext } from 'react'
import moment from 'moment'
import Appointment from '../Appoinment/Appointment'
import { AppointmentContext, UserContext } from '../../App'
import formatStartDate from '../../utils/formatStartDate'

const DaysAppointments = ({ dayNumber, lastdayWithAppointments }) => {
  const { appointments } = useContext(AppointmentContext)
  const { users } = useContext(UserContext)
  const now = moment()

  let day = null
  if (now.day() <= lastdayWithAppointments) {
    day = moment().startOf('week').add(dayNumber, 'days') // day on this week
  } else {
    day = moment().startOf('week').add(7 + dayNumber, 'days') //day on next week
  }

  // compares appointment time to selected date on calendar, filtering to only include selected days appointments
  const daysAppointments = appointments.filter(appointment => {
    let appointmentsDate = moment(appointment.start_date)

    return (
      day.isSame(appointmentsDate, 'day')
    )
  })

  daysAppointments.sort((a, b) => {
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

  let nameOfDay = null
  switch (dayNumber) {
  case 0:
    nameOfDay = 'Sunday'
    break
  case 1:
    nameOfDay = 'Monday'
    break
  case 2:
    nameOfDay = 'Tuesday'
    break
  case 3:
    nameOfDay = 'Wednesday'
    break
  case 4:
    nameOfDay = 'Thursday'
    break
  case 5:
    nameOfDay = 'Friday'
    break
  case 6:
    nameOfDay = 'Saturday'
    break
  default:
  }

  // NOTE: THIS ASSUMES 13 APPOINTMETS PER DAY; IF APPOINTMETS ARE EVER ADDED OR REMOVED THIS WILL BREAK
  let firstHalf = daysAppointments.slice(0, 5)
  let secondHalf = daysAppointments.slice(5, 12)

  return (
    <div>
      <h2 className="tv_view_headers">{nameOfDay}</h2>
      <ul className="tvViewAppointmentList">
        {firstHalf.map(app => {
          return (
            <Appointment
              key={app._id}
              id={app._id}
              start_date={formatStartDate(app.start_date)}
              type_of_reservation={app.type_of_reservation}
              appUser={users.find(u => u._id === app.user_id)}
            />
          )
        })}
      </ul>
      <h5 className="tv_view_headers">Break</h5>
      <ul className="tvViewAppointmentList">
        {secondHalf.map(app => {
          return (
            <Appointment
              key={app._id}
              id={app._id}
              start_date={formatStartDate(app.start_date)}
              type_of_reservation={app.type_of_reservation}
              appUser={users.find(u => u._id === app.user_id)}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default DaysAppointments
