import React, { useContext } from 'react'
import moment from 'moment'
import { AppointmentContext } from '../../App'
import { UserContext } from '../../App'
import { OWN_APPOINTMENTS } from '../../types/logged_in'

const CreateAppointment = (currentUser, appointmentStartDate, appointmentService, id)  => {
  console.log('reservation rule check result ', reservationRuleCheck(currentUser.appointments, appointmentStartDate)) 
  if (reservationRuleCheck(currentUser.appointments, appointmentStartDate)) {
    appointmentService.update(id, { type_of_reservation: 1, user_id: currentUser._id })
  }
}

const CancelAppointment = (props) => {
  const appointmentContext = useContext(AppointmentContext)
  const userContext = useContext(UserContext)
  const currentUser = userContext.user
  const appointmentService = appointmentContext.appointmentService
  const { id } = props
  return (
    <button onClick={() => appointmentService.update(id, { type_of_reservation: 0, user_id: currentUser._id })}> CANCEL</button >
  )
}


const Appointments = (props) => {
  const { type } = props
  // console.log('type', type)
  if (type === OWN_APPOINTMENTS) {
    return <AppointmentsList />
  }
  return <AllAppointments />

}

const AllAppointments = () => {
  const appointmentContext = useContext(AppointmentContext)
  const appointments = appointmentContext.appointments
  const userContext = useContext(UserContext)
  const users = userContext.users
  const currentUser = userContext.user
  const selectedDate = new Date(appointmentContext.selectedDate)
  let selectedDay = selectedDate.getDate()
  let selectedMonth = selectedDate.getMonth() + 1
  let selectedYear = selectedDate.getFullYear()

  const allButOwnAppointments = appointments.filter(app => app.user_id !== currentUser._id)
  // compares appointment time to selected date on calendar, filtering to only include selected days appointments
  const todaysAppointments = allButOwnAppointments.filter((appointment) => {
    let appointmentsDate = new Date (appointment.start_date)
    let appointmentsDay = appointmentsDate.getDate()
    let appointmentsMonth = appointmentsDate.getMonth() + 1
    let appointmentsYear = appointmentsDate.getFullYear()
    
    return appointmentsMonth === selectedMonth && appointmentsDay === selectedDay && appointmentsYear === selectedYear
  })
  

  todaysAppointments.sort((a, b ) => {
    let dateA = new Date(a.start_date)
    let dateB  = new Date(b.start_date)

    if ( dateA < dateB) {
      return -1
    }

    if (dateA > dateB) {
      return 1
    }

    return 0
  })
  
  return (
    <ul className="appointmentListWrapper">
      {todaysAppointments.map(app => {
        return (
          <Appointment key={app._id}
            id={app._id}
            start_date={app.start_date}
            type_of_reservation={app.type_of_reservation} 
            user = {users.find(u => u._id === app.user_id)}/> 
        )})
      }
  
            
   
    </ul>
  )

}

const AppointmentsList = () => {
  const appointmentContext = useContext(AppointmentContext)
  const appointmentService =  appointmentContext.appointmentService
  const userContext = useContext(UserContext)
  const users = userContext.users
  const currentUser = userContext.user
  console.log(currentUser.appointments[0])
  const appointments = appointmentContext.appointments
  const ownAppointments = appointments.filter(app => app._id === currentUser.appointments[1])
  appointmentService.update(currentUser.appointments[0], { type_of_reservation: 0, user_id: currentUser._id})
  return (
    <ul className="appointmentListWrapper">
      {ownAppointments.map(app => {
        return (
          <Appointment key={app._id}
            id={app._id}
            start_date={app.start_date}
            type_of_reservation={app.type_of_reservation} 
            user = {users.find(u => u._id === app.user_id)} 
            /> 
        )
      })}
    </ul>
  )
}

const Display = ({dateobject, user, own}) => {
  let date = new Date(dateobject)

  let dateDisplay
  let day = date.getDate()
  let month = date.getMonth() + 1
  if (date.getDate() < 10) {
    day = `0${date.getDate()}`
  }
  if (date.getMonth() + 1 < 10) {
    month = `0${date.getMonth() + 1}`
  }

  if (own) {
    dateDisplay = `${day}.${month}.${date.getFullYear()}`
  }  

  const userDisplay = user ? user.name : null

  if (date.getMinutes() < 10) {
    return (
      <h4>{dateDisplay} {`${date.getHours()}:0${date.getMinutes()}`} {userDisplay} </h4>
    )
  }
  return (
    <h4>{dateDisplay} {`${date.getHours()}:${date.getMinutes()}`} {userDisplay}</h4>
  )
}

const Appointment = (props) => {
  const appointmentContext = useContext(AppointmentContext)
  const appointmentService = appointmentContext.appointmentService
  const userContext = useContext(UserContext)
  const currentUser = userContext.user
  const { id, start_date, type_of_reservation, user } = props
  let appointmentStartDate = appointmentContext.appointments.find(app => app._id === id).start_date

  return (
    <div>
    {type_of_reservation === 1 ? 
      (user._id === currentUser._id ? 
        <button id="reservedOwn" onClick={() => appointmentService.update(id, { type_of_reservation: 0, user_id: currentUser._id })}><Display dateobject={start_date} own={true}/></button> 
        : <button id="reserved" onClick={() => {window.alert("You cannot book this slot")}}><Display dateobject={start_date} user={user}/></button>
        ) : 
      <button id="available" onClick={() => CreateAppointment(currentUser, appointmentStartDate, appointmentService, id)}>
      
      <Display dateobject={start_date} user={user}/></button>}
    </div>
  )
}

const reservationRuleCheck = (usersAppointments, requestedAppointmentStartDate) => {
  console.log('usersAppointments', usersAppointments, ' requestedAppointStartTime', requestedAppointmentStartDate)
  let requestedTimeMoment = moment(requestedAppointmentStartDate)
  let usersAppointmentsWithinTheLastTwoWeeks = usersAppointments.filter((usersPreviousTime) => {
    let prevTimeMoment = moment(usersPreviousTime.start_date)
    let dayDifference = requestedTimeMoment.diff(prevTimeMoment, 'days')
    console.log('prevtimeMoment ', prevTimeMoment, 'requestedTiemMoment', requestedTimeMoment)
    console.log('day diff', dayDifference)
    return Math.abs(dayDifference) <14
  })
  console.log('usersAppointmentsWithinTheLastTwoWeeks after filter', usersAppointmentsWithinTheLastTwoWeeks)
  console.log('usersAppointmentsWithinTheLastTwoWeeks.lenght', usersAppointmentsWithinTheLastTwoWeeks.length)
  return usersAppointmentsWithinTheLastTwoWeeks.length === 0
}

export { Appointments }

