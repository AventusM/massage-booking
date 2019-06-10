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
    //console.log('appointmentTimeMoment', appointmentTimeMoment)

    if (appointmentTimeMoment.isBefore(now)) {
      // cant book past times
      console.log('Tried to book past date')
      return false
    }

    let appointmentsFirstDayOfTheWeek = appointmentTimeMoment.startOf('week')
    //console.log('first day of the week appoint is being booked in', appointmentsFirstDayOfTheWeek)

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

module.exports = userAllowedToMakeAppointment
