import React, { useContext, useState } from 'react'
import { UserContext, NotificationContext } from '../../App'

const User = props => {
  const { user, userService } = useContext(UserContext)
  const { createNotification } = useContext(NotificationContext)
  const { id, name, email, number, admin, avatarUrl } = props
  const [visibility, setVisibility] = useState('none')

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

  const divStyle = {
    display: {visibility},
  }

  return (
    <li>
      {avatarUrl ? (
        <img className="dashboard_profile_image" src={avatarUrl} alt="profile pic" />
      ) : (
        'avatar'
      )}{name}
      <div style={divStyle}>

      </div>
    </li>
  )
}


const UserListMobile = () => {
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
    <div className="dashboard_wrapper_mobile">
      <div className="user_search">
        <i className="fas fa-search" />
        <input value={filter} onChange={filterChange} placeholder="Search" />
      </div>
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
            />
          )
        })}
      </ul>
    </div>
  )
}

export default UserListMobile
