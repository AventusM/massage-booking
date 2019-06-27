import React, { useContext, useState, Fragment } from 'react'
import { StretchContext, NotificationContext } from '../../App'
import useField from '../../hooks/useField'

const StretchingSessionUser = (props) => {
  const { data, description } = props
  return (
    <li>
      <b>{data.name}:</b>
      <br />
      <i id="description">{description}</i>
    </li>
  )
}

const SingleStretchingSession = (props) => {
  const { date, users, sessionID, currentUsersStretchAppointments, userIsAdmin } = props
  const [visibility, setVisibility] = useState('none')

  const toggleVisibility = () => {

    const currentVisibility = visibility === 'none' ?  null : 'none'
    setVisibility(currentVisibility)
  }

  const slotsUsed = users.length
  const slotsRemainingText = `${slotsUsed} / 10 slots used `

  return (

    <li className="stretchingList">
      {userIsAdmin && <DeleteStretchSession date={date} sessionID={sessionID} />}
      <div className="stretching_time">{prettyDateString(date)} </div>
      <h2 className="stretching_header_time" onClick={() => toggleVisibility()}>Attendees &nbsp; {visibility === null ? <i id="up_arrow" className="fas fa-chevron-up"></i> : <i id="down_arrow" className="fas fa-chevron-down"></i>}</h2>

      <div className="attendees_list" style={{ display: visibility }}>
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
      </div>
      {slotsRemainingText}
      {currentUsersStretchAppointments.includes(sessionID) ?
        <CancelStretchAppointment sessionID={sessionID} />
        : <JoinStretchAppointment sessionID={sessionID} />
      }

    </li>

  )
}

const JoinStretchAppointment = (props) => {
  const { sessionID } = props
  const { stretchingService } = useContext(StretchContext)
  const { createNotification } = useContext(NotificationContext)
  const description = useField('text')

  const joinSession = async () => {
    try {
      await stretchingService.update(sessionID, { join: true, description })
      createNotification('Joined succesfully', 'success')
    } catch (exception) {
      createNotification('Unable to join')
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
  const { createNotification } = useContext(NotificationContext)

  const cancelSession = async () => {
    try {
      await stretchingService.update(sessionID, { join: false })
      createNotification('Reservation cancelled succesfully', 'success')
    } catch (exception) {
      createNotification('Unable to cancel')
    }
  }
  return (
    <div>
      <button className="cancel_button" onClick={cancelSession}>Cancel</button></div>
  )
}

const DeleteStretchSession = (props) => {
  const { date, sessionID } = props
  const { stretchingService } = useContext(StretchContext)
  const { createNotification } = useContext(NotificationContext)

  const deleteSession = async () => {
    try {
      await stretchingService.remove(sessionID)

      let dateData = new Date(date)
      let minuteAddition = ''
      // Fix situations like 10:05 where notification would display 10:5
      if (dateData.getMinutes() < 10) {
        minuteAddition += '0'
      }
      createNotification(`Reservation on ${dateData.toDateString()} has been removed successfully! Two appointments beginning from ${dateData.getUTCHours()}:${minuteAddition}${dateData.getMinutes()} have been restored!`, 'success', 8)
    } catch (exception) {
      createNotification(`${exception}`)
    }
  }

  return (
    <div className="delete_stretching">
      <button className="far fa-trash-alt" onClick={deleteSession}></button>
    </div>
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
        <button className="join_button" onClick={() => setOpen(true)}>Join</button>}
      {open &&
        <div className="modal_wrapper">
          <div>
            <textarea placeholder="Describe problem areas" value={description.value} onChange={description.handleFieldChange} rows='3' ></textarea>
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

  // fix timezone offset
  let minutes = date.getMinutes()
  let time = date.getTimezoneOffset()
  date.setMinutes(minutes + time)

  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let hours = date.getHours()
  minutes = date.getMinutes()
  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  return `${day}.${month}.${year} ${hours}:${minutes}`
}

export default SingleStretchingSession