import React, { Fragment, useState, useContext } from 'react'
import { UserContext, AppointmentContext } from '../../App'
import useField from '../../hooks/useField'
import AppointmentsList from './AppointmentsLists'

const MyPage = () => {
  const currentUserContext = useContext(UserContext)
  const { user, setUser, userService } = currentUserContext
  const { number, avatarUrl, name } = user
  const numberField = useField('text', number)

  const handleNumberUpdate = event => {
    event.preventDefault()
    const number = numberField.value
    const updatedUser = { ...user, number }
    console.log('Hei', updatedUser)

    setUser(updatedUser)
    userService.updateUser(user._id, updatedUser)
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
