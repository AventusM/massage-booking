import React, { Fragment, useContext } from 'react'
import { AppointmentContext } from '../../App'
import { AppointmentsList, FreeAppointments } from './Appointment'

const Index = (props) => {
  const appointmentContext = useContext(AppointmentContext)
  const currentUser = appointmentContext[0]
  return (
    <Fragment>
      <div className="main_wrapper">
      Welcome {currentUser.name}!
      <h1>TODO -- GET GENERAL APPOINTMENTS LIST VISIBLE SOMEHOW</h1>
      <FreeAppointments />
      <h1>OWN APPOINTMENTS LISTED BELOW</h1>
      <AppointmentsList />
      </div>
    </Fragment>
  )
}

export default Index