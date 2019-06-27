import React, { useContext, useEffect } from 'react'
import { UserContext, NotificationContext } from '../../App'
import OwnAppointments from '../OwnAppointments/OwnAppointments'
import useField from '../../hooks/useField'
import Notification from '../Notification/Notification'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

const MyPage = () => {
  const { user, setUser, userService } = useContext(UserContext)
  const { createNotification, notification, announcementNotification } = useContext(NotificationContext)
  let numberField = useField('text')

  useEffect(() => {
    if (!user) return
    numberField.changeValue(user.number)
  }, [user])

  const handleNumberUpdate = async event => {
    event.preventDefault()
    try {
      const number = numberField.value
      const updatedUser = { ...user, number }
      const type = 'user'

      setUser(updatedUser)
      const response = await userService.update(user._id, updatedUser, type)

      if (response !== undefined) {
        createNotification(response.data.error)
      } else {
        createNotification('Succesfully changed number', 'success')
      }
    } catch (exception) {
      console.log('response: ', exception)

      createNotification('Unable to change number')
    }
  }

  const handleRemoveUser = async (id) => {
    confirmAlert({
      message: 'Are you sure you want to remove your profile?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await userService.remove(id)
            } catch (exception) {
              window.location.reload()
            }
          }
        },
        {
          label: 'No',
        }
      ]
    })
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
          <button
            className="delete_user"
            onClick={() => handleRemoveUser(user._id)}>
            Remove user
          </button>
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
