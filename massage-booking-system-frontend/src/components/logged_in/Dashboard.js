import React, { useContext, useState, Fragment } from 'react'
import DatePicker from 'react-datepicker'
import UserList from './UserList'
import { NotificationContext, StretchContext } from '../../App'
import StretchAppointmentDisplay from './StretchingSession'
import "react-datepicker/dist/react-datepicker.css";
import setMinutes from 'date-fns/setMinutes'
import setHours from 'date-fns/setHours'
import useField from '../../hooks/useField'
import Notification from '../Notification'


// CHANGE THIS TO USE HOOKS ETC
class DatePickerForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: setHours(setMinutes(new Date(), 55), 8)
    }
  }

  handleChange = (date) => {
    this.setState({ startDate: date })
    console.log('Date now?', this.state.startDate)
  }

  createStretch = async (event) => {
    const { stretchingService } = this.props
    const { startDate } = this.state
    event.preventDefault()
    try {
      await stretchingService.create({ date: startDate })
      // Luo notifikaatio tänne onnistumisesta
    } catch (exception) {
      // Luo notifikaatio tänne failuresta
    }
  }

  render() {
    const { startDate } = this.state
    const { stretching } = this.props
    return (
      <div className="basic_helper">
        <form onSubmit={this.createStretch}>
          <DatePicker
            showTimeSelect
            dateFormat="MMMM d, yyyy HH:mm"
            timeFormat="HH:mm"
            timeIntervals={9001}
            minDate={new Date()}
            minTime={setHours(setMinutes(new Date(), 55), 8)}
            maxTime={setHours(setMinutes(new Date(), 20), 16)}
            injectTimes={[
              setHours(setMinutes(new Date(), 55), 8),
              setHours(setMinutes(new Date(), 30), 9),
              setHours(setMinutes(new Date(), 5), 10),
              setHours(setMinutes(new Date(), 40), 10),
              setHours(setMinutes(new Date(), 15), 11),
              setHours(setMinutes(new Date(), 15), 12),
              setHours(setMinutes(new Date(), 50), 12),
              setHours(setMinutes(new Date(), 25), 13),
              setHours(setMinutes(new Date(), 0), 14),
              setHours(setMinutes(new Date(), 35), 14),
              setHours(setMinutes(new Date(), 10), 15),
              setHours(setMinutes(new Date(), 45), 15),
              setHours(setMinutes(new Date(), 20), 16),
            ]}
            selected={startDate}
            onChange={this.handleChange}
          />
          <button type="submit">PAINA</button>
        </form >
      </div>
    )
  }
}

const DashBoard = props => {
  const { announcementService, notification, announcementNotification } = useContext(NotificationContext)
  const { stretching, stretchingService } = useContext(StretchContext)
  console.log(stretching)
  let editedAnnouncement = useField('')

  const changeAnnouncement = async event => {
    event.preventDefault()
    console.log('changeAnnouncement', editedAnnouncement.value)
    const announcement = {
      message: editedAnnouncement.value
    }
    announcementService.createWithoutConcat(announcement)
  }

  return (
    <div>
      {notification
        ? <Notification notification={notification} />
        : <Notification notification={announcementNotification} />}
      <form className="dashboard_form" onSubmit={changeAnnouncement}>
        <input className="dashboard_announcement"
          value={editedAnnouncement.value}
          onChange={editedAnnouncement.handleFieldChange}
        />
        <button className="dashboard_announcement_button" type="submit">Update</button>
      </form>
      {/* Remove props when refactoring and move to useContext */}
      <DatePickerForm stretching={stretching} stretchingService={stretchingService} />
      <StretchAppointmentDisplay />
      <UserList />
    </div>
  )
}

export default DashBoard
