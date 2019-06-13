import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../App'
import AppointmentsList from './AppointmentsLists'
import useField from '../../hooks/useField'

const MyPage = () => {
  const { user, setUser, userService } = useContext(UserContext)

  let numberField = useField('text', '')
  useEffect(() => {
    if (!user) return
    numberField.changeValue(user.number)
  }, [user])

  const handleNumberUpdate = async event => {
    event.preventDefault()
    const number = numberField.value
    const updatedUser = { ...user, number }
    const type = 'user'

    setUser(updatedUser)
    await userService.update(user._id, updatedUser, type)
  }

  // NOTICE -- user && rest rendered. Otherwise nothing gets rendered
  return (
    user && <div className="mypage_wrapper">
      <p>{user.name}</p>
      {user.avatarUrl ? (
        <img src={user.avatarUrl} alt="profile pic" height="100" width="100" />
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
