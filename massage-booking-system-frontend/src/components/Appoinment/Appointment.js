import React, { useContext } from 'react'
import Display from '../Display/Display'
import CreateAppointment from '../CreateAppointment/CreateAppointment'
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

  const markAppUnavailable = async () => {
    await appointmentService.update(id, '', 'remove')
  }

  const markAppAvailable = async () => {
    await appointmentService.update(id, '', 'add')
  }

  return (
    <div className="cont">
      {type_of_reservation === 1 ? (
        appUser ? (
          user._id === appUser._id ? (
            <div>
              <button
                id="reservedOwn"
                onClick={() => cancelAppointment()}>
                <Display dateobject={start_date} ownPage={ownPage} date={true} cancel={true} />
              </button>
            </div>
          ) : (
            <div>
              <button
                id="reserved"
                onClick={() => { createNotification('You cannot book this slot!') }}>
                <Display dateobject={start_date} user={appUser} />
              </button>
            </div>
          )
        ) : null )
        : (type_of_reservation === 0
          ? <CreateAppointment id={id} start_date={start_date} />
          : user.admin
            ? <button id="removed" onClick={() => createNotification('This appointment is not reservable')}><Display dateobject={start_date} removed={true} /></button>
            : null
        )}
      {(user.admin === true && ownPage !== true) ? type_of_reservation === 3 ? (
        <button onClick={() => markAppAvailable()} id="restore" className="fas fa-undo"></button>

      ) : (
        <button onClick={() => markAppUnavailable()} id="remove" className="far fa-trash-alt" ></button>
      ) : (null)
      }</div>


  )
}

export default Appointment
