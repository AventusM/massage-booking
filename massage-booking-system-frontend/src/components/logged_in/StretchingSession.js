import React, { useContext, useState, useEffect } from 'react'
import { StretchContext, UserContext } from '../../App';

const StretchAppointmentDisplay = () => {
  //todo Use Effect
  const { stretching } = useContext(StretchContext)
  const {user} = useContext(UserContext) 
  let nextAppointment = null
  if (stretching.length > 0){
  const dateData = stretching[0].date
  console.log(dateData)
  nextAppointment = new Date(dateData).toDateString()
  }

  return (
    <div>
      {nextAppointment}
      <JoinStretchAppointment />
      <CancelStretchAppointment />
    </div>
  )
}

const JoinStretchAppointment = () => {
  const { stretchingService, stretching } = useContext(StretchContext)


  const joinSession = async () => {
    try {
      console.log('TRYING TO JOIN SESSION')
      await stretchingService.update(stretching[0]._id, { join: true })
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
  const { stretchingService, stretching } = useContext(StretchContext)
  const cancelSession = async () => {
    try {
      await stretchingService.update(stretching[0]._id, { join: false })
    } catch (exception) {

    }
  }
  return (
    <button onClick= {cancelSession}>CANCEL APPOINTMENT</button>
  )
}


export default StretchAppointmentDisplay