import React, { Fragment, useContext } from 'react'
import Calendar from 'react-calendar';
import { AppointmentContext, UserContext } from '../../App'
import { Appointments } from './Appointment'
import { OWN_APPOINTMENTS } from '../../types/logged_in'

const Index = (props) => {
  const { user } = useContext(UserContext)
  const { setSelectedDate } = useContext(AppointmentContext)
  // const currentUser = appointmentContext.user
  // const setSelectedDate = appointmentContext.setSelectedDate
  return (
    <Fragment>
      Welcome {user.name}!
      <Calendar
        tileClassName="calendarItem"
        onChange={(value) => {
          // console.log('value ', value, 'value type', typeof value)
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