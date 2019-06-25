import React, { useContext, useEffect, useState, Fragment } from 'react'
import { StretchContext, UserContext } from '../../App'
import useField from '../../hooks/useField'

const StretchAppointmentDisplay = () => {
  const { stretching } = useContext(StretchContext)
  const { user } = useContext(UserContext)
  const [loaded, setLoaded] = useState(false)
  const [appointmentData, setAppointmentData] = useState(null)

  useEffect(() => {
    if (stretching.length > 0 && user) {
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
  }, [stretching, user])

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
  return (
    <ul className="basic_helper">
      {sessions.map(session => {
        return (
          <SingleStretchingSession
            key={session._id}
            date={session.date}
            users={session.users}
          />
        )
      })}
    </ul>
  )
}

const StretchingSessionUser = (props) => {
  const { data, description } = props
  return (
    <li>
      {data.name}
      {description}
    </li>
  )
}

const SingleStretchingSession = (props) => {
  const { date, users } = props
  return (
    <li className="basic_helper">
      <div>when? {date}</div>
      <ul>
        {users.map(user => {
          return (
            <StretchingSessionUser
              key={user.data._id}
              data={user.data}
              description={user.description}
            />
          )
        })}
      </ul>
    </li>
  )
}

const JoinStretchAppointment = () => {
  const { stretchingService, stretching } = useContext(StretchContext)
  const description = useField('text')

  const slotsRemainingAmount = 10 - stretching[0].users.length
  const slotsRemainingText = `${slotsRemainingAmount} / 10 slots open`

  const joinSession = async () => {
    try {
      await stretchingService.update(stretching[0]._id, { join: true, description })
      // Add notification here for success on joining session
    } catch (exception) {
      // Add notification here for failure to join session
    }
  }
  return (
    <div>
      {slotsRemainingText}
      <Modal description={description} joinSession={joinSession} />
    </div>
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

const Modal = (props) => {
  const { joinSession, description } = props
  const [open, setOpen] = useState(false)

  const handleClose = (func) => {
    func()
    setOpen(false)
  }

  return (
    <Fragment>
      {!open &&
        <button onClick={() => setOpen(true)}>Join</button>}
      {open &&
        <div className="modal_wrapper">
          <div>
            <textarea value={description.value} onChange={description.handleFieldChange} rows='3' ></textarea>
          </div>
          <div>
            <button onClick={() => setOpen(false)} className="modal_cancel_button">Cancel</button>
            <button onClick={() => handleClose(joinSession)} className="modal_submit_button">Submit</button>
          </div>
        </div>}
    </Fragment>
  )
}


export default StretchAppointmentDisplay