import React, { useContext, useState, Fragment } from 'react'
import { StretchContext } from '../../App'
import useField from '../../hooks/useField'

const StretchingSessionUser = (props) => {
  const { data, description } = props
  return (
    <li>
      {data.name} {description}
    </li>
  )
}

const SingleStretchingSession = (props) => {
  console.log('Single stretch session props ', props)
  const { date, users, sessionID, currentUsersStretchAppointments } = props

  const slotsUsed = users.length
  const slotsRemainingText = `${slotsUsed} / 10 slots used`

  return (
    <li className="basic_helper">
      <div>{prettyDateString(date)}</div>
      <ul>
        {users.map(user => {
          return (
            <StretchingSessionUser
              key={user._id}
              data={user.data ? user.data : ''}
              description={user.description}
            />
          )
        })}
      </ul>
      {slotsRemainingText}
      {currentUsersStretchAppointments.includes(sessionID) ?
        <CancelStretchAppointment sessionID={sessionID}/>
        :<JoinStretchAppointment sessionID={sessionID}/>
      }

    </li>
  )
}

const JoinStretchAppointment = (props) => {
  const { sessionID } = props
  const { stretchingService } = useContext(StretchContext)
  const description = useField('text')

  const joinSession = async () => {
    try {
      await stretchingService.update(sessionID, { join: true, description })
      // Add notification here for success on joining session
    } catch (exception) {
      // Add notification here for failure to join session
    }
  }
  return (
    <div>
      <Modal description={description} joinSession={joinSession} />
    </div>
  )
}

const CancelStretchAppointment = (props) => {
  const { sessionID } = props
  const { stretchingService } = useContext(StretchContext)
  const cancelSession = async () => {
    try {
      await stretchingService.update(sessionID, { join: false })
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

const prettyDateString = (dateToPretify) => {
  let date = new Date(dateToPretify)
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  return `${day}.${month}.${year} ${hours}:${minutes}`
}

export default SingleStretchingSession