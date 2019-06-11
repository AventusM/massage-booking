import React from 'react'
import AppointmentsList from './AppointmentsLists'
import AllAppointments from './AllAppointments'
import { OWN_APPOINTMENTS } from '../../types/logged_in'

const Appointments = ({ type }) => {
  if (type === OWN_APPOINTMENTS) {
    return <AppointmentsList />
  }
  return <AllAppointments />
}

export default Appointments
