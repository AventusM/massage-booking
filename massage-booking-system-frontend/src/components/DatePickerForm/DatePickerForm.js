import React, { useContext, useState } from 'react'
import DatePicker from 'react-datepicker'
import { StretchContext, NotificationContext } from '../../App'
import 'react-datepicker/dist/react-datepicker.css'
import getDay from 'date-fns/getDay'
import addDays from 'date-fns/addDays'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

const DatePickerForm = () => {
  const [startDate, setStartDate] = useState(new Date().setHours(8, 55, 0, 0))
  const { stretchingService } = useContext(StretchContext)
  const { createNotification } = useContext(NotificationContext)

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
    if (!isMondayOrTuesday(startDate)) return

    let minuteAddition = ''
    // Fix situations like 10:05 where notification would display 10:5
    if (startDate.getMinutes() < 10) {
      minuteAddition += '0'
    }

    confirmAlert({
      message: `Are you sure you want to disable two appointments beginning on ${startDate.getHours()}:${minuteAddition}${startDate.getMinutes()} on ${startDate.toDateString()} to accommodate for the stretching session? `,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await stretchingService.create({ date: startDate })

              createNotification(`Successfully created a stretching session on ${startDate.toDateString()}! Two appointments beginning from ${startDate.getHours()}:${minuteAddition}${startDate.getMinutes()} have been disabled to accommodate`, 'success', 8)
            } catch (exception) {
              createNotification('Unable to create session')
            }
          }
        },
        {
          label: 'No',
        }
      ]
    })

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
          maxDate={addDays(new Date(), 120)}
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