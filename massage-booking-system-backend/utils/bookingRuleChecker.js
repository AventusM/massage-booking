const Appointment = require('../models/appointment')
const moment = require('moment')

const userAllowedToMakeAppointment = async (
  usersAppointmentList,
  requestedAppointmentID
) => {
  try {
    const appointment = await Appointment.findById(requestedAppointmentID)
    let usersPreviousMassageTimes = usersAppointmentList.map(
      appointment => appointment.start_date
    )
    //console.log('users appointment history ', usersPreviousMassageTimes)

    let now = moment()
    let appointmentTimeMoment = moment(appointment.start_date)
    let appointmentsFirstDayOfTheWeek = appointmentTimeMoment.startOf('week')
    //console.log('first day of the week appoint is being booked in', appointmentsFirstDayOfTheWeek)
    //console.log('appointmentTimeMoment', appointmentTimeMoment)

    /*  Checks that requested appointment is in the future. Cant book past appointments */
    if (appointmentTimeMoment.isBefore(now)) {
      console.log('Tried to book past date')
      return false
    }

    /*  Checks that requested appointment is no more tha six weeks away. Appointments can be made 6 weeks in advance. */
    let startOfThisWeek = now.startOf('week')
    let sixWeeksFromNow = startOfThisWeek.add( 42, 'days') 
    if(appointmentsFirstDayOfTheWeek.isAfter(sixWeeksFromNow)) {
      console.log('cant book appointments more than 6 weeks away')
      return false
    }

    /* Filter previous appointments, leaving only ones that make  are within two week of requested appointment i.e if filtered list is not emptpy appointment cant be made.
        Use first day of the week of appoibntment rather than day itself to allow booking monday appointments when last apooint was 2 weeks ago on tuesday*/
    usersPreviousMassageTimes = usersPreviousMassageTimes.filter(prevTime => {
      let prevTimeMoment = moment(prevTime)
      let prevTimeStartOfWeek = prevTimeMoment.startOf('week')
      //console.log('prevTime StartOf week', prevTimeStartOfWeek)

      let dayDifference = appointmentsFirstDayOfTheWeek.diff(
        prevTimeStartOfWeek,
        'days'
      )

      //console.log('day difference', dayDifference)
      return Math.abs(dayDifference) < 14
    })

    //console.log('users appointmentList', usersPreviousMassageTimes)
    //console.log('requested appointment', appointment)
    //console.log('appointments less than 2 weeks ago', usersPreviousMassageTimes.length)
    return usersPreviousMassageTimes.length === 0
  } catch (error) {
    console.log('error in rule checker', error)
  }
}

const userAllowedtoCancelAppointment = async (userID, appointmentID) => {
  const appointment = await Appointment.findById(appointmentID)
  //console.log('userAllowedToCancelAppointment', (String(userID) === String(appointment.user_id)))
  return String(userID) === String(appointment.user_id)
}

module.exports = {userAllowedToMakeAppointment, userAllowedtoCancelAppointment}
