import React, { useContext } from 'react'
import Appointment from './Appointment'
import { AppointmentContext, UserContext } from '../../App'

const AppointmentsList = () => {
  const { appointments } = useContext(AppointmentContext)
  const { user, users } = useContext(UserContext)
  //console.log("tämän hetkisen käyttäjän ajat ", user.appointments)
  const foundUser = users.find(u => user._id === u._id)
  //console.log("tietokannasta tämän hetkisen käyttäjän idllä haetun käyttäjän ajat ", foundUser.appointments)
  const ownAppointments = appointments.filter(
    app => app.user_id === foundUser._id
  )
  return (
    <ul className="appointmentListWrapper">
      {ownAppointments.map(app => {
        return (
          <Appointment
            key={app._id}
            id={app._id}
            start_date={app.start_date}
            type_of_reservation={app.type_of_reservation}
            appUser={foundUser}
          />
        )
      })}
    </ul>
  )
}

export default AppointmentsList
