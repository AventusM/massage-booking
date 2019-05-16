import React from 'react'

const Timelist = ({list}) => {

    const l = list.map(item => <li key={item.id}>{item.startTime}</li>)
    console.log('TimeList list', list)

    return (
        <ul>
            {l}
        </ul>
        
    )
}

export default Timelist