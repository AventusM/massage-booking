import React, { useContext, useState, Fragment } from 'react'
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
      startDate: new Date(),
      next: null
    }
  }

  async componentDidMount() {
    const { stretchingService } = this.props
    const next_from_db = await stretchingService.getOne('/current')
    const next_time = next_from_db[0].date
    console.log('next time @', next_time)
    this.setState({
      next: new Date(next_time).toDateString()
    })
  }

  handleChange = (date) => {
    this.setState({ startDate: date })
  }

  createStretch = async (event) => {
    const { stretchingService } = this.props
    const { startDate } = this.state
    event.preventDefault()
    try {
      await stretchingService.setOne('/current', { date: startDate })
      this.setState({
        next: new Date(startDate).toDateString()
      })
      // Luo notifikaatio tänne onnistumisesta
    } catch (exception) {
      // Luo notifikaatio tänne failuresta
    }

  }

  render() {
    const { startDate, next } = this.state
    return (
      <Fragment>
        <div>
          Next stretching session --> {next}
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
      <DatePickerForm stretching={stretching} stretchingService={stretchingService} />

      <UserList />
    </div>
  )
}

export default DashBoard
