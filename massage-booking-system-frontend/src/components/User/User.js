import React, { useContext, useState } from 'react'
import { UserContext, NotificationContext } from '../../App'

const User = ({ id, name, email, number, admin, avatarUrl, mobile }) => {
  const { user, userService } = useContext(UserContext)
  const { createNotification } = useContext(NotificationContext)
  const [visibility, setVisibility] = useState('none')

  const role = admin ? 'admin' : 'user'
  const adminButtonToggleText = admin ? 'Remove Admin' : 'Make Admin'

  const toggleAdmin = async () => {
    try {
      await userService.update(id, { admin: !admin, auth_id: user._id })
      createNotification(`User's ${name} role has been changed`, 'success')
    } catch (exception) {
      createNotification(`Unable to change role for ${name}`)
    }
  }

  const removeUser = async (id) => {
    try {
      await userService.remove(id)
      createNotification(`User ${name} has been deleted`, 'success')
    } catch (exception) {
      createNotification(`Unable to delete ${name}`)
    }
  }

  const toggleVisibility = () => {
    const currentVisibility = visibility === 'none' ? null : 'none'
    setVisibility(currentVisibility)
  }

  if (mobile) {
    return (
      <div onClick={() => toggleVisibility()}>
        <div id="list_header">
          <img className="dashboard_profile_image" src={avatarUrl} alt="profile pic" />
          <h2>{name}</h2>
        </div>
        <div style={{ display: visibility }}>
          Email: {email} <br />
          Number: {number ? <span>{number}</span> : <span>No number specified</span>} <br />
          Role: {role} <br />
          <button
            className="makeAdminButton"
            onClick={() => toggleAdmin()}>
            {adminButtonToggleText}
          </button> <br />
          <button
            className="removeUserButton"
            onClick={() => removeUser(id)}>
            Remove
          </button>
        </div>
      </div>
    )
  }

  return (
    <tr>
      <td>
        {avatarUrl ? (
          <img className="dashboard_profile_image" src={avatarUrl} alt="profile pic" />
        ) : (
          'avatar'
        )}
      </td>
      <td>{name} </td>
      <td><a id="mail_link" href={`mailto:${email}`}>{email}</a></td>
      <td>{role}</td>
      {number ? <td><a id="phone_link" href={`tel:${number}`}>{number}</a></td> : <td>No number specified</td>}
      <td>
        <button
          className="makeAdminButton"
          onClick={() => toggleAdmin()}>
          {adminButtonToggleText}
        </button>
      </td>
      <td>
        <button
          className="removeUserButton"
          onClick={() => removeUser(id)}>
          Remove
        </button>
      </td>
    </tr>
  )
}

export default User
