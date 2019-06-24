const schedule = require('node-schedule')
const timer = require('./timer')

/**
   *  scheduling rule for everyday.
   *  nextSixMonths = starting from the week of the date given as a parameter (any day of the week will do).
  */
const everyDay = schedule.scheduleJob({ minute: 0, hour: 0 }, async function () {
  await timer.nextSixMonths(new Date)
  console.log('NYT')
})
module.exports = { everyDay }