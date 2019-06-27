const moment = require('moment')

const userAllowedToMakeAppointment = async (
  usersAppointmentList,
  appointment
) => {
  try {
    let usersPreviousMassageTimes = usersAppointmentList.map(
      app => app.start_date
    )
    let now = moment()

    //fix timezone difference from db
    let date = new Date(appointment.start_date)
    let minutes = date.getMinutes()
    let time = date.getTimezoneOffset()
    date.setMinutes(minutes + time)

    let appointmentTimeMoment = moment(date)
    /*  Checks that requested appointment is in the future. Cant book past appointments */
    if (appointmentTimeMoment.isBefore(now)) {
      return false
    }

    if (appointmentTimeMoment.isSame(now, 'days')) { // appointments can be booked by anyone on the day of the appointment proided they dont already have an appointment that day
      const usersAppointmentOnSameDay = usersPreviousMassageTimes.find((time) => {
        let timeMoment = moment(time)
        return timeMoment.isSame(appointmentTimeMoment, 'days')
      })
      if (usersAppointmentOnSameDay) {
        return false
      }
      return true
    } else {
      let appointmentsFirstDayOfTheWeek = appointmentTimeMoment.startOf('week') // note that this also modifies apppointmentTimeMoment
      /*  Checks that requested appointment is no more tha six weeks away. Appointments can be made 6 weeks in advance. */
      let startOfThisWeek = now.startOf('week')
      let sixWeeksFromNow = startOfThisWeek.add(42, 'days')
      if (appointmentsFirstDayOfTheWeek.isAfter(sixWeeksFromNow)) {
        return false
      }

      /* Filter previous appointments, leaving only ones that make  are within two week of requested appointment i.e if filtered list is not emptpy appointment cant be made.
        Use first day of the week of appoibntment rather than day itself to allow booking monday appointments when last apooint was 2 weeks ago on tuesday*/
      usersPreviousMassageTimes = usersPreviousMassageTimes.filter(prevTime => {
        let prevTimeMoment = moment(prevTime)
        let prevTimeStartOfWeek = prevTimeMoment.startOf('week')
        let dayDifference = appointmentsFirstDayOfTheWeek.diff(
          prevTimeStartOfWeek,
          'days'
        )
        return Math.abs(dayDifference) < 14
      })

      return usersPreviousMassageTimes.length === 0
    }

  } catch (error) {
    console.log('error in rule checker', error)
  }
}

const userAllowedtoCancelAppointment = async (userID, appointment) => {
  return String(userID) === String(appointment.user_id)
}

module.exports = { userAllowedToMakeAppointment, userAllowedtoCancelAppointment }
