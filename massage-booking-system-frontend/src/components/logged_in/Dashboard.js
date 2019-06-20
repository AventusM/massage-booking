import React, { useContext } from 'react'
import UserList from './UserList'

import { NotificationContext } from '../../App'
import useField from '../../hooks/useField'
import Notification from '../Notification'

const DashBoard = props => {
  const { announcementService, notification, announcementNotification } = useContext(NotificationContext)
  let editedAnnouncement = useField('')
  const changeAnnouncement = async event => {
    event.preventDefault()
    console.log('changeAnnouncement', editedAnnouncement.value)
    const announcement = {
      message: editedAnnouncement.value
    }
    announcementService.createWithoutConcat(announcement)
  }
  return (

    <div>
      { notification
        ? <Notification notification={notification}/>
        : <Notification notification={announcementNotification}/>}
      <form className="dashboard_form" onSubmit={changeAnnouncement}>
        <input className="dashboard_announcement"
          value={editedAnnouncement.value}
          onChange={editedAnnouncement.handleFieldChange}
        />
        <button type= "submit">Update</button>
      </form>
      <UserList/>
    </div>
  )
}

export default DashBoard
