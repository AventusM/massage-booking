import React, { useContext, useState, Fragment } from 'react'
import { StretchContext } from '../../App'
import useField from '../../hooks/useField'

const StretchingSessionUser = (props) => {
  const { data, description } = props
  return (
    <li>
     <b>{data.name}:</b> 
      <br/>
      <i id = "description">{description}</i>
    </li>
  )
}

const SingleStretchingSession = (props) => {
  console.log('Single stretch session props ', props)
  const { date, users, sessionID, currentUsersStretchAppointments, userIsAdmin } = props
  const [visibility, setVisibility] = useState('none')

  const toggleVisibility = () => {
    const currentVisibility = visibility === 'none' ?  null : 'none'
    console.log(visibility)
    setVisibility(currentVisibility)
  }

  const slotsUsed = users.length
  const slotsRemainingText = `${slotsUsed} / 10 slots used `

  return (
  
    <li  className="stretchingList"> 
    {userIsAdmin && <DeleteStretchSession sessionID={sessionID}/>}
    <div className="stretching_time">{prettyDateString(date)} </div>   
      <h2 onClick={() => toggleVisibility()}>Attendees &nbsp; {visibility === null ? <i id="up_arrow" class="fas fa-chevron-up"></i> : <i id="down_arrow" class="fas fa-chevron-down"></i>}</h2>
      
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
    <div>
    <button className="cancel_button" onClick={cancelSession}>Cancel</button></div>
  )
}

const DeleteStretchSession = (props) => {
  const { sessionID } = props
  const { stretchingService } = useContext(StretchContext)

  const deleteSession = async () => {
    try {
      await stretchingService.remove(sessionID)
      // Add notification here for sdeleting session, note that 2 appointmebnts are restored
    } catch (exception) {
      // Add notification here?
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
        <button className="join_button"onClick={() => setOpen(true)}>Join</button>}
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