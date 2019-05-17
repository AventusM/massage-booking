const express = require('express')
const Appointment = require('../models/appointment')
const appointmentsRouter = express.Router()
const bodyParser = require('body-parser')
appointmentsRouter.use(bodyParser.json())
const bcrypt = require('bcrypt')
const jsonWebToken = require('jsonwebtoken')
const User = require('../models/user')
const Masseusse = require('../models/masseusse')

const formatAppointment = (input) => {
  return {
    _id: input._id,
    masseusse_id: input.masseusse_id,
    user_id: input.user_id
  }
}

const getToken = req => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().starsWith('bearer')) {
    return authorization.substring(7)
  } 
  return null
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
    const token = getToken(res)
    const decodedToken = jsonWebToken.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {      
      return response.status(401).json({ error: 'token missing or invalid' })    
    }
    
    const body = req.body
    const user = await User.findById(body.user_id)

    // TODO -- ADD Own appointments for Masseusse as well??
    // TODO -- ADD Own appointments for Masseusse as well??
    // TODO -- ADD Own appointments for Masseusse as well??
    const masseusse = await Masseusse.findById(body.masseusse_id)

    // No error is given if either of searched items is null. 
    // Have to create an explicit if-statement
    if (!(user && masseusse)) {
      res.status(400).end()
      return
    }

    const appointment = new Appointment({
      masseusse_id: body.masseusse_id,
      user_id: body.user_id
    })

    try {
      // Create appointment
      const savedAppointment = await appointment.save()
      user.appointments = user.appointments.concat(savedAppointment._id)
      // Add previously created appointment to user as well
      await user.save()
      res.json(savedAppointment)
    } catch (exception) {
      next(exception)
    }
  } catch (exception) {
    next(exception)
  }

})

module.exports = appointmentsRouter