import React from 'react'
import userService from '../services/users'

const AppointmentForm = ({ timeSlot, user, setUser }) => {
  const makeAppointment = () => {
    if (window.confirm(`Reserve massage at ${timeSlot.startTime}?`)) {
      console.log('timeslot ', timeSlot)

      /* user.appointments.concat(timeSlot.appointment_id)
        // const appointmentObject = appointments.map(app => app.id).find(timeSlot.appointment_id)
        // appointmentObject.userId = user.id
        //applicationService
        //.updateAppointments(appointmentObject.id, appointmentObject)
        //.then(response => {
        //    setAppointments(Appointments.map(appointment => appointment.id !== id ? appointment : response.data))
        //})

        userService
        .updateUser(user.id, user)
        .then(response => {
        setUser(response.data)
        }) */
    }
  }
  if ((timeSlot.reserved = 1)) {
    return (
      <form onSubmit={makeAppointment}>
        {timeSlot.startTime}
        <button type="submit" className="timelist_button">
          Reserve
        </button>
      </form>
    )
  } else {
    return <form onSubmit={makeAppointment}>{timeSlot.startTime}</form>
  }
}

export default AppointmentForm
