import React, {useContext, useState} from 'react'
import UserList from './UserList'
import {NotificationContext} from '../../App'

const DashBoard = props => {
  const { announcementService } = useContext(NotificationContext)
  const [editedAnnouncement, setEditedAnnouncement] = useState()
  const handleFieldChange = (event) => {
    console.log(event.target.value)
    setEditedAnnouncement(event.target.value)
  }
  const changeAnnouncement = async (event) => {
    console.log('changeAnnouncement', editedAnnouncement)
    event.preventDefault()
    const announcement = {
      message: editedAnnouncement
    }
    announcementService.createWithoutConcat(announcement)
  }
  return(

    <div>
    <form className="dashboard_form"onSubmit= {changeAnnouncement}>
      <input className="dashboard_announcement"
        value ={editedAnnouncement}
        onChange ={handleFieldChange}
      />
      <button className="dashboard_announcement_button" type= "submit">Update</button>
    </form>
    <UserList/>  
    </div>
  )
}

export default DashBoard
