const express = require('express')
const statsRouter = express.Router()
const Appointment = require('../models/appointment')
const User = require('../models/user')
const bodyParser = require('body-parser')
const moment = require('moment')
statsRouter.use(bodyParser.json())

statsRouter.get('/', async (req, res, next) => {
  try {
    const appointments = await Appointment.find({})
    const users = await User.find({})
    let now = moment()

    // appointment stats

    /**
    * lists an array of all past appointments.
    */
    let pastAppointments = appointments.filter(appointment => {
      let appointmentMoment = moment(appointment.start_date)
      return appointmentMoment.isBefore(now, 'days')
    })
    let numberOfPastAppointments = pastAppointments.length

    /**
    * lists an array of all past unused appointments.
    */
    let unusedPastAppointments = pastAppointments.filter(
      appointment => appointment.type_of_reservation === 0
    )
    let numberOfUnusedPastAppointments = unusedPastAppointments.length

    // users stats
    let numberOfUsers = users.length

    /**
    * lists an array of users by their amount of appointments in decending order.
    */
    let numberOfUsersAppointments = users.map(user => user.appointments.length)
    numberOfUsersAppointments.sort((a, b) => b - a)

    let mostAppointmentsBySingleUser = numberOfUsersAppointments[0]

    let totalAppointmentsUsed = numberOfUsersAppointments.reduce(
      (accumulator, currentvalue) => accumulator + currentvalue
    )

    /**
    * users who have used massage
    */
    let usersWhoHaveUsedMassage = numberOfUsersAppointments.filter(count => count > 0).length

    let statisticsToSend = {
      numberOfPastAppointments,
      numberOfUnusedPastAppointments,
      numberOfUsers,
      mostAppointmentsBySingleUser,
      totalAppointmentsUsed,
      usersWhoHaveUsedMassage
    }
    res.json(statisticsToSend)
  } catch (exception) {
    next(exception)
  }

})

module.exports = statsRouter