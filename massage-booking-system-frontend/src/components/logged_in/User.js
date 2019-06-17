import React, { useContext } from 'react'
import { UserContext, NotificationContext } from '../../App'

const User = props => {
  const { user, userService } = useContext(UserContext)
  const { createNotification } = useContext(NotificationContext)
  const { id, name, email, number, admin, banned, avatarUrl } = props

  //console.log('id outside?', id)

  const role = admin ? 'admin' : 'user'
  const adminButtonToggleText = admin ? 'Remove Admin' : 'Make Admin'

  const toggleAdmin = async () => {
    try {
      await userService.update(id, { admin: !admin, auth_id: user._id })
      createNotification(`Users ${name} role has been changed`, 'success')
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

  return (
    <tr>
      <td>
        {avatarUrl ? (
          <img src={avatarUrl} alt="profile pic" height="50" width="50" />
        ) : (
            'avatar'
          )}
      </td>
      <td>{name} </td>
      <td>{email}</td>
      <td>{role}</td>
      {number ? <td>{number}</td> : <td>No number specified</td>}
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
