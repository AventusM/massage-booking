const supertest = require('supertest')
const mongoose = require('mongoose')
const helpers = require('./test_helper')
const app = require('../../app')
const api = supertest(app)
const User = require('../../models/user')
const Masseusse = require('../../models/masseusse')
const Appointment = require('../../models/appointment')


describe('With an existing user and a masseusse', () => {
  beforeEach(async () => {
    await Appointment.deleteMany({})
    await User.deleteMany({})
    await Masseusse.deleteMany({})
    await api
      .post(`/api/users`)
      .send(helpers.validUser)

    await api
      .post(`/api/masseusses`)
      .send(helpers.validMasseusse)
  })

  it('should create a valid appointment when user IS logged in', async () => {
    const user_response = await api.get('/api/users')
    const user_id = user_response.body[0]._id

    const masseusse_response = await api.get('/api/masseusses')
    const masseusse_id = masseusse_response.body[0]._id

    const DateNow = Date.now()
    console.log('date now', DateNow)

    const new_appointment = {
      user_id,
      masseusse_id,
      start_date: DateNow,
      end_date: DateNow,
      type_of_reservation: 1
    }

    // Get user logged in to fix auth problems with testing
    const login_response =
      await api
        .post(`/api/login`)
        .send(helpers.loginObject)

    const appointment_response =
      await api
        .post('/api/appointments')
        .set('Authorization', `bearer ${login_response.body.token}`)
        .send(new_appointment)

    console.log('appointment response', appointment_response.body)

    expect(appointment_response.body.masseusse_id).toBe(masseusse_id)
    expect(appointment_response.body.user_id).toBe(user_id)
  })
})

describe('With an invalid masseusse', () => {
  beforeEach(async () => {
    await Appointment.deleteMany({})
    await User.deleteMany({})
    await Masseusse.deleteMany({})
    await api
      .post(`/api/users`)
      .send(helpers.validUser)

    await api
      .post(`/api/masseusses`)
      .send(helpers.validMasseusse)
  })

  it('should return 400 when user IS logged in', async () => {
    const user_response = await api.get('/api/users')
    const user_id = user_response.body[0]._id

    const masseusse_response = await api.get('/api/masseusses')
    const masseusse_id = masseusse_response.body[0]._id

    const new_appointment = {
      user_id,
      masseusse_id
    }

    // DELETING MASSEUSSE
    await api
      .delete(`/api/masseusses/${masseusse_id}`)
      .expect(204)

    const login_response =
      await api
        .post(`/api/login`)
        .send(helpers.loginObject)

    // LOGIN BUT NO MASSEUSSE -- RETURNS 400
    const appointment_response =
      await api
        .post('/api/appointments')
        .set('Authorization', `bearer ${login_response.body.token}`)
        .send(new_appointment)
        .expect(400)
  })

  it('should return 401 when user IS NOT logged in', async () => {
    const user_response = await api.get('/api/users')
    const user_id = user_response.body[0]._id

    const masseusse_response = await api.get('/api/masseusses')
    const masseusse_id = masseusse_response.body[0]._id

    const new_appointment = {
      user_id,
      masseusse_id
    }

    // DELETING MASSEUSSE
    await api
      .delete(`/api/masseusses/${masseusse_id}`)
      .expect(204)

    // NO LOGIN -- RETURNS 401
    const appointment_response =
      await api
        .post('/api/appointments')
        .send(new_appointment)
        .expect(401)

  })
})