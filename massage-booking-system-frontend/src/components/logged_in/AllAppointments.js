import React, { useContext } from 'react'
import Appointment from './Appointment'
import { AppointmentContext, UserContext } from '../../App'

const AllAppointments = () => {
  const { appointments, selectedDate } = useContext(AppointmentContext)
  const { users, user } = useContext(UserContext)
  const givenDate = new Date(selectedDate)
  let selectedDay = givenDate.getDate()
  let selectedMonth = givenDate.getMonth() + 1
  let selectedYear = givenDate.getFullYear()
  // console.log('appointments in allappointments', appointments)
  const allButOwnAppointments = appointments.filter(
    app => app.user_id !== user._id
  )
  // compares appointment time to selected date on calendar, filtering to only include selected days appointments
  const todaysAppointments = appointments.filter(appointment => {
    let appointmentsDate = new Date(appointment.start_date)
    let appointmentsDay = appointmentsDate.getDate()
    let appointmentsMonth = appointmentsDate.getMonth() + 1
    let appointmentsYear = appointmentsDate.getFullYear()

    return (
      appointmentsMonth === selectedMonth &&
      appointmentsDay === selectedDay &&
      appointmentsYear === selectedYear
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
  const getStart_Date = (date) => {
    date = new Date(date)
    let minutes = date.getMinutes()
    let time = date.getTimezoneOffset()
    date.setMinutes(minutes + time)
    return date
  }
  return (
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
  )
}

export default AllAppointments
