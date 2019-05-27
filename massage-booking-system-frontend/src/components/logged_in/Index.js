import React, { Fragment, useContext } from 'react'
import { AppointmentContext } from '../../App'
import { AppointmentsList, FreeAppointments } from './Appointment'
import unity4 from '../../pics/unity4.png'


const Index = (props) => {
  const appointmentContext = useContext(AppointmentContext)
  const currentUser = appointmentContext.user
  return (
    <Fragment>
    <div className='indexWrapper'>
      <h1>Available appointments</h1>
      <FreeAppointments />
      <h1>Own appointments</h1>
      <AppointmentsList />
      <img id= "unity4" src = {unity4}></img>
      </div>
     
    
    </Fragment>
  )
}

export default Index