import React, { useState, useEffect } from "react"
import usersService from "./services/users"
import masseussesService from "./services/masseusses"
import appointmentsService from "./services/appointments"
import calenderService from "./services/calendar"
import Calendar from "./components/Calendar"
import Toggleable from "./components/Toggleable"
import { timingSafeEqual } from "crypto"
import Timelist from './components/Timelist'

const App = () => {
  const [users, setUsers] = useState([])
  const [masseusses, setMasseusses] = useState([])
  const [appointments, setAppointments] = useState([])
  const [week, setWeek] = useState(1)
  const [day, setDay] = useState(1)
  const [timesToShow, setTimesToShow] = useState([])
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
      appointment_id: 1,
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

  useEffect(()=> {
    console.log('AAAAAAAAAA day:', day)
    console.log('AAAAAAAAAA times:', times)
    filterTimesToShow()
  }, [day])
  const filterTimesToShow = () => {
    console.log('timesToShow before', timesToShow)
    console.log('times in filterTimes to Show', times)
    console.log(times[0].day === day)
    console.log('timesFiltered', times.filter(time => time.day == day))
    const filteredTimes = times.filter(time => time.day == day)
    console.log('filteredTimes', filteredTimes)
    setTimesToShow(filteredTimes)
    console.log('timesToShow after', timesToShow)
  }
  console.log('timestoShow', timesToShow)


/*   useEffect(() => {
    console.log('useEfect')
    usersService.getUsers().then((response => setUsers(response.data)))
    appointmentsService.getAppointments().then((response => setAppointments(response.data)))
    masseussesService.getMasseusses().then((response => setMasseusses(response.data)))
    calenderService.getTimes().then((response => setTimes(response.data)))
    

  }, []) */
  
  
 /*  console.log(users)
  console.log(masseusses)
  console.log(appointments)
  console.log(times) */

 

  return (
    <div >
      <Calendar setDay={setDay}/>
      <Timelist list={timesToShow}/>
    </div>
  )
}

export default App