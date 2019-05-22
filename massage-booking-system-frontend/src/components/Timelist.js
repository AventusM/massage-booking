import React from 'react'
import AppointmentForm from './AppointmentForm'

const Timelist = ({list, user, setUser}) => {
    if (list.length === 0 ) {
        return <p>No appointments available for selected day</p>
    }

    const l = list.map(item => <li key={item.id} className='timelist'><AppointmentForm timeSlot={item} user={user} setUser={setUser}/> </li>)
    console.log('TimeList list', list)

    return (
        <ul>
            {l}
        </ul>
        
    )
}

export default Timelist