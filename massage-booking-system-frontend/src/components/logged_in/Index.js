import React, { Fragment, useContext, useState } from 'react'
//import Calendar from 'react-calendar';
import Calendar from 'react-calendar'
import { AppointmentContext, UserContext } from '../../App'
import unity4 from '../../pics/unity4.png'

import Appointments from './Appointments'
import LoginIndex from '../Login_index'
import { OWN_APPOINTMENTS } from '../../types/logged_in'
import moment from 'moment'
import NextAppointment from './NextAppointment'
const Index = () => {
  const { user } = useContext(UserContext)
  if (user) {
    return <AuthIndex user={user} />
  }
  return <LoginIndex />
}

const AuthIndex = ({ user }) => {
  const { setSelectedDate, appointments } = useContext(AppointmentContext)

  const freeAppointments = appointments.filter(
    app => app.type_of_reservation === 0
  )

  return (
    <Fragment>
      <NextAppointment user={user} appointments={appointments} />
      <div className="appointmentListWrapperMain">
        <div className="appointmentListWrapperCalendar">
          <Calendar
            locale={'en-UK'}
            onChange={value => {
              console.log('value ', value, 'value type', typeof value)
              setSelectedDate(value)
            }}
            minDetail="year"
            prev2Label={null}
            next2Label={null}
            tileClassName={({ date, view }) =>
              view === 'month' &&
              freeAppointments.filter(app =>
                moment(app.start_date).isSame(moment(date), 'day')
              ).length > 0
                ? 'availableDay'
                : view === 'month' && moment(date).isBefore(moment())
                ? 'disabled'
                : view === 'month' && date.getDay() < 3 && date.getDay() !== 0
                ? 'nonAvailableDay'
                : view === 'month' 
                ? 'disabled'
                : null
            }
            tileDisabled={({ date, view }) =>
              view === 'month' && (date.getDay() > 2 || date.getDay() === 0)
            }
            showNeighboringMonth={false}
          />
        </div>
        <div className="List">
          
            <div className="all_apps_div">
              <h1>All appointments</h1>
              <Appointments />
            </div>
          {/* <img id="unity4" src={unity4}></img> */}
        </div>
      </div>
    </Fragment>
  )
}

export default Index
