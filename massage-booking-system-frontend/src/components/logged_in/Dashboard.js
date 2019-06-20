import React, { useContext, useState, Fragment } from 'react'
import DatePicker, { setDefaultLocale } from 'react-datepicker'
import UserList from './UserList'
import { NotificationContext, StretchContext } from '../../App'
import StretchAppointmentDisplay from './StretchingSession'
import "react-datepicker/dist/react-datepicker.css";
import fi from 'date-fns/locale/fi';
setDefaultLocale('fi', fi)

// CHANGE THIS TO USE HOOKS ETC
class DatePickerForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: new Date(),
    }
  }

  handleChange = (date) => {
    this.setState({ startDate: date })
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
      <Fragment>
        {/* Tämä tulee eriyttää omaan komponenttiin tuo divi */}
        {/* Tämä tulee eriyttää omaan komponenttiin tuo divi */}
        {/* Tämä tulee eriyttää omaan komponenttiin tuo divi */}
        <div>
          Next stretching session -->
        </div>
        <form onSubmit={this.createStretch}>
          <DatePicker
            showTimeSelect
            selected={startDate}
            onChange={this.handleChange}
            locale={fi}
          />
          <button type="submit">PAINA</button>
        </form >
      </Fragment>
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
      {/* Remove props when refactoring and move to useContext */}
      <DatePickerForm stretching={stretching} stretchingService={stretchingService} />
      <StretchAppointmentDisplay />
      <UserList />
    </div>
  )
}

export default DashBoard
