import React, { useContext } from 'react'
import { UserContext } from '../../App'

const User = props => {
  // Order depends on value prop in original provider (this one in App.js)
  //console.log('UserList.js props', props)
  const { user, userService } = useContext(UserContext)
  const { id, name, email, number, admin, banned, avatarUrl } = props

  const role = admin ? 'admin' : 'user'

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
          onClick={() =>
            userService.update(id, { admin: !admin, auth_id: user._id })
          }
        >
          {admin ? 'Remove Admin' : 'Make Admin'}
        </button>
      </td>
      <td>
        <button
          className="removeUserButton"
          onClick={() => userService.remove(id)}
        >
          REMOVE
        </button>
      </td>

      {/*}
        <div className="dashboard_user_item_actions">
          <p>Admin actions</p>
          <button onClick={() => userService.update(id, { admin: !admin, auth_id: user._id })}>
            {admin
              ? 'Remove Admin'
              : 'Create Admin'}
          </button>
          <button onClick={() => userService.update(id, { banned: !banned, auth_id: user._id })}>
            {banned
              ? 'Unban'
              : 'Ban'}
          </button>
          <button onClick={() => userService.remove(id)}>Remove</button>
        </div> 
        */}
    </tr>
  )
}

export default User
