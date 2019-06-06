import React, { useContext } from 'react'
import { UserContext } from '../../App'

const User = props => {
  // Order depends on value prop in original provider (this one in App.js)
  console.log('UserList.js props', props)
  const { user, userService } = useContext(UserContext)
  const { id, name, email, number, admin, banned } = props
  return (
    <tr>
      <td>avatar</td>
      <td>{name} </td>
      <td>{email}</td>
      <td>user</td>
      {number
          ? <td>{number}</td>
          : <td>No number specified</td>
      }
    

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

const UserList = (props) => {
  const { users } = useContext(UserContext)
  return (
    <div className="dashboard_wrapper">
    <div className="user_search">
    <i class="fas fa-search"></i>
    <input placeholder="Search"></input></div>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Role</th>
          <th>Email</th>
          <th>Number</th>
        </tr>
      </thead>
      <tbody>
      {users.map(user => {
        return (
          <User
            key={user._id}
            id={user._id}
            name={user.name}
            email={user.email}
            number={user.number}
            admin={user.admin}
            banned={user.banned}
          />
        )
      })}
    </tbody>
    </table>
    </div>
  )
}

export default UserList
