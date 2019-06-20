import React, { useContext, useState, useEffect } from 'react'
import { StretchContext } from '../../App';

const StretchAppointmentDisplay = () => {
  //todo Use Effect
  const { stretching } = useContext(StretchContext)
  console.log(stretching)
  const dateData = stretching[0].date
  console.log(dateData)
  const nextAppointment = new Date(dateData).toDateString()
  return (
    <div>
      {nextAppointment}
    </div>
  )
}

const JoinStretchAppointment = () => {
  const { stretchingService } = useContext(StretchContext)
  return (
    <button>JOIN APPOINTMENT</button>
  )
}

const CancelStretchAppointment = () => {
  const { stretchingService } = useContext(StretchContext)
  return (
    <button>CANCEL APPOINTMENT</button>
  )
}


export default StretchAppointmentDisplay