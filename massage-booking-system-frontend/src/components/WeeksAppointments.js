import React, { useContext } from 'react'
import moment from 'moment'
import Appointment from './logged_in/Appointment'
import { AppointmentContext, UserContext } from '../App'

const WeeksAppointments = () => {
  const { appointments } = useContext(AppointmentContext)
  const { users } = useContext(UserContext)
  const today = new Date()
  let todaysDay = today.getDate()
  let todaysMonth = today.getMonth() + 1
  let todaysYear = today.getFullYear()

  // compares appointment time to selected date on calendar, filtering to only include selected days appointments
  const todaysAppointments = appointments.filter(appointment => {
    let appointmentsDate = new Date(appointment.start_date)
    let appointmentsDay = appointmentsDate.getDate()
    let appointmentsMonth = appointmentsDate.getMonth() + 1
    let appointmentsYear = appointmentsDate.getFullYear()

    return (
      appointmentsMonth === todaysMonth &&
      appointmentsDay === todaysDay &&
      appointmentsYear === todaysYear
    )
  })

  const tomorrow = moment().add(1, 'days')
  const tomorrowsAppointments = appointments.filter(appointment => {
    let appointmentsDate = moment(appointment.start_date)

    return (
      appointmentsDate.isSame(tomorrow, 'days')
    )
  })

  todaysAppointments.sort((a, b) => {
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

  tomorrowsAppointments.sort((a, b) => {
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


  const getStart_Date = (date) => {
    date = new Date(date)
    let minutes = date.getMinutes()
    let time = date.getTimezoneOffset()
    date.setMinutes(minutes + time)
    return date
  }

  console.log('')
  return (
    <>
    <ul className="appointmentListWrapper">
      {todaysAppointments.map(app => {
        return (
          <Appointment
            key={app._id}
            id={app._id}
            start_date={getStart_Date(app.start_date)}
            type_of_reservation={app.type_of_reservation}
            appUser={users.find(u => u._id === app.user_id)}
          />
        )
      })}
    </ul>
    <ul className="appointmentListWrapper">
    {tomorrowsAppointments.map(app => {
      return (
        <Appointment
          key={app._id}
          id={app._id}
          start_date={getStart_Date(app.start_date)}
          type_of_reservation={app.type_of_reservation}
          appUser={users.find(u => u._id === app.user_id)}
        />
      )
    })}
  </ul>
    </>
    
  )
}

export default WeeksAppointments
