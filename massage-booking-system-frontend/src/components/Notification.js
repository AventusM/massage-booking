import React from 'react'


const Notification = (props) => {
    const { type, message, icon } = props

    return (message &&
        <div className="notification_container">
            <div className={`notification ${type}`}>
                <i className={`${icon}`} />
                <p>
                    {message}
                </p>
            </div>
        </div>
    )

}



export default Notification
