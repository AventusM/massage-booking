import React, { useContext, useEffect } from 'react'
import moment from 'moment'
import Appointment from './logged_in/Appointment'
import { AppointmentContext, UserContext } from '../App'
import Clock from './Clock'
import unity4 from '../pics/unity4.png'
import Notification from './Notification';

const WeeksAppointments = () => {
  const { appointments } = useContext(AppointmentContext)
  console.log('appointments length', appointments.length)
  const { users } = useContext(UserContext)
  const now = moment()

  /* every 24 minutes force page refresh to keep next appointment uptodated. */
  setInterval(()=> {
    window.location.reload()
  }, 1440000) 

  /* Generate appointment listing for monday*/
  let monday = null
  if (now.day() < 3 ) {
    monday = moment().startOf('week').add(1, 'days') // monday of this week
  } else {
    monday = moment().startOf('week').add(8, 'days') //monday of next week
  }
  
  // compares appointment time to selected date on calendar, filtering to only include selected days appointments
  const mondayAppointments = appointments.filter(appointment => {
    let appointmentsDate = moment(appointment.start_date)
    
    return (
      monday.isSame(appointmentsDate, 'day')
    )
  })
  mondayAppointments.sort((a, b) => {
    let dateA = new Date(a.start_date)
    let dateB = new Date(b.start_date)

    if (dateA < dateB) {
      return -1
    }

    if (dateA > dateB) {
      return 1
    }

    return 0
  })

  // NOTE: THIS ASSUMES 13 APPOINTMETS PER DAY; IF APPOINTMETS ARE EVER ADDED OR REMOVED THIS WILL BREAK
  let mondayFirstHalf = mondayAppointments.slice(0,5)
  let mondaySecondHalf = mondayAppointments.slice(5,12)

/* Generate appointment list for tuesday */

  let tuesday = null
  if (now.day() < 3 ) {
    tuesday = moment().startOf('week').add(2, 'days') // tuesday of this week
  } else {
    tuesday = moment().startOf('week').add(9, 'days') // tuesday of next week
  }

  const tuesdaysAppointments = appointments.filter(appointment => {
    let appointmentsDate = moment(appointment.start_date)

    return (
      appointmentsDate.isSame(tuesday, 'days')
    )
  })

  tuesdaysAppointments.sort((a, b) => {
    let dateA = new Date(a.start_date)
    let dateB = new Date(b.start_date)

    if (dateA < dateB) {
      return -1
    }

    if (dateA > dateB) {
      return 1
    }

    return 0
  })

    // NOTE: THIS ASSUMES 13 APPOINTMETS PER DAY; IF APPOINTMETS ARE EVER ADDED OR REMOVED THIS WILL BREAK
    let tuesdayFirstHalf = tuesdaysAppointments.slice(0,5)
    let tuesdaySecondHalf = tuesdaysAppointments.slice(5,12)



  /* Find next appointment */
  
  const comingAppointments = appointments.filter((app) => {
    let appStartTime = moment(app.start_date)
    return appStartTime.isAfter(now)
  }) 

  comingAppointments.sort((a, b) => {
    let dateA = new Date(a.start_date)
    let dateB = new Date(b.start_date)

    if (dateA < dateB) {
      return -1
    }

    if (dateA > dateB) {
      return 1
    }

    return 0
  })

  let next = comingAppointments[0]
  console.log('next ', next)


  /* helper for correcting timezone offset*/
  const getStart_Date = (date) => {
    date = new Date(date)
    let minutes = date.getMinutes()
    let time = date.getTimezoneOffset()
    date.setMinutes(minutes + time)
    return date
  }

    return (
      <>
      {next ? <Appointment
            id={next._id}
            start_date={getStart_Date(next.start_date)}
            type_of_reservation={next.type_of_reservation}
            appUser={users.find(u => u._id === next.user_id)}
      />: ''}
      
    <Clock />
    <h2>Monday</h2>
    <ul className="tvViewAppointmentList">
      {mondayFirstHalf.map(app => {
        return (
          <Appointment
            key={app._id}
            id={app._id}
            start_date={getStart_Date(app.start_date)}
            type_of_reservation={app.type_of_reservation}
            appUser={users.find(u => u._id === app.user_id)}
          />
        )
      })}
    </ul>
    <h5>LUNCH</h5>
    <ul className="tvViewAppointmentList">
      {mondaySecondHalf.map(app => {
        return (
          <Appointment
            key={app._id}
            id={app._id}
            start_date={getStart_Date(app.start_date)}
            type_of_reservation={app.type_of_reservation}
            appUser={users.find(u => u._id === app.user_id)}
          />
        )
      })}
    </ul>
    <h2>Tuesday</h2>
    <ul className="tvViewAppointmentList">
    {tuesdayFirstHalf.map(app => {
      return (
        <Appointment
          key={app._id}
          id={app._id}
          start_date={getStart_Date(app.start_date)}
          type_of_reservation={app.type_of_reservation}
          appUser={users.find(u => u._id === app.user_id)}
        />
      )
    })}
  </ul>
  <h5>LUCNH</h5>
  <ul className="tvViewAppointmentList">
    {tuesdaySecondHalf.map(app => {
      return (
        <Appointment
          key={app._id}
          id={app._id}
          start_date={getStart_Date(app.start_date)}
          type_of_reservation={app.type_of_reservation}
          appUser={users.find(u => u._id === app.user_id)}
        />
      )
    })}
  </ul>
    <img className= "logoTV"
    id="unity4" src={unity4}></img>
    </>
    )
  

  
}

export default WeeksAppointments
