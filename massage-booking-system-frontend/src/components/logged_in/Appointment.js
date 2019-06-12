import React, { useContext } from 'react'
import Display from './Display'
import CreateAppointment from './CreateAppointment'
import { AppointmentContext, UserContext } from '../../App'

const Appointment = props => {
  const { appointmentService } = useContext(AppointmentContext)
  const { user } = useContext(UserContext)
  const { id, start_date, type_of_reservation, appUser } = props

  return (
    <div>
      {type_of_reservation === 1 ? (
        appUser ? (
          user._id === appUser._id ? (
            <button
              id="reservedOwn"
              onClick={() =>
                appointmentService.update(id, {
                  type_of_reservation: 0,
                  user_id: user._id,
                })
              }
            >
              <Display dateobject={start_date} own={true} />
            </button>
          ) : (
            <button
              id="reserved"
              onClick={() => {
                window.alert('You cannot book this slot')
              }}
            >
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
