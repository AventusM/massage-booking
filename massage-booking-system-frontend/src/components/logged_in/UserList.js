import React, { useContext, useState } from 'react'
import { UserContext } from '../../App'

const User = props => {
  // Order depends on value prop in original provider (this one in App.js)
  console.log('UserList.js props', props)
  const { user, userService } = useContext(UserContext)
  const { id, name, email, number, admin, banned, avatarUrl } = props

  console.log('user', user)
  return (
    <tr>
      <td>{avatarUrl ? <img src={user.avatarUrl} alt="profile pic" height="50" width="50"/> : 'avatar'}</td>
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
  const [filter, setFilter] = useState("")
  const filteredUsers = filter === "" ? users : users.filter(user => user.name.toLowerCase().startsWith(filter.toLowerCase()))

  const filterChange = (event) => {
    setFilter(event.target.value)
  }
  return (
    <div className="dashboard_wrapper">
      <div className="overflowX">
        <div className="user_search">
          <i class="fas fa-search"></i>
          <input value={filter} onChange={filterChange} placeholder="Search"></input>
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>NAME</th>
              <th>ROLE</th>
              <th>EMAIL</th>
              <th>NUMBER</th>
            </tr>
          </thead>
        <tbody>
          {filteredUsers.map(user => {
            return (
              <User
              key={user._id}
              id={user._id}
              name={user.name}
              email={user.email}
              number={user.number}
              admin={user.admin}
              banned={user.banned}
              avatarUrl={user.avatarUrl || null}
              />
            )
          })}
          </tbody>
          </table>
      </div>
      </div>
  )
}

export default UserList
