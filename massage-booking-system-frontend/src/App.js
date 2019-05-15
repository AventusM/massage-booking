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
  const [times, setTimes] = useState(
    [
      {
      id: 1,
      week: 1,
      appointment_id: 1,
      startTime: 8.15,
      day: 1
    },
    {
      id: 5,
      week: 1,
      appointment_id: 1,
      startTime: 8.30,
      day: 1
    },
    {
      id: 2,
      week: 1,
      appointment_id: null,
      startTime: 9.15,
      day: 2
    },

    {
      id: 3,
      week: 2,
      appointment_id: 2,
      startTime: 10.15,
      day: 1
    },
  
    {
      id: 4,
      week: 2,
      appointment_id: null,
      startTime: 11.15,
      day: 2
    }
  
    
]
  )
  const [week, setWeek] = useState(1)
  const [day, setDay] = useState(1)


/*   useEffect(() => {
    console.log('useEfect')
    usersService.getUsers().then((response => setUsers(response.data)))
    appointmentsService.getAppointments().then((response => setAppointments(response.data)))
    masseussesService.getMasseusses().then((response => setMasseusses(response.data)))
    calenderService.getTimes().then((response => setTimes(response.data)))
    

  }, []) */
  
  
  const determineDaysForGivenWeek = (props) => {
    console.log('week', week)
    const days = times.map(time => time.week = week ? time.day : null)
    
    let unique = [...new Set(days)]
    console.log('unique', unique)

    return (
      unique
    )
  }
  //determineDaysForGivenWeek(1)
  console.log('times', times)
  console.log('day', day)
  
 /*  console.log(users)
  console.log(masseusses)
  console.log(appointments)
  console.log(times) */

  return (
    <div >
      
      <p>Hello world</p>
      <Toggleable day={day} setDay={setDay} days={determineDaysForGivenWeek(1)}/>
      <Calender times={times} day={day} week={week} />
    </div>
  )
}

export default App