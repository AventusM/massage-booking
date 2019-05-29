import React, { Fragment, useContext } from 'react'
import Calendar from 'react-calendar';
import { AppointmentContext } from '../../App'
import { Appointments } from './Appointment'
import { OWN_APPOINTMENTS } from '../../types/logged_in'

const Index = (props) => {
  const appointmentContext = useContext(AppointmentContext)
  const currentUser = appointmentContext.user
  const setSelectedDate = appointmentContext.setSelectedDate
  return (
    <Fragment>
      Welcome {currentUser.name}!
      <Calendar
        tileClassName="calendarItem"
        onChange={(value) => {
          console.log('value ', value, 'value type', typeof value)
          //console.log('setselecteddate', setSelectedDate)
          setSelectedDate(value)
        }}
      />
      <h1>Available appointments</h1>
      <Appointments />
      <h1>Own appointments</h1>
      <Appointments type={OWN_APPOINTMENTS} />
    </Fragment>
  )
}

export default Index