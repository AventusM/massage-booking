import React, { useContext, useEffect, useState, Fragment } from 'react'
import { StretchContext, UserContext, NotificationContext } from '../../App'
import DatePickerForm from '../DatePickerForm/DatePickerForm'
import SingleStretchingSession from '../StretchingSession/StretchingSession'
import Notification from '../Notification/Notification'

const StretchAppointmentDisplay = () => {
  const { stretching } = useContext(StretchContext)
  const { user } = useContext(UserContext)
  const [loaded, setLoaded] = useState(false)
  const { notification } = useContext( NotificationContext )

  useEffect(() => {
    if (user) {
      setLoaded(true)
    }
  }, [stretching, user])
  return (loaded &&
    <div className="stretchingPage_wrapper">
      {notification
        ? <Notification notification={notification} /> : null}
      {user.admin &&
        <div className="stretchingPage">
          <DatePickerForm />
          <hr />
        </div>
      }
      {stretching.length !== 0 ?
        <div><StretchingSessionList sessions={stretching} currentUsersStretchAppointments={user.stretchingSessions} userIsAdmin={user.admin}/></div> :
        <h1 id="no_upcoming_stretchings">No upcoming stretching sessions</h1>}
    </div>
  )

}

const StretchingSessionList = (props) => {
  const { sessions, currentUsersStretchAppointments, userIsAdmin } = props
  return (
    <div className ="stretching_header">
      <h1>Stretching appointments</h1>
      <h2 className="stretching_header_title">Click to reserve</h2>
      <ul className="stretchingPage">
        {sessions.map(session => {
          return (
            <SingleStretchingSession
              key={session._id}
              sessionID={session._id}
              date={session.date}
              users={session.users}
              currentUsersStretchAppointments={currentUsersStretchAppointments}
              userIsAdmin={userIsAdmin}
            />
          )
        })}
      </ul></div>
  )
}




export default StretchAppointmentDisplay