import React, { useState, useEffect, Fragment } from "react"
import LoginIndex from './components/Login_index'
import Index from './components/logged_in/Index'
import loginService from './services/login'
import Calendar from 'react-calendar';
import {BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'


const useField = (type) => {
  const [value, setValue] = useState('')
  const handleFieldChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return { type, value, handleFieldChange, reset }
}

const App = () => {
  const [user, setUser] = useState(null)
  const email = useField('text')
  const password = useField('password')
  const [selectedDate, setSelectedDate] = useState(new Date())
  // const [email, setEmail] = useField('')
  // const [password, setPassword] = useState('')

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      // CUSTOM HOOKS --> const email and password no longer contain values straight up. 
      const loggedInUser = await loginService.login({ email: email.value, password: password.value })
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))

      // Appointmentservice.setToken tms tänne
      // Appointmentservice.setToken tms tänne
      // Appointmentservice.setToken tms tänne

      setUser(loggedInUser)
      email.reset()
      password.reset()
      // setEmail('')
      // setPassword('')

    } catch (exception) {
      console.log('virhe kirjautumisessa', exception)
    }
  }

  const handeRegistration = async (event) =>  {
    event.preventDefault()
    
  }


  const handleRegistration = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({ email, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))


      setUser(loggedInUser)
      setEmail('')
      setPassword('')

    } catch (exception) {
      console.log('virhe kirjautumisessa', exception)
    }
  }

  const handeRegistration = async (event) =>  {
    event.preventDefault()
    
  }


  // TODO -- REACT ROUTER
  // TODO -- REACT ROUTER
  // TODO -- REACT ROUTER
  return (
    <div >
      
      
      
      <Fragment>
      {user === null && <LoginIndex handleLoginFunction={handleLogin} email={email} password={password} setEmail={setEmail} setPassword={setPassword} />}
      {user !== null && <Index user={user} />}
      </Fragment>

    <div>
      <Calendar
          onChange={(value) => {
            console.log('value ', value) 
            setSelectedDate(value)
          }}
          value={new Date()}
        />
      </div>
    </div>
    
  )
}

export default App