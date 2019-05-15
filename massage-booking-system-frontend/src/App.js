import React, { useState, useEffect } from "react"
import  usersService from "./services/users"
import masseussesService from "./services/masseusses"
import appointmentsService from "./services/appointments"
import calenderService from "./services/calender"
import Calender from "./components/Calender"


const App = () => {
  const [users, setUsers] = useState([])
  const [masseusses, setMasseusses] = useState([])
  const [appointments, setAppointments] = useState([])
  const [times, setTimes] = useState([])


  useEffect(() => {
    usersService.getUsers().then((response => setUsers(response.data)))
    appointmentsService.getAppointments().then((response => setAppointments(response.data)))
    masseussesService.getMasseusses().then((response => setMasseusses(response.data)))
    calenderService.getTimes().then((response => setTimes(response.data)))

  }, [])

  console.log(users)
  console.log(masseusses)
  console.log(appointments)
  console.log(times)

  return (
    <div>
      <p>Hello world</p>
      <Calender times={times} />
    </div>
  )
}

export default App