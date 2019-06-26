import React from 'react'
import moment from 'moment'
import Display from '../Display/Display'
import formatStartDate from '../../utils/formatStartDate'


const DaysAppointmentsSimple = ({ dayNumber, lastdayWithAppointments, appointments }) => {
  const now = moment()

  let day = null
  if (now.day() <= lastdayWithAppointments) {
    day = moment().startOf('week').add(dayNumber, 'days') // day on this week
  } else {
    day = moment().startOf('week').add(7 + dayNumber, 'days') //day on next week
  }

  // compares appointment time to selected date on calendar, filtering to only include selected days appointments
  const daysAppointments = appointments.filter(appointment => {
    let appointmentsDate = moment(appointment.start_date)

    return (
      day.isSame(appointmentsDate, 'day')
    )
  })

  daysAppointments.sort(function (a, b) {
    let dateA = new Date(a.start_date),
      dateB = new Date(b.start_date)
    return dateA - dateB
  })

  const weekdays = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  }

  // NOTE: THIS ASSUMES 13 APPOINTMETS PER DAY; IF APPOINTMETS ARE EVER ADDED OR REMOVED THIS WILL BREAK
  let firstHalf = daysAppointments.slice(0, 5)
  let secondHalf = daysAppointments.slice(5, 12)

  return (
    <div>
      <h2 className="tv_view_headers">{weekdays[dayNumber]}</h2>
      <ul className="tvViewAppointmentList">
        {firstHalf.map(app => {
          return (
            <div className="cont_tv" key={app._id}>
              <Display dateobject={formatStartDate(app.start_date)} user={app.user} ownPage={true} date={true} cancel={false} />
            </div>

          )
        })}
      </ul>
      <h5 className="tv_view_headers">Break</h5>
      <ul className="tvViewAppointmentList">
        {secondHalf.map(app => {
          return (
            <div className="cont_tv" key={app._id}>
              <Display dateobject={formatStartDate(app.start_date)} user={app.user} ownPage={true} date={true} cancel={false} />
            </div>
          )
        })}
      </ul>
    </div>
  )
}

export default DaysAppointmentsSimple
