import React from 'react'

const Toggleable = (props) => {

     console.log('toggleable props', props)
    
     const buttons = props.days.map(d => <button onClick={() => props.setDay(d)}>{d}</button>)

    return (
        <div>{buttons}</div>
    )
    
    }
export default Toggleable