import React, { useContext } from 'react'
import { UserContext } from '../../App'


const User = (props) => {
  // Order depends on value prop in original provider (this one in App.js)
  console.log('UserList.js props', props)
  const { user, userService } = useContext(UserContext)
  const { id, name, email, number, admin, banned } = props
  return (
    <li className="dashboard_user_item">
      <p className="dashboard_user_item_name">{name}</p>
      <p className="dashboard_user_item_email">{email}</p>

      {number
        ? <p className="dashboard_user_item_number">{number}</p>
        : <p>No number specified</p>}

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
    </li>
  )
}

const UserList = (props) => {
  const { users } = useContext(UserContext)
  return (
    <ul className="dashboard_user_list">
      {users.map(user => {
        return (
          <User key={user._id}
            id={user._id}
            name={user.name}
            email={user.email}
            number={user.number}
            admin={user.admin}
            banned={user.banned}
          />
        )
      })}
    </ul>

  )
}

export default UserList