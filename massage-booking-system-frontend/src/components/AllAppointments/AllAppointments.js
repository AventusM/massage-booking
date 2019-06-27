import React, { useContext } from 'react'
import Appointment from '../Appoinment/Appointment'
import { AppointmentContext, UserContext } from '../../App'

const AllAppointments = () => {
  const { appointments, selectedDate, appointmentService } = useContext(AppointmentContext)
  const { users, user } = useContext(UserContext)
  const givenDate = new Date(selectedDate)

  let selectedDay = givenDate.getDate()
  let selectedMonth = givenDate.getMonth() + 1
  let selectedYear = givenDate.getFullYear()

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

  const isUnavailable = (value) => {
    return value.type_of_reservation === 3
  }

  let unavailable = todaysAppointments.every(isUnavailable)

  const getStart_Date = (date) => {
    date = new Date(date)
    let minutes = date.getMinutes()
    let time = date.getTimezoneOffset()
    date.setMinutes(minutes + time)
    return date
  }

  const markDayUnavailable = async () => {
    await appointmentService.updateExpectMany(givenDate.toDateString(), 'removeDate')

  }

  const markDayAvailable = async () => {
    await appointmentService.updateExpectMany(givenDate.toDateString(), 'addDate')
  }

  return (todaysAppointments &&
    <div className="appointmentListWrapper">
      <div className="controls">
        {user.admin === true ? (
          (unavailable === false) ? (
            <button onClick={() => markDayUnavailable()}>Mark this day as unavailable</button>
          ) : (<button onClick={() => markDayAvailable()}>Mark this day as available</button>
          )) : (null)}
      </div>
      < ul className="appointmentListWrapper">
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
    </div >
  )
}

export default AllAppointments
