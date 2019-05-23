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
    <button onClick={() => appointmentService.remove(id)}>CANCEL</button>
  )
}

const AppointmentsList = (props) => {
  const appointmentContext = useContext(AppointmentContext)
  const currentUser = appointmentContext[0]
  const appointments = appointmentContext[1]
  const ownAppointments = appointments.filter(app => app.user_id === currentUser._id)
  return (
    <ul>
      {ownAppointments.map(app => {
        return (
          <Appointment key={app._id}
            id={app._id}
            start_time={app.start_time} />
        )
      })}
    </ul>
  )
}

const Appointment = (props) => {
  const { id, start_time } = props
  console.log('appointment id', id)
  return (
    <li>
      <div>ID: {id}</div>
      <div>Appointment made: {start_time}</div>
      <CancelAppointment id={id} />
    </li>
  )
}

export default AppointmentsList

