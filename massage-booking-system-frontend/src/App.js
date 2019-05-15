import React, { useState, useEffect } from "react"
import usersService from "./services/users"
import masseussesService from "./services/masseusses"
import appointmentsService from "./services/appointments"
import calenderService from "./services/calender"
import Calender from "./components/Calender"
import Toggleable from "./components/Toggleable";
import { timingSafeEqual } from "crypto";


const App = () => {
  const [users, setUsers] = useState([])
  const [masseusses, setMasseusses] = useState([])
  const [appointments, setAppointments] = useState([])
  const [times, setTimes] = useState([])
  const [weeks, setWeeks] = useState([])
  


  useEffect(() => {
    console.log('useEfect')
    usersService.getUsers().then((response => setUsers(response.data)))
    appointmentsService.getAppointments().then((response => setAppointments(response.data)))
    masseussesService.getMasseusses().then((response => setMasseusses(response.data)))
    calenderService.getTimes().then((response => setTimes(response.data)))
    

  }, [])
  let intialDay = times[0]
  console.log('initialday', intialDay)
  const [day, setDay] = useState([])
  
  
  console.log('times', times)
  
 /*  console.log(users)
  console.log(masseusses)
  console.log(appointments)
  console.log(times) */

  return (
    <div>
      
      <p>Hello world</p>
      <Toggleable day={day} setDays={setDay} />
      <Calender times={day} />
    </div>
  )
}

export default App