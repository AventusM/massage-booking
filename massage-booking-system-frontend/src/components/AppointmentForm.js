import React from 'react'

const AppointmentForm = ({timeSlot}) => {
    const makeAppointment = () => {
       //event.preventDefault()
        //todo
        return window.confirm(`Ar ye sure matey? Reserve massage at ${timeSlot.startTime}?`)
    }
    
    return (
        <form onSubmit= {makeAppointment}>
            {timeSlot.startTime}

            <button type='submit' className='timelist_button'>Reserve</button>
        </form>
    )
}

export default AppointmentForm