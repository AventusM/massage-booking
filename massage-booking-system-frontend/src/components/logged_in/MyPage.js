import React, { useContext } from 'react'
import { UserContext } from '../../App'
import useField from '../../hooks/useField'
import AppointmentsList from './AppointmentsLists'

const MyPage = () => {
  const currentUserContext = useContext(UserContext)
  const { user, setUser, userService } = currentUserContext
  const { number, avatarUrl, name } = user
  const numberField = useField('text', number)

  const handleNumberUpdate = async event => {
    event.preventDefault()
    console.log('event', event)
    const number = numberField.value
    const updatedUser = { ...user, number }
    const type = 'user'

    setUser(updatedUser)
    await userService.update(user._id, updatedUser, type)
  }

  return (
    <div className="mypage_wrapper">
      <p>{name}</p>
      {avatarUrl ? (
        <img src={avatarUrl} alt="profile pic" height="100" width="100" />
      ) : (
        'avatar'
      )}
      <label>Phone number</label>
      <form onSubmit={handleNumberUpdate}>
        <input
          type={numberField.type}
          id="number"
          value={numberField.value}
          name="number"
          onChange={numberField.handleFieldChange}
        />
        <button type="submit">Update</button>
      </form>
      <h2>My Appointments</h2>
      <AppointmentsList />
    </div>
  )
}

export default MyPage
