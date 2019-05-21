import React, { useState, useEffect } from "react"
import usersService from "./services/users"
import masseussesService from "./services/masseusses"
import appointmentsService from "./services/appointments"


const App = () => {
  const [users, setUsers] = useState([])
  const [masseusses, setMasseusses] = useState([])
  const [appointments, setAppointments] = useState([])
  const [user, setUser] = useState([])

  

  

  useEffect(() => {
    usersService.getUsers().then((response => setUsers(response.data)))
    appointmentsService.getAppointments().then((response => setAppointments(response.data)))
    masseussesService.getMasseusses().then((response => setMasseusses(response.data)))

  }, [])

  const login = () =>{

  }

  const showAppointments = () =>{
    const appointmentList = appointments.map(appoint =>
      <button onClick={chooseAppointment(appoint)}>{appoint.id}</button>
    )
    return appointmentList
}
const chooseAppointment = (appoint) =>{
    appoint.user_id = user.id
    user.appointments.concat[appoint.id]
}

  console.log(users)
  console.log(masseusses)
  console.log(appointments)

  return (
    <div>
    <button>{login()}</button>
      {showAppointments()}
    </div>
  )
}

export default App