import React, { useContext } from 'react'
import moment from 'moment'
import { AppointmentContext, UserContext } from '../../App'
import { OWN_APPOINTMENTS } from '../../types/logged_in'

const CreateAppointment = (props) => {
  const { id } = props
  const { user } = useContext(UserContext)
  const { appointments, appointmentService, setErrorMessage } = useContext(AppointmentContext)
  let appointmentStartDate = appointments.find(app => app._id === id).start_date
  // console.log('reservation rule check result ', reservationRuleCheck(currentUser.appointments, appointmentStartDate)) 
  const checkOk = reservationRuleCheck(user.appointments, appointmentStartDate)
  if (checkOk) {
    let setMessage=setErrorMessage

    const handleAppointmentCreation = () => {
      appointmentService.update(id, { type_of_reservation: 1, user_id: user._id })
      setMessage('Appointment reserved successfully')
      setTimeout(() => {
        setMessage(null)
      }, 8000)
    }
    return (
      <button onClick={() => handleAppointmentCreation()}>CREATE</button>
    )
  
    } 
    return null
}

const CancelAppointment = (props) => {
  const { id } = props
  const { appointmentService } = useContext(AppointmentContext)
  const { user } = useContext(UserContext)
  // const appointmentContext = useContext(AppointmentContext)
  // const userContext = useContext(UserContext)
  // const user = userContext.user
  // const appointmentService = appointmentContext.appointmentService
  return (
    <button onClick={() => appointmentService.update(id, { type_of_reservation: 0, user_id: user._id })}>CANCEL</button >
  )
}


const Appointments = (props) => {
  const { type } = props
  // console.log('type', type)
  if (type === OWN_APPOINTMENTS) {
    return <AppointmentsList />
  }
  return <FreeAppointments />

}

const FreeAppointments = () => {
  const { appointments, selectedDate } = useContext(AppointmentContext)
  // const appointmentContext = useContext(AppointmentContext)
  // const appointments = appointmentContext.appointments

  const givenDate = new Date(selectedDate)
  let selectedDay = givenDate.getDay()
  let selectedMonth = givenDate.getMonth()
  let selectedYear = givenDate.getFullYear()

  const freeAppointments = appointments.filter(app => app.type_of_reservation === 0)

  // compares appointment time to selected date on calendar, filtering to only include selected days appointments
  const todaysFreeAppointments = freeAppointments.filter((appointment) => {
    let appointmentsDate = new Date(appointment.start_date)
    let appointmentsDay = appointmentsDate.getDay()
    let appointmentsMonth = appointmentsDate.getMonth()
    let appointmentsYear = appointmentsDate.getFullYear()

    return appointmentsMonth === selectedMonth
      && appointmentsDay === selectedDay
      && appointmentsYear === selectedYear
  })

  todaysFreeAppointments.sort((a, b) => {
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

  return (
    <ul className="appointmentList">
      {todaysFreeAppointments.map(app => {
        return (
          <Appointment key={app._id}
            id={app._id}
            start_date={app.start_date}
            type_of_reservation={app.type_of_reservation} />
        )
      })}
    </ul>
  )

}

const AppointmentsList = () => {
  const { appointments } = useContext(AppointmentContext)
  const { user } = useContext(UserContext)
  // const appointmentContext = useContext(AppointmentContext)
  // const userContext = useContext(UserContext)
  // const user = userContext.user
  // const appointments = appointmentContext.appointments
  const ownAppointments = appointments.filter(app => app.user_id === user._id)
  return (
    <ul className="appointmentList">
      {ownAppointments.map(app => {
        return (
          <Appointment key={app._id}
            id={app._id}
            start_date={app.start_date}
            type_of_reservation={app.type_of_reservation} />
        )
      })}
    </ul>
  )
}

const ClockDisplay = ({ dateobject }) => {
  let date = new Date(dateobject)

  if (date.getMinutes() < 10) {
    return (
      <h4>{`${date.getHours()}:0${date.getMinutes()}`}</h4>
    )
  }
  return (
    <h4>{`${date.getHours()}:${date.getMinutes()}`}</h4>
  )
}

const Appointment = (props) => {
  const { id, start_date, type_of_reservation } = props
  return (
    <li className="appointmentItem">
      <ClockDisplay dateobject={start_date} />
      <div>id: {id}</div>
      {type_of_reservation === 1
        ? <CancelAppointment id={id} />
        : <CreateAppointment id={id} />}
    </li>
  )
}

const reservationRuleCheck = (usersAppointments, requestedAppointmentStartDate) => {
  // console.log('usersAppointments', usersAppointments, ' requestedAppointStartTime', requestedAppointmentStartDate)
  let requestedTimeMoment = moment(requestedAppointmentStartDate)
  let usersAppointmentsWithinTheLastTwoWeeks = usersAppointments.filter((usersPreviousTime) => {
    let prevTimeMoment = moment(usersPreviousTime.start_date)
    let dayDifference = requestedTimeMoment.diff(prevTimeMoment, 'days')
    // console.log('prevtimeMoment ', prevTimeMoment, 'requestedTiemMoment', requestedTimeMoment)
    // console.log('day diff', dayDifference)
    return Math.abs(dayDifference) < 14
  })
  // console.log('usersAppointmentsWithinTheLastTwoWeeks after filter', usersAppointmentsWithinTheLastTwoWeeks)
  // console.log('usersAppointmentsWithinTheLastTwoWeeks.lenght', usersAppointmentsWithinTheLastTwoWeeks.length)
  return usersAppointmentsWithinTheLastTwoWeeks.length === 0
}

export { Appointments }

