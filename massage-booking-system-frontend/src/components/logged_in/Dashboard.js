import React, { useContext, useState } from 'react'
import DatePicker, { setDefaultLocale } from 'react-datepicker'
import UserList from './UserList'
import { NotificationContext, StretchContext } from '../../App'
import "react-datepicker/dist/react-datepicker.css";
import fi from 'date-fns/locale/fi';
setDefaultLocale('fi', fi)

// CHANGE THIS TO USE HOOKS ETC
class DatePickerForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: new Date()
    }
  }

  handleChange = (date) => {
    this.setState({ startDate: date })
  }

  createStretch = (event) => {
    const { stretchingService } = this.props
    const { startDate } = this.state
    event.preventDefault()
    console.log('DATA TO BE SENT', startDate)
    stretchingService.setOne('/current', { day: startDate.toLocaleDateString() })

  }

  render() {
    const { startDate } = this.state
    return (
      <form onSubmit={this.createStretch}>
        <DatePicker
          showTimeSelect
          selected={startDate}
          onChange={this.handleChange}
          locale={fi}
        />
        <button type="submit">PAINA</button>
      </form >
    )
  }
}

const DashBoard = props => {
  const { announcement, setAnnouncement } = useContext(NotificationContext)
  const { stretching, stretchingService } = useContext(StretchContext)
  const [editedAnnouncement, setEditedAnnouncement] = useState('')

  const handleFieldChange = (event) => {
    console.log(event.target.value)
    setEditedAnnouncement(event.target.value)
  }
  const changeAnnouncement = (event) => {
    console.log('changeAnnouncement', editedAnnouncement)
    event.preventDefault()
    setAnnouncement(editedAnnouncement)
  }

  return (
    <div>
      <form className="dashboard_form" onSubmit={changeAnnouncement}>
        <input className="dashboard_announcement"
          value={editedAnnouncement}
          onChange={handleFieldChange}
        />
        <button className="dashboard_announcement_button" type="submit">Update</button>
      </form>
      <DatePickerForm stretching={stretching} stretchingService={stretchingService} />
      <UserList />
    </div>
  )
}

export default DashBoard
