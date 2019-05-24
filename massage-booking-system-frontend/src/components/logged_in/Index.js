import React, { Fragment, useContext } from 'react'
import { AppointmentContext } from '../../App'
import { AppointmentsList, FreeAppointments } from './Appointment'

const Index = (props) => {
  const appointmentContext = useContext(AppointmentContext)
  const currentUser = appointmentContext.user
  return (
    <Fragment>
      <div className="main_wrapper">
      Welcome {currentUser.name}!
      <h1>Available appointments</h1>
      <FreeAppointments />
      <h1>Own appointments</h1>
      <AppointmentsList />
      </div>
    </Fragment>
  )
}

export default Index