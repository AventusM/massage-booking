import React, { useContext, useState, useEffect } from 'react'
import { StretchContext } from '../../App';

const StretchAppointmentDisplay = () => {
  const { stretching } = useContext(StretchContext)
  return (
    <div>

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