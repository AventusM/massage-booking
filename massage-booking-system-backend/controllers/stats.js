const express = require('express')
const statsRouter = express.Router()
const Appointment = require('../models/appointment')
const User = require('../models/user')
const bodyParser = require('body-parser')
const moment = require('moment')
statsRouter.use(bodyParser.json())

statsRouter.post('/', async (req, res, next) => {
 const appointments = await Appointment.find({})
  const users = await User.find({})
  let startTime = req.body.startTime
  let endTime = req.body.endTime

  /**
   * If no end time is given stats will default to show 6 months ago.
   */
  if(endTime === null){
    endTime.subtract(6,'months')
  }

  /**
   * how many weeks are in the selected time area
   */
  let weeks = startTime.diff(endTime, 'weeks')
  

  // appointment stats

  /**
  * lists an array of all past appointments.
  */
  let pastAppointments = appointments.filter(appointment => {
    let appointmentMoment = moment(appointment.start_date)
    return appointmentMoment.isBetween(endTime, startTime)
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
   * not counting ghost appointments
   */
  let regularUserAppointments = pastAppointments.filter(
    appointment => appointment.type_of_reservation === 1
  )
  /**
   * not counting ghost appointments
   */
  let numberOfRegularUsersAppointments = reqularUserAppointments.map(user => user.appointments.length)

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
   * amount of users who use all their allowed massage times. NOTE! TEST THIS FOR ALL TIMES!!!!
   */
  let usersWhoUseEveryTwoWeeks = numberOfRegularUsersAppointments.filter(count => count >= (weeks/2))
  let amountOfUsersWhoGoEveryTwoWeeks = usersWhoUseEveryTwoWeeks.length
  let avarageOfUsersThatGoEveryTwoWeeks = amountOfUsersWhoGoEveryTwoWeeks / users.length

  /**
   * users who have used massage
   */
  let usersWhoHaveUsedMassage =  numberOfUsersAppointments.filter(count => count === 0)
  

  // Ghost appointment stats.
  /**
   * lists an array of used ghost appointments.
   */
  let ghostAppointments = pastAppointments.filter(
    appointment => appointment.type_of_reservation === 2
  )


  let statisticsToSend = {
    numberOfPastAppointments,
    numberOfUnusedPastAppointments,
    numberOfUsers,
    mostAppointmentsBySingleUser,
    totalAppointmentsUsed
  }

  console.log('statics to send ', statisticsToSend)

  res.json(statisticsToSend)

})

module.exports = statsRouter
