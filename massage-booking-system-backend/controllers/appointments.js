const express = require('express')
const Appointment = require('../models/appointment')
const appointmentsRouter = express.Router()
const bodyParser = require('body-parser')
appointmentsRouter.use(bodyParser.json())
const bcrypt = require('bcrypt')

const formatAppointment = (input) => {
  return {
    _id: input._id,
    masseusse_id: input.masseusse_id,
    user_id: input.user_id
  }
}

appointmentsRouter.get('/', async (req, res, next) => {
  try {
    const appointments = await Appointment.find({})
    res.json(appointments.map(formatAppointment))
  } catch (exception) {
    next(exception)
  }
})

appointmentsRouter.get('/:id', async (req, res, next) => {
  try {
    // console.log('req params id', req.params.id)
    const appointment = await Appointment.findById({ _id: req.params.id })
    // console.log('appointment', appointment)
    res.json(appointment)
  } catch (exception) {
    next(exception)
  }
})

appointmentsRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body

    const appointment = new Appointment({
      masseusse_id: body.masseusse_id,
      user_id: body.user_id
    })

    const savedAppointment = await appointment.save()

    res.json(savedAppointment)
  } catch (exception) {
    next(exception)
  }
})

module.exports = appointmentsRouter