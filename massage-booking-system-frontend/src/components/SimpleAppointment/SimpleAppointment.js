import React from 'react'
import Display from '../Display/Display'


const SimpleAppointment = props => {
  const { start_date, type_of_reservation, appUser } = props

  return (
    <div className="cont">
      {type_of_reservation === 1 ?
        <button
          id="reserved">
          <Display dateobject={start_date} user={appUser} />
        </button>
        : (type_of_reservation === 0
          ? <button id='available'>
            <Display dateobject={start_date} free={true} />
          </button>
          : null
        )}
    </div>
  )
}

export default SimpleAppointment