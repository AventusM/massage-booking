const supertest = require('supertest')
const mongoose = require('mongoose')
const helpers = require('./test_helper')
const app = require('../../app')
const api = supertest(app)
const User = require('../../models/user')
const Appointment = require('../../models/appointment')

describe('GET appointments with existing user', () => {
  beforeEach(async () => {
    await Appointment.deleteMany({})
    await User.deleteMany({})
    helpers.fakeGoogleUser.save()
  })

  it('should return saved appointments', async () => {

  })

})

describe('GET appointments without existing user appointments', () => {
  beforeEach(async () => {
    await Appointment.deleteMany({})
    await User.deleteMany({})
  })
})


describe('PUT appointments', () => {
  beforeEach(async () => {
    await Appointment.deleteMany({})
    await User.deleteMany({})
  })

  it('when user wants to create an appointment when not having any, the appointment SHOULD change its type', async () => {

  })

  it('when user wants to create an appointment when having one, the appointment SHOULD NOT change its type if appointment is done too soon after previous user appointment', async () => {

  })

  it('when user wants to create an appointment when having one, the appointment SHOULD change its type if enough time has passed after previous user appointment', async () => {

  })

  it('when user wants to cancel own appointment, the appointment SHOULD change its type', async () => {

  })
})


afterAll(() => {
  mongoose.disconnect()
})
