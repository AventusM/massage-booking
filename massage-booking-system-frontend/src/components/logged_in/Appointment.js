import React, { useContext } from 'react'
import { AppointmentContext, UserContext } from '../../App'
import { OWN_APPOINTMENTS } from '../../types/logged_in'

const CreateAppointment = (props) => {
  const appointmentContext = useContext(AppointmentContext)
  const currentUser = appointmentContext.user
  const appointmentService = appointmentContext.appointmentService
  const { id } = props
  return (
    <button onClick={() => appointmentService.update(id, { type_of_reservation: 1, user_id: currentUser._id })}>BOOK</button>
  )
}

const CancelAppointment = (props) => {
  const appointmentContext = useContext(AppointmentContext)
  const appointmentService = appointmentContext.appointmentService
  const { id } = props
  return (
    <button onClick={() => appointmentService.update(id, { type_of_reservation: 0 })}> CANCEL</button >
  )
}


const Appointments = (props) => {
  const { type } = props
  console.log('type', type)
  if (type === OWN_APPOINTMENTS) {
    return <AppointmentsList />
  }
  return <FreeAppointments />

}

const FreeAppointments = () => {
  const appointmentContext = useContext(AppointmentContext)
  const appointments = appointmentContext.appointments
  const users = appointmentContext.users
  const selectedDate = new Date(appointmentContext.selectedDate)
  let selectedDay = selectedDate.getDay()
  let selectedMonth = selectedDate.getMonth()
  let selectedYear = selectedDate.getFullYear()

  const freeAppointments = appointments.filter(app => app.type_of_reservation === 0)

  // compares appointment time to selected date on calendar, filtering to only include selected days appointments
  const todaysFreeAppointments = appointments.filter((appointment) => {
    let appointmentsDate = new Date (appointment.start_date)
    let appointmentsDay = appointmentsDate.getDay()
    let appointmentsMonth = appointmentsDate.getMonth()
    let appointmentsYear = appointmentsDate.getFullYear()
    
    return appointmentsMonth === selectedMonth && appointmentsDay === selectedDay && appointmentsYear === selectedYear
  })

  todaysFreeAppointments.sort((a, b ) => {
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
      {todaysFreeAppointments.map(app => {
        return (
          
          <div>
          <button>{app.start_date}</button>
          </div>
        
    
     /*
          <Appointment key={app._id}
            id={app._id}
            start_date={app.start_date}
            type_of_reservation={app.type_of_reservation} 
            user = {users.find(u => u._id === app.user_id)}/>/> */
        )})
      }
  
            
   
    </ul>
  )

}

const AppointmentsList = () => {
  const appointmentContext = useContext(AppointmentContext)
  const users = appointmentContext.users
  const currentUser = appointmentContext.user
  const appointments = appointmentContext.appointments
  const ownAppointments = appointments.filter(app => app.user_id === currentUser._id)
  return (
    <ul className="appointmentListWrapper">
      {ownAppointments.map(app => {
        return (
          
          <div>
          <button>12:00</button>
          </div>
          
         /* <Appointment key={app._id}
            id={app._id}
            start_date={app.start_date}
            type_of_reservation={app.type_of_reservation} /> 
            user = {users.find(u => u._id === app.user_id)} /> */
        )
      })}
    </ul>
  )
}

const ClockDisplay = ({dateobject}) => {
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
  const appointmentContext = useContext(AppointmentContext)
  const currentUser = appointmentContext.user
  const { id, start_date, type_of_reservation, user } = props
  let dateToDisplay = new Date(start_date)

  return (
    <li className="appointmentItem">
      <ClockDisplay dateobject={start_date}/>
      <div>id: {id}</div>
      {user ? (
        <div>{user.name}</div>
      ): null}
      {type_of_reservation === 1
        ? (user._id === currentUser._id ? <CancelAppointment id={id} /> : null )
        : <CreateAppointment id={id} />}
    </li>
    
    
  )
}

export { Appointments }

