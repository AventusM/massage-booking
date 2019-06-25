import React, { useContext } from 'react'
import moment from 'moment'
import { AppointmentContext, UserContext, NotificationContext } from '../../App'
import Display from '../Display/Display'

const CreateAppointment = ({ id, start_date }) => {
  const { user } = useContext(UserContext)
  const { appointmentService } = useContext(AppointmentContext)
  const { createNotification } = useContext(NotificationContext)

  const handleAppointmentCreation = async () => {
    let ruleCheckResult = reservationRuleCheck(user.appointments, start_date)
    if (ruleCheckResult.allowed) {
      await appointmentService.update(id, { type_of_reservation: 1, user_id: user._id, })
      createNotification('Appointment reserved succesfully', 'success')
    } else {
      createNotification(ruleCheckResult.message)
    }
  }

  return (
    <button id={reservationRuleCheck(user.appointments, start_date).allowed ? 'available' : 'impossible'} onClick={() => handleAppointmentCreation()}>
      <Display dateobject={start_date} free={true} />
    </button>
  )
}

const reservationRuleCheck = (usersAppointments, requestedAppointmentStartDate) => {
  let result = {
    allowed: false,
    message: ''
  }
  let now = moment()
  let requestedTimeMoment = moment(requestedAppointmentStartDate)
  if (requestedTimeMoment.isBefore(now)) {
    result.message = 'Tried to book past appointment'
    return result
  }
  if (requestedTimeMoment.isSame(now, 'days')) {
    const usersAppointmentOnSameDay = usersAppointments.find((time) => {
      let timeMoment = moment(time.start_date)
      return timeMoment.isSame(now, 'day')
    })
    if (usersAppointmentOnSameDay) {
      result.message = 'You already have an appointment booked for today'
      return result
    }
    result.allowed = true
    return result
  } else {
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
    if (usersAppointmentsWithinTheLastTwoWeeks.length === 0) {
      result.allowed = true
      return result
    } else {
      result.message = 'You already have an appointment within a week of this appointment'
      return result
    }

  }
}

export default CreateAppointment
