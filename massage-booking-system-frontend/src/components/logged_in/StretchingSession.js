import React, { useContext, useState, useEffect } from 'react'
import { StretchContext } from '../../App';

const StretchAppointmentDisplay = () => {
  //todo Use Effect
  const { stretching } = useContext(StretchContext)
  // console.log(stretching)
  // const dateData = stretching[0].date
  // console.log(dateData)
  // const nextAppointment = new Date(dateData).toDateString()
  return (
    <div>
      <JoinStretchAppointment />
      <CancelStretchAppointment />
    </div>
  )
}

const JoinStretchAppointment = () => {
  const { stretchingService } = useContext(StretchContext)

  const joinSession = async () => {
    try {
      console.log('TRYING TO JOIN SESSION')
      await stretchingService.update('current', { join: true })
      // Add notification here for success on joining session
    } catch (exception) {
      // Add notification here for failure to join session
    }
  }
  return (
    <button onClick={joinSession}>JOIN APPOINTMENT</button>
  )
}

const CancelStretchAppointment = () => {
  const { stretchingService } = useContext(StretchContext)
  const cancelSession = async () => {
    try {
      await stretchingService.update('current', { join: false })
    } catch (exception) {

    }
  }
  return (
    <button onClick= {cancelSession}>CANCEL APPOINTMENT</button>
  )
}


export default StretchAppointmentDisplay