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

  return (loaded &&
    <Fragment>
      {user.admin &&
        <div className="basic_helper">
          <DatePickerForm />
        </div>
      }
      <div><StretchingSessionList sessions={stretching} currentUsersStretchAppointments={user.stretchingSessions}/></div>
    </Fragment>
  )
}

const StretchingSessionList = (props) => {
  const { sessions, currentUsersStretchAppointments } = props
  return (
    <ul className="basic_helper">
      {sessions.map(session => {
        return (
          <SingleStretchingSession
            key={session._id}
            sessionID={session._id}
            date={session.date}
            users={session.users}
            currentUsersStretchAppointments={currentUsersStretchAppointments}
          />
        )
      })}
    </ul>
  )
}




export default StretchAppointmentDisplay