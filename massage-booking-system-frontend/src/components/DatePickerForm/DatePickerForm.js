import React, { useContext, useState } from 'react'
import DatePicker from 'react-datepicker'
import { StretchContext } from '../../App'
import 'react-datepicker/dist/react-datepicker.css'

// TODO  -- MAKE USE OF THIS NOTIFICATION
import Notification from '../Notification/Notification'

const DatePickerForm = () => {
  const [startDate, setStartDate] = useState(new Date().setHours(8, 55, 0, 0))
  const { stretchingService } = useContext(StretchContext)

  const handleChange = async (date) => {
    try {
      await setStartDate(date)
      console.log('Date now?', startDate)
    } catch (exception) {
      console.log('failed')
    }
  }

  const createStretch = async (event) => {
    event.preventDefault()
    try {
      await stretchingService.create({ date: startDate })
      // Notification here of success
    } catch (exception) {
      // Notification here of failure
    }
  }

  return (
    <div className="basic_helper">
      <form onSubmit={createStretch}>
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
          onChange={handleChange}
        />
        <button type="submit">PRESS THIS TO CREATE</button>
      </form>
    </div>
  )
}

export default DatePickerForm