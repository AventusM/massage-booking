const schedule = require('node-schedule') 
const timer = require('./timer')

  /**
   *  scheduling rule for everyday.
   *  nextSixMonths = starting from the week of the date given as a parameter (any day of the week will do).
  */
  const everyDay = schedule.scheduleJob({hour: 0, minute: 0}, function(){
    timer.nextSixMonths(new Date)
  }) 
  module.exports = { everyDay }