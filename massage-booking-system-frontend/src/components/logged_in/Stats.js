import React, { Fragment } from 'react'

const Stats = (props) => {
    const stats = props.stats
    console.log('stats', stats)
    let numberOfUnusedPastAppointments = stats.numberOfUnusedPastAppointments
    let numberOfPastAppointments = stats.numberOfPastAppointments
    let numberOfUsers = stats.numberOfUsers
    let totalAppointmentsUsed = stats.totalAppointmentsUsed
    let mostAppointmentsBySingleUser = stats.mostAppointmentsBySingleUser

    console.log('past ', numberOfPastAppointments, 'unused ', numberOfUnusedPastAppointments)
    return (
        <Fragment>
            <h1>Stats</h1>
            <p>{` ${(numberOfUnusedPastAppointments / numberOfPastAppointments * 100).toFixed(1)} % of possible appointments went unused`} </p>
            <p>{`Number of users ${numberOfUsers}`}</p>
            <p>{`Average appointments per user ${(totalAppointmentsUsed / numberOfUsers).toFixed(2)}`}</p>
            <p>{`Most appointments by single user  ${mostAppointmentsBySingleUser}`}</p>
            
        </Fragment>
    )
}

export default Stats