import React, { useContext } from 'react'
import UserList from '../UserList/UserList'
import { NotificationContext } from '../../App'
import 'react-datepicker/dist/react-datepicker.css'
import useField from '../../hooks/useField'
import Notification from '../Notification/Notification'

const DashBoard = () => {
  const { announcementService, notification, announcementNotification } = useContext(NotificationContext)
  let editedAnnouncement = useField('')

  const changeAnnouncement = async event => {
    event.preventDefault()
    const announcement = {
      message: editedAnnouncement.value
    }
    announcementService.createWithoutConcat(announcement)
  }

  return (
    <div>
      {notification
        ? <div className="dashboard_notification_container"><Notification  notification={notification} /></div>
        : null}
      <Notification notification={announcementNotification} />
      <h2 className="dashboard_announcement_labels">Set Announcement</h2>
      <p className="dashboard_announcement_labels">Making an empty announcement clears the announcement</p>
      <form className="dashboard_form" onSubmit={changeAnnouncement}>
        <input className="dashboard_announcement"
          value={editedAnnouncement.value}
          onChange={editedAnnouncement.handleFieldChange}
        />
        < br/>
        <button type="submit">Change</button>
      </form>
      <UserList />
    </div>
  )
}

export default DashBoard
