import React from 'react'

const Calender = (props) => {

    const c = props.times.map(time => <button>{time.startTime} </button>)
    return (
        <div>
            {c}
        </div>
    )
    
    }
export default Calender