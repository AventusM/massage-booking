import React from 'react'

const Toggleable = (props) => {

     //console.log('toggleable props', props)
    
     // const buttons = props.days.map(d => <button onClick={() => props.setDay(d.day)}>{d.day}</button>)
     const asd = () => {
        props.toDo(props.target)
     }
     
    return (

        <button onClick={asd}>{props.label}</button>
    )
    
    }
export default Toggleable