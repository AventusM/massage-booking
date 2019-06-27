import React from 'react'

const Display = ({ dateobject, user, ownPage, free, removed, cancel }) => {
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

  const clickCancel = cancel ? <span id="cancel_text">Click to cancel</span> : null

  const userDisplay = user ? user.name : free ? <span>Free</span> : null
  const remove = removed ? <span>Removed</span> : null

  if (date.getMinutes() < 10) {
    return (
      <h4 className="own_appointment" >
        {dateDisplay} {`${date.getHours()}:0${date.getMinutes()}`} {userDisplay} {remove} {clickCancel}
      </h4>
      
  
    )
  }    
  return (
    < h4 className="own_appointment" >
      {dateDisplay} {`${date.getHours()}:${date.getMinutes()}`} {userDisplay} {remove} {clickCancel}
    </h4 >
  )
}

export default Display
