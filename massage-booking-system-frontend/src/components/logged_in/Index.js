import React, { Fragment, useContext } from 'react'
import { AppointmentContext } from '../../App'
import { Appointments } from './Appointment'
import { OWN_APPOINTMENTS } from '../../types/logged_in'

const Index = (props) => {
  const appointmentContext = useContext(AppointmentContext)
  const currentUser = appointmentContext.user
  return (
    <Fragment>
      Welcome {currentUser.name}!
      <h1>Available appointments</h1>
      <Appointments />
      <h1>Own appointments</h1>
      <Appointments type={OWN_APPOINTMENTS} />
    </Fragment>
  )
}

export default Index