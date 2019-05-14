import React, { useState, useEffect } from "react"
import  usersService from "./services/users"
import masseussesService from "./services/masseusses"
import appointmentsService from "./services/appointments"


const App = () => {
  const [users, setUsers] = useState([])
  const [masseusses, setMasseusses] = useState([])
  const [appointments, setAppointments] = useState([])


  useEffect(() => {
    usersService.getUsers().then((response => setUsers(response.data)))
    appointmentsService.getAppointments().then((response => setAppointments(response.data)))
    masseussesService.getMasseusses().then((response => setMasseusses(response.data)))

  }, [])

  console.log(users)
  console.log(masseusses)
  console.log(appointments)

  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}

export default App