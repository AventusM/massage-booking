const generator = require('./appointmentGenerator')
const Appointment = require('../models/appointment')

/**
   * Loops 5 and 3 weeks from (and including) the same week as the date given as a parameter.
   * Every loop increases the date by a week creating a newDate.
   * pickDays = picks the correct days from the week given as a date parameter.
   * @param {*} date starting date.
   */
const nextSixMonths = (date) => {
  for (let i = 0; i < 168; i += 7) {
    let newDate = new Date(date)
    pickDays(new Date(newDate.setDate(date.getDate() + i)))
  }
}
/**
   * Picks the days hard coded to the method (mon and tue), then attempts to create them.
   * ifNotInDBCreateDay = attempts to create appointments for the given day.
   * @param {*} date represents the week.
   */
const pickDays = async (date) => {
  let monday = setDay(1, new Date(date))
  let tuesday = setDay(2, new Date(date))
  await ifNotInDBCreateDay(new Date(monday))
  await ifNotInDBCreateDay(new Date(tuesday))
}

/**
   * finds the day given as a parameter from the week which is defined by the date given as a parameter and returns it.
   */
const setDay = (day, date) => {
  let today = date.getDay()
  if (today === day) {
    return date
  } else if (today < day) {
    day -= today
    return date.setDate(date.getDate() + day)
  }
  today -= day
  return date.setDate(date.getDate() - today)
}

/**
   * Checks if database contains appointments for the day (compares date given as a parameter that is formated to 16:50:00 time to appointments ending times in the database to find the last appointment of the day).
   * If a match is found the method doesnt do anything, else it will generate a day full of appointments by calling generator.
   * @param {*} date represents the day.
   */
const ifNotInDBCreateDay = async (date) => {
  date = formatTime(new Date(date))
  let checkup = new Date(date).setMinutes(475)
  let doesDayHaveAppointments = await Appointment.find({ end_date: checkup })
  if (doesDayHaveAppointments.length === 0 && date.toISOString().includes('08:55:00')) {
    await generator.generateAppointmentsForDay(new Date(date))
  } else {
    console.log('day has appointments in database or time is formatted wrong', date, ' checkup date: ', checkup)
  }
}

/**
 * formats any given date to the time 8:55:00.
 * @param {*} date the date to be formatted.
 */
const formatTime = (date) => {
  date.setUTCHours(8, 55, 0, 0)
  return date
}

module.exports = { formatTime, ifNotInDBCreateDay, nextSixMonths, pickDays, setDay }