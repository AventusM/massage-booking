const express = require('express')
const Appointment = require('../models/appointment')
const appointmentsRouter = express.Router()
const bodyParser = require('body-parser')
appointmentsRouter.use(bodyParser.json())
const User = require('../models/user')
const ruleChecker = require('../utils/bookingRuleChecker')

const formatAppointment = input => {
  return {
    _id: input._id,
    masseusse_id: input.masseusse_id,
    user_id: input.user_id,
    start_date: input.start_date,
    end_date: input.end_date,
    type_of_reservation: input.type_of_reservation,
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
    const appointment = await Appointment.findById({ _id: req.params.id })
    res.json(appointment)
  } catch (exception) {
    next(exception)
  }
})

appointmentsRouter.put('/:id', async (req, res, next) => {
  try {
    const body = req.body
    //console.log('appointmentRouter put called with req body ', body)

    let user = await User.findById(body.user_id).populate('appointments')
    if (!user) {
      res.status(400).end()
      return
    }
    //console.log('user before appointment added', user)
    let updatedAppointment = {}

    if (body.type_of_reservation === 0) {
      // user wishes to cancel his/her appointment
      const appointment = {
        user_id: null,
        type_of_reservation: body.type_of_reservation,
      }

      updatedAppointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        appointment,
        { new: true }
      )
      console.log(
        'users appointments before cancelation',
        user.appointments,
        ' length ',
        user.appointments.length
      )
      //remove appointment from users appointments
      user.appointments = user.appointments.filter(appointment => {
        return (
          JSON.stringify(appointment._id) !==
          JSON.stringify(updatedAppointment._id)
        )
      })
      user = await user.save()
      console.log(
        'users appointments after canellation',
        ' length ',
        user.appointments.length
      )
    } else {
      // user wishes to make an appointment
      let ruleCheckResult = await ruleChecker(user.appointments, req.params.id)
      //console.log('rule check result', ruleCheckResult )
      if (ruleCheckResult) {
        //user is allowed to make reservation, proceed with reservation
        const appointment = {
          user_id: body.user_id || null,
          type_of_reservation: body.type_of_reservation,
        }

        updatedAppointment = await Appointment.findByIdAndUpdate(
          req.params.id,
          appointment,
          { new: true }
        )

        //adds appointment to users appointments
        user.appointments = user.appointments.concat(updatedAppointment._id)
        user = await User.findByIdAndUpdate(user._id, user)
        //console.log('user', user)
      } else {
        // user is not allowed to make this appointment
        console.log('NOT ALLOWED')
      }
    }
    //console.log('user after appointment added', user)
    res.json(updatedAppointment)
  } catch (exception) {
    next(exception)
  }
})

appointmentsRouter.delete('/:id', async (req, res, next) => {
  try {
    const appointment = await Appointment.findById({ _id: req.params.id })
    await appointment.remove()
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = appointmentsRouter
