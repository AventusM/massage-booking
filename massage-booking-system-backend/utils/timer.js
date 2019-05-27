const schedule = require('node-schedule')
const generator = require('./appointmentGenerator')
const appoint = require('../models/appointment') 
 

  /**
   *  scheduling rule for everyday.
   *  nextSixMonths = starting from the week of the date given as a parameter (any day of the week will do).
   */
  var rule = new schedule.RecurrenceRule()
  rule.dayOfWeek = [1,2,3,4,5,6]
  //rule.seconds = [5,10,15,20,25,30,35,40,45,50,55]
  const everyWeek = new schedule.scheduleJob(rule, function(){
    nextSixMonths(new Date)
  })

  /**
   * finds the day given as a parameter from the week which is defined by the date given as a parameter and returns it. 
   */
  const setDay = (day, date) =>{
    var today = date.getDay()
    if(today == day){
      return date
    }else if(today < day){
      day -= today
      return date.setDate(date.getDate() + day)
    }
    today -= day
    return date.setDate(date.getDate() - today)
  }
  
  /**
   * Loops 5 and 3 weeks from (and including) the same week as the date given as a parameter.
   * Every loop increases the date by a week creating a newDate.
   * pickDays = picks the correct days from the week given as a date parameter.
   * @param {*} date starting date.
   */
  const nextSixMonths = (date) =>{
    for(i = 0; i < 168;i+=7){
      //console.log('index', i)
      var newDate = new Date(date)
      pickDays(new Date(newDate.setDate(date.getDate() + i)))
    }
  }

  /**
   * Picks the days hard coded to the method (mon and tue), then attempts to create them.
   * ifNotInDBCreateDay = attempts to create appointments for the given day.
   * @param {*} date represents the week.
   */
  const pickDays = async (date) =>{
    var monday = setDay(1 ,new Date(date))
    var tuesday = setDay(2 ,new Date(date))
    await ifNotInDBCreateDay(new Date(monday))
    await ifNotInDBCreateDay(new Date(tuesday))
  }

  /**
   * Checks if database contains appointments for the day (compares date given as a parameter that is formated to 8:55:00 time to appointments starting times in the database).
   * If a match is found the method doesnt do anythings, else it will generate a day full of appointments by calling generator.
   * @param {*} date represents the day.
   */
  const ifNotInDBCreateDay = async(date) =>{
  date = formatTime(new Date(date))
  var doesDayHaveAppointments = await appoint.find({start_date: date})
  if(doesDayHaveAppointments.length == 0 && date.toISOString().includes('08:55:00')){
    await generator(new Date(date))
   // console.log('date has been saved into database', date)
  }else{
    console.log('day has appointments in database or time is formatted wrong', date)
  }
}

/**
 * formats any given date to the time 8:55:00.
 * @param {*} date the date to be formatted.
 */
const formatTime = (date) =>{
  date.setHours(8,0,0,0)
  let time = date.getTimezoneOffset() * (-1)
  date.setMinutes(time + 55)
  return date 
}

module.exports = { everyWeek }