import React from 'react'


const Notification = ({ type,message,icon }) => {
 
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
