import React, { useState } from 'react'
import moment from 'moment'

const Clock = () => {
  let initial = moment()
  let initialHour = initial.hour()
  let initialMinutes = initial.minute()
  initialMinutes = initialMinutes < 10 ? `0${initialMinutes}` : initialMinutes
  const [currentTime, setCurrentTime] = useState(`${initialHour}:${initialMinutes}`)

  setInterval(() => {
    let now = moment()
    let hour = now.hour()
    let minutes = now.minute()
    minutes = minutes < 10 ? `0${minutes}` : minutes

    setCurrentTime(`${hour}:${minutes}`)
  }, 1000)

  return (
    <div className="clock">
      {currentTime}
    </div>
  )
}

export default Clock