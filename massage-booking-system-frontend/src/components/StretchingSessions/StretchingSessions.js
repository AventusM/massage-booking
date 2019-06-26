import React, { useContext, useEffect, useState, Fragment } from 'react'
import { StretchContext, UserContext } from '../../App'
import DatePickerForm from '../DatePickerForm/DatePickerForm'
import SingleStretchingSession from '../StretchingSession/StretchingSession'

const StretchAppointmentDisplay = () => {
  const { stretching } = useContext(StretchContext)
  const { user } = useContext(UserContext)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (user) {
      setLoaded(true)
    }
  }, [stretching, user])
  console.log('user, ', user)
  return (loaded &&
    <div className="stretchingPage_wrapper">
      {user.admin &&
        <div className="stretchingPage">
          <DatePickerForm />
        </div>
      }
      <div><StretchingSessionList sessions={stretching} currentUsersStretchAppointments={user.stretchingSessions} userIsAdmin={user.admin}/></div>
    </div>
  )
}

const StretchingSessionList = (props) => {
  const { sessions, currentUsersStretchAppointments, userIsAdmin } = props
  return (
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
    </ul>
  )
}




export default StretchAppointmentDisplay