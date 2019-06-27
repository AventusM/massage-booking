const express = require('express')
const Appointment = require('../models/appointment')
const appointmentsRouter = express.Router()
const bodyParser = require('body-parser')
appointmentsRouter.use(bodyParser.json())

/**
 * Create appointments for the day given, starting from 8:55:00 .
 * firstShiftEnd = after the first 5 appointments in a row there is a break.
 * secondShiftStart = the 30 min intermission which marks the start of the next row of 8 appointments.
 * @param {*} date
 */
const generateAppointmentsForDay = date => {
  let firstShiftEnd = createAppointmentsInRow(new Date(date), 5)
  let secondShiftStart = increaseTime(30, new Date(firstShiftEnd))
  createAppointmentsInRow(secondShiftStart, 8)
}

/**
 * Creates 30min appointments in a row adding a 5 minute break between each appointment.
 * end = when the appointment will end.
 * @param {*} start time at the beginning of the appointment.
 * @param {*} appointmentsInRow how many appointments in a row
 */
const createAppointmentsInRow = (start, appointmentsInRow) => {
  let end = new Date(start)
  for (let i = 0; i < appointmentsInRow; i++) {
    end = increaseTime(30, new Date(start))
    createEmptyAppointment(start, end)
    start = increaseTime(5, new Date(end))
  }
  return end
}

/**
 * Logic for minute increase.
 * @param {*} minutes the amount of minutes you want the current time to increase.
 * @param {*} currentTime
 */
const increaseTime = (minutes, currentTime) => {
  let currentMinutes = currentTime.getMinutes() + minutes
  if (currentMinutes > 59) {
    currentTime.setHours(currentTime.getHours() + 1)
    currentMinutes = currentMinutes - 60
  }
  currentTime.setMinutes(currentMinutes)
  return currentTime
}

/**
 * start and end have to be turned into milliseconds by getTime() for the Database.
 * Checks if appointment exists
 */
const createEmptyAppointment = async (start_date, end_date) => {
  if (await doesAppointmentExist(new Date(start_date))) {
    const appointment = new Appointment({
      start_date: start_date.getTime(),
      end_date: end_date.getTime(),
      type_of_reservation: 0,
    })
    try {
      await appointment.save()
    } catch (exception) {
      console.log(exception)
    }
  }
}

/**
 * Checks if the appointment already exists in the database before creating it.
 * @param {*} date the starting time of the appointment
 */
const doesAppointmentExist = async date => {
  let doesNotExist = await Appointment.find({ start_date: date })
  if (doesNotExist.length === 0) {
    return true
  }
  return false
}

module.exports = {
  generateAppointmentsForDay,
  increaseTime,
  createAppointmentsInRow,
}
