import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error" class="alert alert-danger">
      {message}
    </div>
  )
}

export default Notification
