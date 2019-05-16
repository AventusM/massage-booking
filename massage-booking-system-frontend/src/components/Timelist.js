import React from 'react'
import AppointmentForm from './AppointmentForm'

const Timelist = ({list}) => {

    const l = list.map(item => <li key={item.id}><AppointmentForm startTime={item.startTime}/> </li>)
    console.log('TimeList list', list)

    return (
        <ul>
            {l}
        </ul>
        
    )
}

export default Timelist