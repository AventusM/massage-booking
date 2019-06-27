import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../App'
import User from '../User/User'

const UserList = () => {
  const { users } = useContext(UserContext)
  const [filter, setFilter] = useState('')
  const [width, setWidth] = useState(window.innerWidth)

  const filteredUsers =
    filter === ''
      ? users
      : users.filter(user =>
        user.name.toLowerCase().includes(filter.toLowerCase())
      )

  const filterChange = event => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])

  const isMobile = width <= 1030

  if (!isMobile) {
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
  } else {
    return (
      <div className="dashboard_wrapper_mobile">
        <div className="user_search">
          <i className="fas fa-search" />
          <input value={filter} onChange={filterChange} placeholder="Search" />
        </div>
        <div className="user_list">
          <ul>
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
                  mobile={true}
                />
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default UserList
