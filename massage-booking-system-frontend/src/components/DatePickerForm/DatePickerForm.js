import React, { useContext, useState } from 'react'
import DatePicker from 'react-datepicker'
import { StretchContext } from '../../App'
import 'react-datepicker/dist/react-datepicker.css'
import getDay from 'date-fns/getDay'

const DatePickerForm = () => {
  const [startDate, setStartDate] = useState(undefined)
  const { stretchingService } = useContext(StretchContext)

  const handleChange = (date) => {
    if (date.getHours() === 0 && date.getMinutes() === 0) {
      date.setHours(8, 55, 0, 0)
    }
    setStartDate(date)
  }

  const isMondayOrTuesday = (date) => {
    const day = getDay(date)
    return !(day !== 1 && day !== 2)
  }

  const createStretch = async (event) => {
    event.preventDefault()
    try {
      if (!isMondayOrTuesday(startDate)) return
      await stretchingService.create({ date: startDate })
      // Notification here of success
    } catch (exception) {
      // Notification here of failure
    }
  }

  return (
    <div className="basic_helper">
      <h1>Create a stretching appointment</h1>
      <h2>Select a date below</h2>

      <form className="datepicker_wrapper" onSubmit={createStretch}>
        <DatePicker
          placeholderText="Click to select"
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
          filterDate={isMondayOrTuesday}
        />
        {startDate === undefined
          ? <button disabled className="disabled_submit_button" type="submit">Create</button>
          : <button className="stretching_submit_button" type="submit">Create</button>
        }
      </form>
    </div>
  )
}

export default DatePickerForm