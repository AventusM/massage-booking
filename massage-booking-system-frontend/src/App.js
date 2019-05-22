import React, { useState, useEffect, Fragment } from "react"
import LoginIndex from './components/Login_index'
import Index from './components/logged_in/Index'
import loginService from './services/login'
import uService from './services/users'
import axios from 'axios'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
  }

  const create = async (credentials) => {
    const newResource = await axios.post(baseUrl, credentials)
    const updatedResources = resources.concat(newResource)
    setResources(updatedResources)
  }

  const service = {
    getAll, create
  }

  return [resources, service]
}

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
  const [users, userService] = useResource('/api/users')
  const [user, setUser] = useState(null)
  const email = useField('text')
  const password = useField('password')


  useEffect(() => {
    userService.getAll()
  }, [])

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

  // TODO -- REACT ROUTER
  // TODO -- REACT ROUTER
  // TODO -- REACT ROUTER
  return (
    <Fragment>
      <UserList users={users} />
      {user === null && <LoginIndex handleLoginFunction={handleLogin} email={email} password={password} />}
      {user !== null && <Index user={user} />}
    </Fragment>
  )
}

const UserList = (props) => {
  const { users } = props
  return (
    <ul>
      {users.map(user => (
        <li key={user._id}>Name: {user.name}</li>
      ))}
    </ul>
  )
}

export default App