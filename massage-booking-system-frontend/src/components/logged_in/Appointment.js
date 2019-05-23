import React, { Fragmen, useContext } from 'react'
import { AppointmentContext } from '../../App'

const CreateAppointment = (props) => {
  // console.log('Create appointment props', props)
  return (
    <button onClick={() => console.log('Appointment creation button clicked')}>CREATE</button>
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

const AppointmentsList = (props) => {
  const appointmentContext = useContext(AppointmentContext)
  const currentUser = appointmentContext[0]
  const appointments = appointmentContext[1]
  const ownAppointments = appointments.filter(app => app.user_id === currentUser._id)
  console.log('own apps', ownAppointments)
  return (
    <ul>
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
    <li>
      <div>ID: {id}</div>
      <div>Appointment made: {start_time}</div>
      <div>Type of reservation: {type_of_reservation}</div>
      <CancelAppointment id={id} />
    </li>
  )
}

export default AppointmentsList

