import React from 'react'

const Display = ({ dateobject, user, ownPage, free }) => {
  let date = new Date(dateobject)


  let dateDisplay
  let day = date.getDate()
  let month = date.getMonth() + 1
  if (date.getDate() < 10) {
    day = `0${date.getDate()}`
  }
  if (date.getMonth() + 1 < 10) {
    month = `0${date.getMonth() + 1}`
  }

  if (ownPage) {
    dateDisplay = `${day}.${month}.${date.getFullYear()}`
  }

  const userDisplay = user ? user.name : free ? "Free" : null

  if (date.getMinutes() < 10) {
    return (
      <h4>
        {dateDisplay} {`${date.getHours()}:0${date.getMinutes()}`} {userDisplay}{' '}
      </h4>
    )
  }
  return (
    <h4>
      {dateDisplay} {`${date.getHours()}:${date.getMinutes()}`} {userDisplay}
    </h4>
  )
}

export default Display
