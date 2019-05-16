import React from 'react'
import moment from 'moment'
import Toggleable from './Toggleable';

const Calendar = (props) => {
    console.log('calendar props', props)
    const weekdayshort = moment.weekdaysShort()

    const weekdayshortname = weekdayshort.map(day => {
        return (
          <th key={day} className="week-day">
           {day}
          </th>
        )
     })

     console.log('weekdaysshortname', weekdayshortname)


    let daysInMonth = 30
    let x = 1 
    const days = []
    while( x < daysInMonth) {
        days.concat(<td >{x}</td>)
        x += 1
    }
    console.log('days', days)

    const createRows = () => {

        const rows = [createRow(1),createRow(8),createRow(15),createRow(22)]
        return rows.map(row => <tr>{row}</tr>)


    }

    const createRow = (number) => {
        const row = [number, number +1, number+2, number +3, number +4, number +5, number +6] 

        return row.map(number => <td key={number}>{<Toggleable label={number} toDo={props.setDay} target={number}/>}</td>)
    }

    return (
      <div>
        <h2>Calendar</h2>
        <table>
            <thead>
            <tr>
                {weekdayshortname}
            </tr>
            </thead>
            <tbody>          
           
                {createRows()}
               
            
            </tbody>
            
        </table>
      </div>
    )
  }

/* const calendar = (props) => {
    console.log('calendar props', props)

    const daysappointments = props.times.filter(a => a.day === props.day && a.week === props.week)
    console.log('daysappointments', daysappointments)
    const appointmentsToShow = daysappointments.map(time => <button>{time.startTime} </button>)
    return (
        <div>
            {appointmentsToShow}
        </div>
    )
    
    } */
export default Calendar