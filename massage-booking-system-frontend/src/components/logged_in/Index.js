import React, { Fragment, useContext } from 'react'
import Calendar from 'react-calendar';
import { AppointmentContext } from '../../App'
import { AppointmentsList, FreeAppointments } from './Appointment'

const Index = (props) => {
  const appointmentContext = useContext(AppointmentContext)
  const currentUser = appointmentContext.user
  const setSelectedDate = appointmentContext.setSelectedDate
  return (
    <Fragment>
      Welcome {currentUser.name}!
      <Calendar
          onChange={(value) => {
            console.log('value ',value, 'value type', typeof value) 
            //console.log('setselecteddate', setSelectedDate)
            setSelectedDate(value)
          }}
      />
      <h1>Available appointments</h1>
      <FreeAppointments />
      <h1>Own appointments</h1>
      <AppointmentsList />
    </Fragment>
  )
}

export default Index