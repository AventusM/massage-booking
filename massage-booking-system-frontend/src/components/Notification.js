import React from 'react'


const Notification = (props) => {
    const {type, message, icon} = props
 console.log('NOTIFICATION PROPS', message)
    if (message === null) {
        return null
    } 

    return (
        <div className={`notification ${type}`}>
        <i class= { `${icon}`}/>
        <p className= "scale-in-center" >
            {message}
        </p>
        </div>
    )

}



export default Notification
