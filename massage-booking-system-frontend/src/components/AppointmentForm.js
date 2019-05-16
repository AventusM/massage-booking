import React from 'react'

const AppointmentForm = ({startTime}) => {
    const makeAppointment = () => {
       //event.preventDefault()
        //todo
    }

    return (
        <form onSubmit= {makeAppointment}>
            {startTime}

            <button type='submit'>Reserve</button>
        </form>
    )
}

export default AppointmentForm