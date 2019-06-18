import React, { useContext } from 'react'
import moment from 'moment'
import { AppointmentContext, UserContext, NotificationContext } from '../../App'
import Display from './Display'

const CreateAppointment = ({ id, start_date }) => {
  const { user } = useContext(UserContext)
  const { appointments, appointmentService, setErrorMessage } = useContext(AppointmentContext)
  const { createNotification } = useContext(NotificationContext)

  const handleAppointmentCreation = async () => {
    const foundUser = user
    let appointmentStartDate = appointments.find(app => app._id === id).start_date
    // console.log('voiko varata?', reservationRuleCheck(foundUser.appointments, appointmentStartDate))
    if (reservationRuleCheck(foundUser.appointments, appointmentStartDate)) {
      await appointmentService.update(id, { type_of_reservation: 1, user_id: foundUser._id, })
      createNotification('Appointment reserved succesfully', 'success')
    } else {
      createNotification('You have already booked an appointment this week')
    }
  }

  return (
    <button onClick={() => handleAppointmentCreation()}>
      <Display dateobject={start_date} free={true} />
    </button>
  )
}

const reservationRuleCheck = (usersAppointments, requestedAppointmentStartDate) => {
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
      return Math.abs(dayDifference) < 14
    }
  )
  return usersAppointmentsWithinTheLastTwoWeeks.length === 0
}

export default CreateAppointment
