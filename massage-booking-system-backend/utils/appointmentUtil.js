const generator = require('./appointmentGenerator')
const Appointment = require('../models/appointment')
const User = require('../models/user')
const Stretch = require('../models/stretching')


/**
 *Removes appointment from user and removes user from appointment
 */
const removeAppointment = async (appointment) => {
  try {
    if (appointment.user_id !== null && appointment.user_id !== undefined) {
      const user = await User.findById({ _id: appointment.user_id })
      const appointmentsToKeep = user.appointments.filter(function (appoint) {
        if (appointment._id.stringify !== appoint.stringify) {
          return appoint
        }
      })
      user.appointments = appointmentsToKeep
      await User.findByIdAndUpdate(user._id, user)
    }
    appointment.user_id = null
    appointment.type_of_reservation = 3
    return await Appointment.findByIdAndUpdate(appointment._id, appointment, { new: true })
  } catch (exception) {
    console.log('removeAppointment exception', exception)
  }
}
const removeTwoAppointments = async (date) => {
  let firstDate = new Date(date)
  try {
    let firstAppointment = await Appointment.findOne({ start_date: firstDate })
    let secondDate = generator.increaseTime(35, firstDate)
    let secondAppointment = await Appointment.findOne({ start_date: secondDate })
    await removeAppointment(firstAppointment)
    await removeAppointment(secondAppointment)
  } catch (exception) {
    console.log('removeTwoAppointments exception', exception)
  }
}

const recoverTwoAppointments = async (date) => {
  const firstDate = new Date(date)
  try {
    const firstAppointment = await Appointment.findOne({ start_date: firstDate })
    const secondDate = generator.increaseTime(5, new Date(firstAppointment.end_date))
    const secondAppointment = await Appointment.findOne({ start_date: secondDate })

    firstAppointment.type_of_reservation = 0
    secondAppointment.type_of_reservation = 0

    await Appointment.findByIdAndUpdate(firstAppointment._id, firstAppointment)
    await Appointment.findByIdAndUpdate(secondAppointment._id, secondAppointment)
  } catch (exception) {
    console.log('recoverTwoAppointments exception', exception)
  }
}
const removeUserFromAppointment = async (appointment) => {
  try {
    appointment.user_id = null
    appointment.type_of_reservation = 0
    await Appointment.findByIdAndUpdate(appointment._id, appointment)
  } catch (exception) {
    console.log('removeUserFromAppointment exception', exception)
  }
}

const removeUserFromStretching = async (userId, stretchId) => {
  try {
    let stretch = await Stretch.findById(stretchId)
    let list = stretch.users.filter(participant => participant.data._id.toString() !== userId.toString())
    stretch.users = list
    await Stretch.findByIdAndUpdate(stretchId, stretch)
  } catch (exception) {
    console.log('removeUserFromStretching exception', exception)
  }
}

const removeStretchFromUser = async (userId, stretchId) => {
  try {
    let user = await User.findById(userId)
    let list = user.stretchingSessions.filter(stretch => stretch.stringify !== stretchId.stringify)
    user.stretchingSessions = list
    await User.findByIdAndUpdate(userId, user)
  } catch (exception) {
    console.log('removeStretchFromUser exception', exception)
  }
}

const isDateValid = async (date) => {
  let appointments = await Appointment.find({ start_date: date })
  let stretchings = await Stretch.find({ date: date })
  if (appointments.length === 0 || stretchings.length !== 0 || !areTimesValid(date) || await thereIsAStretchBeforeThisOne(date) || await thereIsAStretchAfterThisOne(date)) {
    return false
  }
  return true
}
const areTimesValid = (date) => {
  let compare = date.toISOString()
  if (compare.includes('11:15') || compare.includes('16:20')) {
    return false
  }
  return true
}

const thereIsAStretchBeforeThisOne = async (date) => {
  let oneBefore = decreaseTime(35, new Date(date))
  let beforeStretch = await Stretch.find({ date: oneBefore })
  if(beforeStretch.length === 0){
    return false
  }
  return true
}
const thereIsAStretchAfterThisOne = async (date) => {
  let oneAfter = generator.increaseTime(35, new Date(date))
  let beforeStretch = await Stretch.find({ date: oneAfter })
  if(beforeStretch.length === 0){
    return false
  }
  return true
}

const decreaseTime = (minutes, currentTime) => {
  let overflowMinutes = currentTime.getMinutes()
  currentTime.setMinutes(overflowMinutes - minutes)
  return currentTime
}


module.exports = { recoverTwoAppointments, removeTwoAppointments, removeAppointment, removeUserFromAppointment, removeStretchFromUser, removeUserFromStretching, isDateValid }