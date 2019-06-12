import React, { useContext, useState } from 'react'
import Appointment from './Appointment'
import { AppointmentContext, UserContext } from '../../App'
const moment = require('moment')

const SimpleAppointment = ({ app }) => {
  const date = new Date(app.start_date)
  const currentWeek = moment().week()
  console.log('currentWeek: ', currentWeek)
  console.log('appointmentWekk:', moment(date).week())
  const weekdays = {
    1: 'Monday',
    2: 'Tuesday',
  }

  const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  }
  console.log('date: ', date.getDate())
  return (
    <p>
      Your next appointment is on {weekdays[date.getDay()]}
      {date.getHours()}:{date.getMinutes()} {months[date.getMonth()]}
      {date.getDate()}
    </p>
  )
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
