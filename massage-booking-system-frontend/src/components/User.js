import React from 'react'

const User = ({ user }) => (
  <div>
    <div>
      name: {user.name}
      email: {user.email}
      number: {user.number}
    </div>
  </div>
)
export default User
