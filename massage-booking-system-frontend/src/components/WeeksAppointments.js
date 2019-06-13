import React, { useContext } from 'react'
import moment from 'moment'
import Appointment from './logged_in/Appointment'
import { AppointmentContext, UserContext } from '../App'
import Clock from './Clock'
import unity4 from '../pics/unity4.png'

const WeeksAppointments = () => {
  const { appointments } = useContext(AppointmentContext)
  const { users } = useContext(UserContext)

  /* Generate appointment listing for this weeks monday*/

  let monday = moment().startOf('week').add(1, 'days') // monday of this week

  // compares appointment time to selected date on calendar, filtering to only include selected days appointments
  const mondayAppointments = appointments.filter(appointment => {
    let appointmentsDate = moment(appointment.start_date)
    
    return (
      monday.isSame(appointmentsDate, 'day')
    )
  })

  mondayAppointments.sort((a, b) => {
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

/* Generate appointment list for this weeks tuesday */

  const tuesday = moment().startOf('week').add(2, 'days')
  const tuesdaysAppointments = appointments.filter(appointment => {
    let appointmentsDate = moment(appointment.start_date)

    return (
      appointmentsDate.isSame(tuesday, 'days')
    )
  })

  

  tuesdaysAppointments.sort((a, b) => {
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

  /* helper for correcting timezone offset*/
  const getStart_Date = (date) => {
    date = new Date(date)
    let minutes = date.getMinutes()
    let time = date.getTimezoneOffset()
    date.setMinutes(minutes + time)
    return date
  }

  console.log('TV todaysappointments ', mondayAppointments)
  console.log('TV tomorrows appointments', tuesdaysAppointments)
  return (
    <>
    <Clock />
    <h2>Monday</h2>
    <ul className="appointmentListWrapper">
      {mondayAppointments.map(app => {
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
    <h2>Tuesday</h2>
    <ul className="appointmentListWrapper">
    {tuesdaysAppointments.map(app => {
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
    <img className= "logoTV"
    id="unity4" src={unity4}></img>
    </>
    
  )
}

export default WeeksAppointments
