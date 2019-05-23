import React, { useContext } from 'react'
import { AppointmentContext } from '../../App'

const CreateAppointment = (props) => {
  const appointmentContext = useContext(AppointmentContext)
  const currentUser = appointmentContext[0]
  const appointmentService = appointmentContext[2]
  const { id } = props
  return (
    <button onClick={() => appointmentService.update(id, { type_of_reservation: 1, user_id: currentUser._id })}>CREATE</button>
  )
}

const CancelAppointment = (props) => {
  const appointmentContext = useContext(AppointmentContext)
  const appointmentService = appointmentContext[2]
  const { id } = props
  return (
    <button onClick={() => appointmentService.update(id, { type_of_reservation: 0 })}> CANCEL</button >
  )
}

const FreeAppointments = () => {
  const appointmentContext = useContext(AppointmentContext)
  const appointments = appointmentContext[1]
  const freeAppointments = appointments.filter(app => app.type_of_reservation === 0)
  return (
    <ul>
      {freeAppointments.map(app => {
        return (
          <Appointment key={app._id}
            id={app._id}
            start_time={app.start_time}
            type_of_reservation={app.type_of_reservation} />
        )
      })}
    </ul>
  )

}

const AppointmentsList = () => {
  const appointmentContext = useContext(AppointmentContext)
  const currentUser = appointmentContext[0]
  const appointments = appointmentContext[1]
  const ownAppointments = appointments.filter(app => app.user_id === currentUser._id)
  return (
    <ul className="appointmentList">
      {ownAppointments.map(app => {
        return (
          <Appointment key={app._id}
            id={app._id}
            start_time={app.start_time}
            type_of_reservation={app.type_of_reservation} />
        )
      })}
    </ul>
  )
}

const Appointment = (props) => {
  const { id, start_time, type_of_reservation } = props
  return (
    <li className="appointmentItem">
      <h3>12:00</h3>
      <div>id: {id}</div>
      {type_of_reservation === 1
        ? <CancelAppointment id={id} />
        : <CreateAppointment id={id} />}
    </li>
  )
}

export { AppointmentsList, FreeAppointments }

