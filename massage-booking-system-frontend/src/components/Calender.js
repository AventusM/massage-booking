import React from 'react'

const Calender = (props) => {
    console.log('Calender props', props)

    const daysappointments = props.times.filter(a => a.day === props.day && a.week === props.week)
    console.log('daysappointments', daysappointments)
    const appointmentsToShow = daysappointments.map(time => <button>{time.startTime} </button>)
    return (
        <div>
            {appointmentsToShow}
        </div>
    )
    
    }
export default Calender