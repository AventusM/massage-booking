import React, { useContext } from 'react'
import Display from './Display'
import CreateAppointment from './CreateAppointment'
import { AppointmentContext, UserContext, NotificationContext } from '../../App'

const Appointment = props => {
  const { appointmentService } = useContext(AppointmentContext)
  const { user } = useContext(UserContext)
  const { createNotification } = useContext(NotificationContext)
  const { id, start_date, type_of_reservation, appUser, ownPage } = props

  const cancelAppointment = async () => {
    await appointmentService.update(id, { type_of_reservation: 0, user_id: user._id, })
    createNotification('Appointment cancelled succesfully', 'success')
  }

  return (
    <div>
      {type_of_reservation === 1 ? (
        appUser ? (
          user._id === appUser._id ? (
            <button
              id="reservedOwn"
              onClick={() => cancelAppointment()}>
              <Display dateobject={start_date} ownPage={ownPage} />
            </button>
          ) : (
            <button
              id="reserved"
              onClick={() => { createNotification('You cannot book this slot!') }}>
              <Display dateobject={start_date} user={appUser} />
            </button>
          )
        ) : null
      ) : (
        <CreateAppointment id={id} start_date={start_date} />
      )}
    </div>
  )
}

export default Appointment
