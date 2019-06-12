import React from 'react'
import WeeksAppointments from './WeeksAppointments';

const TVview = ({users, appointments}) => {
    return (
        <WeeksAppointments users={users} appointments={appointments}/> 
    )
}

export default TVview