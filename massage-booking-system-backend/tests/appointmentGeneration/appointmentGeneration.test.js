const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../../app')
supertest(app)
const Appointment = require('../../models/appointment')
const generator = require('../../utils/appointmentGenerator')
const timer = require('../../utils/timer')
const helper = require('./test_helper')

let monday = timer.formatTime(new Date('July 15, 2019 12:00:00'))
let tuesday = timer.formatTime(new Date('July 16, 2019 12:00:00'))
let wednesday = timer.formatTime(new Date('July 17, 2019 12:00:00'))
let thursday = timer.formatTime(new Date('July 18, 2019 12:00:00'))
let friday = timer.formatTime(new Date('July 19, 2019 12:00:00'))
let saturday = timer.formatTime(new Date('July 20, 2019 12:00:00'))
let sunday = timer.formatTime(new Date('July 21, 2019 12:00:00'))


/**
 * IF TESTS FAIL GO TO tests/applicationGeneration/test_helper.js and increse the time in the loop of the function "emptyTheDatabaseOfAppointments"
 * FREE DB CAN BE SLOW.
 */
describe('with any date', () => {
  beforeEach(async () => {
    jest.setTimeout(1000000)
    await helper.emptyTheDatabaseOfAppointments()

    monday = timer.formatTime(new Date('July 15, 2019 12:00:00'))
    tuesday = timer.formatTime(new Date('July 16, 2019 12:00:00'))
    wednesday = timer.formatTime(new Date('July 17, 2019 12:00:00'))
    thursday = timer.formatTime(new Date('July 18, 2019 12:00:00'))
    friday = timer.formatTime(new Date('July 19, 2019 12:00:00'))
    saturday = timer.formatTime(new Date('July 20, 2019 12:00:00'))
    sunday = timer.formatTime(new Date('July 21, 2019 12:00:00'))
  })

  it('generateAppoinmentsForDay leaves a 30 min break between correct appointments', async () => {
    await generator.generateAppointmentsForDay(saturday)
    await helper.wait(13)
    const beforeBreak = await Appointment.find({ end_date: '2019-07-20T11:45:00.000Z' })
    const afterBreak = await Appointment.find({ start_date: '2019-07-20T12:15:00.000Z' })
    expect(beforeBreak.length).toBe(1)
    expect(afterBreak.length).toBe(1)

  })



  it('generateAppoinmentsForDay creates appointments with proper times', async () => {
    await generator.generateAppointmentsForDay(new Date(friday))
    await helper.wait(13)
    friday = await helper.loopThroughTheAppointments(5, new Date(friday))
    friday = generator.increaseTime(25, new Date(friday))
    await helper.loopThroughTheAppointments(8, new Date(friday))
  })




  it('create createAppointmentsInRow creates correct amount of appointments', async () => {
    await generator.createAppointmentsInRow(monday, 4)
    await helper.wait(4)
    const response = await Appointment.find()
    expect(response.length).toBe(4)

  })


  it('appointment with same starting time cannot be added twice', async () => {
    await generator.generateAppointmentsForDay(new Date(friday))
    await helper.wait(13)
    await generator.generateAppointmentsForDay(new Date(friday))
    await helper.sleep(50)
    const response = await Appointment.find()
    expect(response.length).toBe(13)

  })



  it('create createAppointmentsInRow returns correct end time', async () => {
    let date = await generator.createAppointmentsInRow(monday, 7)
    await helper.wait(7)
    expect(date.toISOString()).toBe('2019-07-15T12:55:00.000Z')
  })


  it('increaseTime returns correct time', () => {
    expect(generator.increaseTime(30, monday).toISOString()).toBe('2019-07-15T09:25:00.000Z')
    expect(generator.increaseTime(110, monday).toISOString()).toBe('2019-07-15T11:15:00.000Z')
  })

  it('generateAppoinmentsForDay generates proper amount of appointments when monday is generated', async () => {
    await generator.generateAppointmentsForDay(monday)
    await helper.wait(13)
    const response = await Appointment.find()
    expect(response.length).toBe(13)
  })
  it('generateAppoinmentsForDay generates proper amount of appointments when tuesday is generated', async () => {
    await generator.generateAppointmentsForDay(tuesday)
    await helper.wait(13)
    const response = await Appointment.find()
    expect(response.length).toBe(13)
  })
  it('generateAppoinmentsForDay generates proper amount of appointments when wednesday is generated', async () => {
    await generator.generateAppointmentsForDay(wednesday)
    await helper.wait(13)
    const response = await Appointment.find()
    expect(response.length).toBe(13)
  })
  it('generateAppoinmentsForDay generates proper amount of appointments when thursday is generated', async () => {
    await generator.generateAppointmentsForDay(thursday)
    await helper.wait(13)
    const response = await Appointment.find()
    expect(response.length).toBe(13)
  })
  it('generateAppoinmentsForDay generates proper amount of appointments when friday is generated', async () => {
    await generator.generateAppointmentsForDay(friday)
    await helper.wait(13)
    const response = await Appointment.find()
    expect(response.length).toBe(13)
  })
  it('generateAppoinmentsForDay generates proper amount of appointments when saturday is generated', async () => {
    await generator.generateAppointmentsForDay(saturday)
    await helper.wait(13)
    const response = await Appointment.find()
    expect(response.length).toBe(13)
  })
  it('generateAppoinmentsForDay generates proper amount of appointments when sunday is generated', async () => {
    await generator.generateAppointmentsForDay(sunday)
    await helper.wait(13)
    const response = await Appointment.find()
    expect(response.length).toBe(13)
  })

  it('generateAppoinmentsForDay generates proper amount of appointments when each day is generated', async () => {
    await generator.generateAppointmentsForDay(wednesday)
    await helper.wait(13)
    const response = await Appointment.find()
    expect(response.length).toBe(13)
    await generator.generateAppointmentsForDay(monday)
    // await helper.wait(26)
    await generator.generateAppointmentsForDay(tuesday)
    // await helper.wait(39)
    await generator.generateAppointmentsForDay(thursday)
    // await helper.wait(52)
    await generator.generateAppointmentsForDay(friday)
    // await helper.wait(65)
    await generator.generateAppointmentsForDay(saturday)
    // await helper.wait(78)
    await generator.generateAppointmentsForDay(sunday)
    await helper.wait(91)
    const response2 = await Appointment.find()
    expect(response2.length).toBe(91)

  })
})


afterAll(async () => {
  await mongoose.disconnect()
})