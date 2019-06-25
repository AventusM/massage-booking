import React, { useContext } from 'react'
import Appointment from '../Appoinment/Appointment'
import { AppointmentContext, UserContext } from '../../App'

const OwnAppointments = ({ ownPage }) => {
  const { appointments } = useContext(AppointmentContext)
  const { user } = useContext(UserContext)
  const ownAppointments = appointments.filter(
    app => app.user_id === user._id
  )

  const getStart_Date = (date) => {
    date = new Date(date)
    let minutes = date.getMinutes()
    let time = date.getTimezoneOffset()
    date.setMinutes(minutes + time)
    return date
  }

  ownAppointments.sort((a, b) => {
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

  return (
    <ul className="appointmentListWrapper">
      {ownAppointments.map(app => {
        return (
          <Appointment
            key={app._id}
            id={app._id}
            start_date={getStart_Date(app.start_date)}
            type_of_reservation={app.type_of_reservation}
            appUser={user}
            ownPage={ownPage}
          />
        )
      })}
    </ul>
  )
}

export default OwnAppointments
