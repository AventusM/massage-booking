import React, { useState, useEffect } from "react"
import usersService from "./services/users"
import masseussesService from "./services/masseusses"
import appointmentsService from "./services/appointments"
import calenderService from "./services/calendar"
import Toggleable from "./components/Toggleable"
import { timingSafeEqual } from "crypto"
import Timelist from './components/Timelist'
import Calendar from 'react-calendar';
import LoginForm from './components/LoginForm'
import './css/style.css'
import loginService from './services/login'

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [users, setUsers] = useState([])
  const [masseusses, setMasseusses] = useState([])
  const [appointments, setAppointments] = useState([])
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
    },
    {
      id: 4,
      week: 3,
      appointment_id: null,
      startTime: 11.15,
      day: 17
    }
  
    
]
  )
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  console.log('user ', user)

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)

      // Appointmentservice.setToken tms tänne
      // Appointmentservice.setToken tms tänne
      // Appointmentservice.setToken tms tänne
    }
  }, [])

  useEffect(()=> {
    //console.log('AAAAAAAAAA selectedDate:', selectedDate)
    
    filterTimesToShow()
  }, [selectedDate])
  const filterTimesToShow = () => {
      //console.log('selectedDate date', selectedDate.getDate())
    
    const filteredTimes = times.filter(time => time.day == selectedDate.getDate())
    
    setTimesToShow(filteredTimes)
    //console.log('QQQQQQq')
    
  }
  //console.log('timestoShow', timesToShow)


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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({ email, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))

      // Appointmentservice.setToken tms tänne
      // Appointmentservice.setToken tms tänne
      // Appointmentservice.setToken tms tänne

      setUser(loggedInUser)
      setEmail('')
      setPassword('')

      // console.log('kirjautunut käyttäjä', loggedInUser)
    } catch (exception) {
      console.log('virhe kirjautumisessa', exception)
    }
  }

  const handleLogoff = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }


  return (
    <div >
      <div>
        {user === null && 
          <LoginForm 
          handleLoginFunction={handleLogin}
          email={email} setEmail={setEmail}
          password={password}
          setPassword={setPassword} />}
        {user !== null && <p>Welcome {user.name}</p>}
      </div>
      <div>
      <Calendar
          onChange={(value) => {
            console.log('value ', value) 
            setSelectedDate(value)
          }}
          value={new Date()}
        />
      </div>
      
      <div>
        <Timelist list={timesToShow}/>
      </div>
      
    </div>
  )
}

export default App