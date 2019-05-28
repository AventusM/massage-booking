import React, { Fragment, useContext, useState } from 'react'
import Calendar from 'react-calendar';
import { AppointmentContext } from '../../App'
import { Appointments } from './Appointment'
import { OWN_APPOINTMENTS } from '../../types/logged_in'

const Index = (props) => {
  const appointmentContext = useContext(AppointmentContext)
  const [tab, setTab] = useState(true)
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
      
      
      {tab ? (
        <div>
        <h1>All appointments</h1>
        <button onClick = {() => setTab(!tab)}>Own appointments</button>
        <Appointments />
        </div>
      ) : (
        <div>
        <h1>Own appointments</h1>
        <button onClick = {() => setTab(!tab)}>All appointments</button>
        <Appointments type={OWN_APPOINTMENTS} />
        </div>
      )}
      
      
    </Fragment>
  )
}

export default Index