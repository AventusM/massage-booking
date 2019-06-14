import React, {useContext, useState} from 'react'
import UserList from './UserList'
import {NotificationContext} from '../../App'

const DashBoard = props => {
  const {announcement, setAnnouncement} = useContext(NotificationContext)
  const [editedAnnouncement, setEditedAnnouncement] = useState()
  const handleFieldChange = (event) => {
    console.log(event.target.value)
    setEditedAnnouncement(event.target.value)
  }
  const changeAnnouncement = (event) => {
    console.log('changeAnnouncement', editedAnnouncement)
    event.preventDefault()
    setAnnouncement(editedAnnouncement)
  }
  return(
    <div>
    <form onSubmit= {changeAnnouncement}>
      <input
        value ={editedAnnouncement}
        onChange ={handleFieldChange}
      />
      <button type= "submit">Update</button>
    </form>
    <UserList />  
    </div>
  )
}

export default DashBoard
