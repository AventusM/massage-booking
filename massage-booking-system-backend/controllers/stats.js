const express = require('express')
const statsRouter = express.Router()
const Appointment = require('../models/appointment')
const User = require('../models/user')
const bodyParser = require('body-parser')
const moment = require('moment')
statsRouter.use(bodyParser.json())

statsRouter.get('/', async (req, res, next) => {
  const appointments = await Appointment.find({})
  const users = await User.find({})

  // appointment stast

  let now = moment()

  let pastAppointments = appointments.filter(appointment => {
    let appointmentMoment = moment(appointment.start_date)

    return appointmentMoment.isBefore(now)
  })
  let numberOfPastAppointments = pastAppointments.length

  let unusedPastAppointments = pastAppointments.filter(
    appointment => appointment.type_of_reservation === 0
  )
  let numberOfUnusedPastAppointments = unusedPastAppointments.length

  // users stats
  let numberOfUsers = users.length
  let numberOfUsersAppointments = users.map(user => user.appointments.length)
  numberOfUsersAppointments.sort((a, b) => b - a) // sort in decending order
  let mostAppointmentsBySingleUser = numberOfUsersAppointments[0]

  let totalAppointmentsUsed = numberOfUsersAppointments.reduce(
    (accumulator, currentvalue) => accumulator + currentvalue
  )

  let statisticsToSend = {
    numberOfPastAppointments,
    numberOfUnusedPastAppointments,
    numberOfUsers,
    mostAppointmentsBySingleUser,
    totalAppointmentsUsed,
  }

  console.log('statics to send ', statisticsToSend)

  res.json(statisticsToSend)
})

module.exports = statsRouter
