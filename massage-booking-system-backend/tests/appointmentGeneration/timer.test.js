const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../../app')
supertest(app)
const Appointment = require('../../models/appointment')
const timer = require('../../utils/timer')
const helper = require('./test_helper')

let monday = timer.formatTime(new Date('July 15, 2019 12:00:00'))
let tuesday = timer.formatTime(new Date('July 16, 2019 12:00:00'))
let wednesday = timer.formatTime(new Date('July 17, 2019 12:00:00'))
let saturday = timer.formatTime(new Date('July 20, 2019 12:00:00'))
let sunday = timer.formatTime(new Date('July 21, 2019 12:00:00'))

/**
 * IF TESTS FAIL GO TO tests/applicationGeneration/test_helper.js and increse the time in the loop of the function "emptyTheDatabaseOfAppointments"
 * FREE FB CAN BE SLOW!
 */
describe('with any date given', () => {
  beforeEach(async () => {
    jest.setTimeout(1000000)
    await helper.emptyTheDatabaseOfAppointments()

    monday = timer.formatTime(new Date('July 15, 2019 12:00:00'))
    tuesday = timer.formatTime(new Date('July 16, 2019 12:00:00'))
    wednesday = timer.formatTime(new Date('July 17, 2019 12:00:00'))
    saturday = timer.formatTime(new Date('July 20, 2019 12:00:00'))
    sunday = timer.formatTime(new Date('July 21, 2019 12:00:00'))
  })

  it('setDay finds the correct day from the date (representing the week) given', async () => {

    expect(new Date(timer.setDay(1, new Date(saturday))).toISOString()).toBe('2019-07-15T08:55:00.000Z')
    expect(new Date(timer.setDay(2, new Date(saturday))).toISOString()).toBe('2019-07-16T08:55:00.000Z')
    expect(new Date(timer.setDay(3, new Date(saturday))).toISOString()).toBe('2019-07-17T08:55:00.000Z')
    expect(new Date(timer.setDay(4, new Date(saturday))).toISOString()).toBe('2019-07-18T08:55:00.000Z')
    expect(new Date(timer.setDay(5, new Date(saturday))).toISOString()).toBe('2019-07-19T08:55:00.000Z')
    expect(new Date(timer.setDay(6, new Date(saturday))).toISOString()).toBe('2019-07-20T08:55:00.000Z')
    expect(new Date(timer.setDay(7, new Date(saturday))).toISOString()).toBe('2019-07-21T08:55:00.000Z')

  })
  it('nextSixMonths goes through the current week and 24 weeks further', async () => {
    await timer.nextSixMonths(sunday)
    await helper.wait(624)
    const response = await Appointment.find()
    expect(response.length).toBe(624)
  })
  it('pickDays sets the days to be created as monday and tuesday', async () => {
    await timer.pickDays(wednesday)
    await helper.wait(26)
    const response = await Appointment.find()
    expect(response.length).toBe(26)

    let monHasAppointment = await Appointment.find({ start_date: monday })
    let tueHasAppointment = await Appointment.find({ start_date: tuesday })

    expect(monHasAppointment.length).toBe(1)
    expect(tueHasAppointment.length).toBe(1)

  })
  it('ifNotInDBCreateDay if db has an appointment with same end_date and time as 16:50:00 skip the creation of that day', async () => {
    await timer.ifNotInDBCreateDay(monday)
    await helper.wait(13)
    await timer.ifNotInDBCreateDay(monday)
    await helper.sleep(50)
    const response = await Appointment.find()
    expect(response.length).toBe(13)
  })
  it('ifNotInDBCreateDay if db doesnt have an appointment with the same end_date and time 16:50:00 create that day', async () => {
    await timer.ifNotInDBCreateDay(monday)
    await helper.wait(13)
    const response = await Appointment.find()
    expect(response.length).toBe(13)
  })
  it('formatTime formats time of date to 8:55:00', async () => {
    let formattedDate = new Date(timer.formatTime(monday))
    expect(formattedDate.toISOString()).toBe('2019-07-15T08:55:00.000Z')

  })
})
afterAll(async () => {
  await mongoose.disconnect()
})