import React, { useState, useEffect, Fragment } from "react"
import LoginIndex from './components/Login_index'
import Index from './components/logged_in/Index'
import RegistrationFormFragment from './components/logged_in/registrationForm'
import loginService from './services/login'
import usersService from './services/users'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'



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

const padding = { padding: 5 }

const App = () => {
  const [user, setUser] = useState(null)
  const email = useField('text')
  const password = useField('password')
  const registrationName = useField('text')
  const registrationEmail = useField('text')
  const registrationNumber = useField('text')
  const registrationPassword = useField('password')
  const registrationPasswordCheck = useField('password')

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

  const handleRegistration = async (event) => {
    event.preventDefault()
    try {
      const userObject = {
        name: registrationName.value,
        number: registrationNumber.value,
        email: registrationEmail.value,
        admin: false,
        password: registrationPassword.value
      }


      const response = usersService.addUser(userObject).then(user => {
        registrationName.reset()
        registrationEmail.reset()
        registrationNumber.reset()
        registrationPassword.reset()
        registrationPasswordCheck.reset()
      })

    } catch (exception) {
      console.log('Error happened during registration', exception)
    }
  }

  return (
    <Fragment>
      <Router>
        <div>
          <div>
            <Link style={padding} to="/">Login</Link>
            <Link style={padding} to="/registration">Registration</Link>
          </div>
          <Route exact path="/" render={() => <LoginIndex handleLoginFunction={handleLogin} email={email} password={password} />} />
          <Route path="/registration" render={() => <RegistrationFormFragment handleRegistrationFunction={handleRegistration} name={registrationName} email={registrationEmail} number={registrationNumber} password={registrationPassword} passwordCheck={registrationPasswordCheck} />} /> 
        </div>
      </Router>
    </Fragment>
  )
}

export default App