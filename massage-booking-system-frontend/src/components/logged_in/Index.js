import React, { Fragment, useContext } from 'react'
//import Calendar from 'react-calendar';
import Calendar from 'react-calendar'
import { AppointmentContext, UserContext } from '../../App'

import AllAppointments from './AllAppointments'
import LoginIndex from '../Login_index'
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
  console.log('RENDERING INDEX')
  const { selectedDate, setSelectedDate, appointments } = useContext(AppointmentContext)
  const freeAppointments = appointments.filter(
    app => app.type_of_reservation === 0
  )
  let selectedMoment = moment(selectedDate)
  let now = moment()

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
            tileClassName={({ date, view }) => {
              let dateMoment = moment(date)
              if (dateMoment.isBefore(now) || dateMoment.day() > 2 || dateMoment.day() === 0) {
                return 'disabled'
              } else {
                if (dateMoment.isSame(selectedMoment, 'days')) {
                  // selected
                  if (user.appointments.filter((app) => moment(app.start_date).isSame(dateMoment, 'days')).length > 0) {
                    // selected, user has appointment for day
                    return 'userHasAppSelected'
                  } else {
                    // selected, user does not have app for day
                    if (freeAppointments.filter(app => moment(app.start_date).isSame(dateMoment, 'day')).length > 0) {
                      // selected, user does not have app, day has free app
                      return 'hasFreeSelected'
                    } else {
                      // selected, user does not have app, no free apps
                      return 'noneFreeSelected'
                    }
                  }
                } else {
                  // not selected
                  if (user.appointments.filter((app) => moment(app.start_date).isSame(dateMoment, 'days')).length > 0) {
                    // not selected, user has app for day
                    return 'userHasApp'
                  } else {
                    // not selected, user does not have app for day
                    if (freeAppointments.filter(app => moment(app.start_date).isSame(dateMoment, 'day')).length > 0) {
                      // not selected, user does not have app for day, day has free app
                      return 'hasFree'
                    } else {
                      // not selected, user does not have app for day, no free apps
                      return 'noneFree'
                    }
                  }
                }
              }
            }
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
            < AllAppointments />
          </div>
          {/* <img id="unity4" src={unity4}></img> */}
        </div>
      </div>
    </Fragment>
  )
}

export default Index
