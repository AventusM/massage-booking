import React, { useContext, useState } from 'react'
import Appointment from './Appointment'
import { AppointmentContext, UserContext } from '../../App'

const SimpleAppointment = ({ app }) => {
  return <p>{app.start_date}</p>
}

const NextAppointment = ({ user, appointments }) => {
  console.log('appointments: ', appointments)
  console.log('user: ', user)

  let ownAppointments = appointments.filter(app => app.user_id === user._id)

  ownAppointments.sort(function(a, b) {
    let dateA = new Date(a.start_date),
      dateB = new Date(b.start_date)
    return dateA - dateB
  })

  return (
    <ul className="appointmentListWrapper">
      {ownAppointments.map(app => {
        return <SimpleAppointment app={app} />
      })}
    </ul>
  )
}

export default NextAppointment
