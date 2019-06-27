import React, { useContext, useEffect } from 'react'
import { UserContext, NotificationContext } from '../../App'
import OwnAppointments from '../OwnAppointments/OwnAppointments'
import useField from '../../hooks/useField'
import Notification from '../Notification/Notification'

const MyPage = () => {
  const { user, setUser, userService } = useContext(UserContext)
  const { createNotification, notification, announcementNotification } = useContext(NotificationContext)
  let numberField = useField('text')

  useEffect(() => {
    if (!user) return
    numberField.changeValue(user.number)
  }, [user])

  // TODO TODO TODO -- RESET NUMBER ON FORM SUBMIT?
  // TODO TODO TODO -- RESET NUMBER ON FORM SUBMIT?
  // TODO TODO TODO -- RESET NUMBER ON FORM SUBMIT?
  const handleNumberUpdate = async event => {
    event.preventDefault()
    try {
      const number = numberField.value
      const updatedUser = { ...user, number }
      const type = 'user'

      setUser(updatedUser)
      await userService.update(user._id, updatedUser, type)
      createNotification('Succesfully changed number', 'success')
    } catch (exception) {
      createNotification('Unable to change number')
    }
  }

  // NOTICE -- user && rest rendered. Otherwise nothing gets rendered
  return (
    user && (

      <div>
        {notification
          ? <Notification notification={notification} />
          : <Notification notification={announcementNotification} />}
        <div className="mypage_wrapper">
          <div className="own_info">
            <h2>{user.name}</h2>
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt="profile pic"
                height="180"
                width="180"
              />
            ) : (
              'avatar'
            )}
            <label>Phone number</label>
          </div>
          <form className= "mypage_form" onSubmit={handleNumberUpdate}>
            <input
              type={numberField.type}
              id="number"
              value={numberField.value}
              name="number"
              onChange={numberField.handleFieldChange}
            />
            <button type="submit">Update</button>
          </form>
          
          <div className="own_appointments">
            <h2>My Appointments</h2>
            <OwnAppointments ownPage={true} />
          </div>
        </div>
      </div>
    )
  )
}

export default MyPage
