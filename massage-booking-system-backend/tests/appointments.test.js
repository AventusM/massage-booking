const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const Masseusse = require('../models/masseusse')
const Appointment = require('../models/appointment')


describe('With an existing user a masseusse', () => {
  beforeEach(async () => {
    await Appointment.deleteMany({})
    await User.deleteMany({})
    await Masseusse.deleteMany({})
    const validUser = {
      name: "AntonM",
      number: "050-3528695",
      email: "family@guy.foq",
      admin: true,
      password: "secretPass"
    }
    const validMasseusse = {
      name: "Hanna Hieroja",
      number: "90210",
      email: "jes@jes.hemohes",
      password: "testing"
    }

    await api
      .post(`/api/users`)
      .send(validUser)

    await api
      .post(`/api/masseusses`)
      .send(validMasseusse)
  })

  it('should create a valid appointment', async () => {
    const user_response = await api.get('/api/users')
    const user_id = user_response.body[0]._id

    const masseusse_response = await api.get('/api/masseusses')
    const masseusse_id = masseusse_response.body[0]._id

    const new_appointment = {
      user_id,
      masseusse_id
    }

    const appointment_response =
      await api
        .post('/api/appointments')
        .send(new_appointment)

    expect(appointment_response.body.masseusse_id).toBe(masseusse_id)
    expect(appointment_response.body.user_id).toBe(user_id)
  })
})

describe('With an invalid masseusse or user', () => {
  beforeEach(async () => {
    await Appointment.deleteMany({})
    await User.deleteMany({})
    await Masseusse.deleteMany({})
    const validUser = {
      name: "AntonM",
      number: "050-3528695",
      email: "family@guy.foq",
      admin: true,
      password: "secretPass"
    }
    const validMasseusse = {
      name: "Hanna Hieroja",
      number: "90210",
      email: "jes@jes.hemohes",
      password: "testing"
    }

    await api
      .post(`/api/users`)
      .send(validUser)

    await api
      .post(`/api/masseusses`)
      .send(validMasseusse)
  })

  it('should NOT create a valid appointment', async () => {
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

    // THIS SHOULD RETURN 400 OR 500?
    const appointment_response =
      await api
        .post('/api/appointments')
        .send(new_appointment)
        .expect(400)
  })
})