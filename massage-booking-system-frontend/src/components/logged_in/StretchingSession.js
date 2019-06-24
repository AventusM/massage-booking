import React, { useContext, useEffect, useState, Fragment } from 'react'
import { StretchContext, UserContext } from '../../App'

const StretchAppointmentDisplay = () => {
  const { stretching } = useContext(StretchContext)
  const { user } = useContext(UserContext)
  const [loaded, setLoaded] = useState(false)
  const [appointmentData, setAppointmentData] = useState(null)

  useEffect(() => {
    if (stretching.length > 0) {
      setLoaded(true)
      if (user.admin) {
        setAppointmentData(stretching)
      } else if (!user.admin) {
        const dateData = new Date(stretching[0].date)
        let minuteAddition = ''
        // Fix for times such as 10:05 which output 10:5 without this
        if (dateData.getMinutes() < 10) {
          minuteAddition += '0'
        }
        setAppointmentData(`${dateData.toDateString()} at ${dateData.getHours()}:${minuteAddition}${dateData.getMinutes()}`)
      }
    }
  }, [stretching])

  if (!loaded) {
    return <div>Loading...</div>
  }
  return (loaded &&
    <Fragment>
      {!user.admin && <div className="basic_helper">{appointmentData}</div>}
      {user.admin && <StretchingSessionList sessions={stretching} />}

      {/* THIS IS ALSO FOR NON ADMIN!! */}
      {/* THIS IS ALSO FOR NON ADMIN!! */}
      {/* COMBINE THIS WITH UPPER !user.admin */}
      {/* COMBINE THIS WITH UPPER !user.admin */}
      <div className="basic_helper">
        <JoinStretchAppointment />
        <CancelStretchAppointment />
      </div>
    </Fragment>
  )
}

const StretchingSessionList = (props) => {
  const { sessions } = props
  console.log('sessions', sessions)
  return (
    <ul className="basic_helper">
      {sessions.map(session => {
        return (
          <SingleStretchingSession
            key={session._id}
            id={session._id}
            date={session.date}
            users={session.users}
          />
        )
      })}
    </ul>
  )
}

const SingleStretchingSession = (props) => {
  const { id, date, users } = props
  return (
    <li className="basic_helper">
      <div>id: {id}</div>
      <div>when? {date}</div>
      <ul>
        {users.map(user => {
          return(
            <li>
              {user.name}
            </li>
          )
        })}
      </ul>
    </li>
  )
}

const JoinStretchAppointment = () => {
  const { stretchingService, stretching } = useContext(StretchContext)
  const slotsRemainingAmount = 10 - stretching[0].users.length
  const slotsRemainingText = `${slotsRemainingAmount} / 10 slots open`

  const joinSession = async () => {
    try {
      await stretchingService.update(stretching[0]._id, { join: true })
      // Add notification here for success on joining session
    } catch (exception) {
      // Add notification here for failure to join session
    }
  }
  return (
    <button onClick={joinSession}>{slotsRemainingText}</button>
  )
}

const CancelStretchAppointment = () => {
  const { stretchingService, stretching } = useContext(StretchContext)
  const cancelSession = async () => {
    try {
      await stretchingService.update(stretching[0]._id, { join: false })
      // Add notification here for success on cancelling session
    } catch (exception) {
      // Add notification here for failure on cancelling session
    }
  }
  return (
    <button onClick={cancelSession}>Cancel appointment</button>
  )
}


export default StretchAppointmentDisplay