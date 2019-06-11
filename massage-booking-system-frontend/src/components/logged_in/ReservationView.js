import React from 'react'
import Calendar from 'react-calendar'

const ReservationView = props => {
  return (
    <>
      <Calendar
        onChange={value => {
          console.log('value ', value, 'value type', typeof value)
        }}
        value={new Date()}
      />
    </>
  )
}

export default ReservationView
