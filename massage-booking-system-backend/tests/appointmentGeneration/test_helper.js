const Appointment = require('../../models/appointment')
const User = require('../../models/user')
const generator = require('../../utils/appointmentGenerator')
/**
 * sends an array for some reson. (not currently in use).

const howManyAppointmentsAreInDB = async () => {
  const response = await Appointment.find()
  let size = response.length
  return size
}*/
/**
 * empties the database and makes sure the database is truly empty by waiting in a loop (100ms) to make sure there is no data being written to it.
 * IF TESTS FAIL INCREASE THE SLEEP TIME VALUE INSIDE THE LOOP!
 */
const emptyTheDatabaseOfAppointments = async () => {
  await sleep(50)
  let response = await Appointment.find()
  while (response.length !== 0) {
    await Appointment.deleteMany({})
    await sleep(100)
    response = await Appointment.find()
    //await console.log('how many appointments in the database (loop ends when 0)', response.length)
  }

}
const emptyTheDatabaseOfUsers = async () => {
  await sleep(50)
  let response = await Appointment.find()
  while (response.length !== 0) {
    await User.deleteMany({})
    await sleep(100)
    response = await User.find()
    //await console.log('how many users in the database (loop ends when 0)', response.length)
  }

}

/**
 * waits for given time in milliseconds.
 * @param {*} time amount in milliseconds.
 */
async function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
/**
 * Waits in a loop of 50 milliseconds to see wether the data has been written to the database. if time exeeds 1 second or the data goes over the expected amount the loop will end.
 * @param {*} howMany how many appointments are expected to be in the database.
 */
const wait = async (howMany) => {
  let limit = 0
  let response = await Appointment.find()
  while (
    response.length !== howMany &&
    response.length < howMany &&
    limit < 20
  ) {
    await sleep(50)
    response = await Appointment.find()
    /* await console.log(
      'how many appointments should be',
      howMany,
      'current amount ',
      response.length
    )
    */
    await limit++
  }

}
/**
 * Compares dates to the dates of the appointments in the database and makes sure they exist.
 * @param {*} rounds how many appointments are in a row.
 * @param {*} date the starting time of the first appointment in a row.
 */
async function loopThroughTheAppointments(rounds, date) {
  let start
  let end
  for (let i = 0; i < rounds; i++) {
    start = await Appointment.find({ start_date: date })
    date = await generator.increaseTime(30, new Date(date))
    end = await Appointment.find({ end_date: date })
    date = await generator.increaseTime(5, new Date(date))
    expect(start.length).toBe(1)
    expect(end.length).toBe(1)
  }
  return new Date(date)
}

module.exports = {
  emptyTheDatabaseOfAppointments,
  sleep,
  wait,
  loopThroughTheAppointments,
  emptyTheDatabaseOfUsers,
}