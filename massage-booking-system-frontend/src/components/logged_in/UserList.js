import React, { useContext, useState } from 'react'
import { UserContext } from '../../App'
import User from './User'

const UserList = props => {
  const { users } = useContext(UserContext)
  const [filter, setFilter] = useState('')
  const filteredUsers =
    filter === ''
      ? users
      : users.filter(user =>
          user.name.toLowerCase().startsWith(filter.toLowerCase())
        )

  const filterChange = event => {
    setFilter(event.target.value)
  }
  return (
    <div className="dashboard_wrapper">
      <div className="overflowX">
        <div className="user_search">
          <i className="fas fa-search" />
          <input value={filter} onChange={filterChange} placeholder="Search" />
        </div>
        <table>
          <thead>
            <tr>
              <th />
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th>NUMBER</th>
              <th>MAKE ADMIN</th>
              <th>REMOVE</th>
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
