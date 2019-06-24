import React, { useContext } from 'react'
import DatePicker from 'react-datepicker'
import UserList from '../UserList/UserList'
import { NotificationContext, StretchContext } from '../../App'
import StretchAppointmentDisplay from '../StretchingSession/StretchingSession'
import "react-datepicker/dist/react-datepicker.css";
import useField from '../../hooks/useField'
import Notification from '../Notification/Notification'

// CHANGE THIS TO USE HOOKS ETC
class DatePickerForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: new Date().setHours(8, 55, 0, 0)
    }
  }

  handleChange = async (date) => {
    await this.setState({ startDate: date })
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
            minTime={new Date().setHours(8, 55, 0, 0)}
            maxTime={new Date().setHours(15, 45, 0, 0)}
            //Dont let 11:15 or 16:20 since the lunch break is at 11:45 and 16:20 is the last appointment!
            injectTimes={[
              new Date().setHours(8, 55, 0, 0),
              new Date().setHours(9, 30, 0, 0),
              new Date().setHours(10, 5, 0, 0),
              new Date().setHours(10, 40, 0, 0),
              new Date().setHours(12, 15, 0, 0),
              new Date().setHours(12, 50, 0, 0),
              new Date().setHours(13, 25, 0, 0),
              new Date().setHours(14, 0, 0, 0),
              new Date().setHours(14, 35, 0, 0),
              new Date().setHours(15, 10, 0, 0),
              new Date().setHours(15, 45, 0, 0),
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
