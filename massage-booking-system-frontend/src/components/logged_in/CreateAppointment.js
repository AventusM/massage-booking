import React, { useContext } from 'react'
import moment from 'moment'
import { AppointmentContext, UserContext } from '../../App'
import Display from './Display'

const CreateAppointment = ({ id, start_date }) => {
  const { user } = useContext(UserContext)
  const { appointments, appointmentService, setErrorMessage } = useContext(
    AppointmentContext
  )

  const handleAppointmentCreation = () => {
    // Using user found from original state as it updates on appointment updates
    const foundUser = user
    // const foundUser = users.find(u => user._id === u._id)
    let appointmentStartDate = appointments.find(app => app._id === id)
      .start_date
    console.log(
      'voiko varata?',
      reservationRuleCheck(foundUser.appointments, appointmentStartDate)
    )
    // console.log(
    //   'reservation rule check result ',
    //   reservationRuleCheck(foundUser.appointments, appointmentStartDate)
    // )
    // console.log('tämän hetkisen käyttäjän ajat ', foundUser.appointments)
    // console.log(
    //   'tietokannasta tämän hetkisen käyttäjän idllä haetun käyttäjän ajat ',
    //   foundUser.appointments
    // )
    if (reservationRuleCheck(foundUser.appointments, appointmentStartDate)) {
      let setMessage = setErrorMessage
      appointmentService.update(id, {
        type_of_reservation: 1,
        user_id: foundUser._id,
      })
      setMessage('Appointment reserved successfully')
      setTimeout(() => {
        setMessage(null)
      }, 8000)
    } else {
      window.alert('You have already booked an appointment this week')
    }
  }

  return (
    <button onClick={() => handleAppointmentCreation()}>
      <Display dateobject={start_date} />
    </button>
  )
}

const reservationRuleCheck = (
  usersAppointments,
  requestedAppointmentStartDate
) => {
  //console.log('usersAppointments', usersAppointments, ' requestedAppointStartTime', requestedAppointmentStartDate)
  let requestedTimeMoment = moment(requestedAppointmentStartDate)
  let firstWeekDayOfrequestedTimesWeek = requestedTimeMoment.startOf('week')
  let usersAppointmentsWithinTheLastTwoWeeks = usersAppointments.filter(
    usersPreviousTime => {
      let prevTimeMoment = moment(usersPreviousTime.start_date)
      let firstWeekDayOfPrevtime = prevTimeMoment.startOf('week')
      let dayDifference = firstWeekDayOfrequestedTimesWeek.diff(
        firstWeekDayOfPrevtime,
        'days'
      )
      //console.log('prevtimeMoment ', prevTimeMoment, 'requestedTiemMoment', requestedTimeMoment)
      // console.log('usersAppointmentsWithinTheLastTwoWeeks ', usersAppointmentsWithinTheLastTwoWeeks, ' firstWeekDayOfPrevtime ', firstWeekDayOfPrevtime)
      //console.log('day diff', dayDifference)
      return Math.abs(dayDifference) < 14
    }
  )
  //console.log('usersAppointmentsWithinTheLastTwoWeeks after filter', usersAppointmentsWithinTheLastTwoWeeks)
  //console.log('usersAppointmentsWithinTheLastTwoWeeks.lenght', usersAppointmentsWithinTheLastTwoWeeks.length)
  return usersAppointmentsWithinTheLastTwoWeeks.length === 0
}

export default CreateAppointment
