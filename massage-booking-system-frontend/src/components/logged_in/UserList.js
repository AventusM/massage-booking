import React, { useContext } from 'react'
import { UserContext } from '../../App'

const User = props => {
  // Order depends on value prop in original provider (this one in App.js)
  const currentUserContext = useContext(UserContext)
  const currentUser = currentUserContext.user
  const userService = currentUserContext.userService
  const { id, name, email, number } = props
  // console.log('logged in user', currentUser)
  return (
    <li>
      <div>Data for {name}</div>
      <p>Email: {email}</p>
      <p>Number: {number}</p>
      {currentUser.admin ? (
        <button onClick={() => userService.remove(id)}>REMOVE</button>
      ) : (
        <div>
          Temporary view shown that conditional operator works. Admin gets shown
          remove button instead of this text
        </div>
      )}
    </li>
  )
}

const UserList = props => {
  const currentUserContext = useContext(UserContext)
  const users = currentUserContext.users
  return (
    <ul>
      {users.map(user => {
        return (
          <User
            key={user._id}
            id={user._id}
            name={user.name}
            email={user.email}
            number={user.number}
          />
        )
      })}
    </ul>
  )
}

export default UserList
