import React, { useContext, useEffect } from 'react'
import { StretchContext, UserContext } from '../../App';

const StretchAppointmentDisplay = () => {
  const { stretching } = useContext(StretchContext)
  const { user } = useContext(UserContext)

  let nextAppointment = null
  if (stretching.length > 0) {
    const dateData = stretching[0].date
    nextAppointment = new Date(dateData).toDateString()
  }

  return (nextAppointment &&
    <div>
      {nextAppointment}
      <JoinStretchAppointment />
      <CancelStretchAppointment />
    </div>
  )
}

const JoinStretchAppointment = () => {
  const { stretchingService, stretching } = useContext(StretchContext)
  const { user } = useContext(UserContext)

  const slotsRemainingAmount = 10 - stretching[0].users.length
  const slotsRemainingText = `${slotsRemainingAmount} / 10 slots open`

  const joinSession = async () => {
    try {
      await stretchingService.update(stretching[0]._id, { join: true })
      // Add notification here for success on joining session
    } catch (exception) {
      // Add notification here for failure to join session
    }
  }
  return (
    <button onClick={joinSession}>{slotsRemainingText}</button>
  )
}

const CancelStretchAppointment = () => {
  const { stretchingService, stretching } = useContext(StretchContext)
  const cancelSession = async () => {
    try {
      await stretchingService.update(stretching[0]._id, { join: false })
    } catch (exception) {

    }
  }
  return (
    <button onClick={cancelSession}>Cancel appointment</button>
  )
}


export default StretchAppointmentDisplay