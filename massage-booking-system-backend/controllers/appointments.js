const express = require('express')
const Appointment = require('../models/appointment')
const appointmentsRouter = express.Router()
const bodyParser = require('body-parser')
appointmentsRouter.use(bodyParser.json())
const User = require('../models/user')
const ruleChecker = require('../utils/bookingRuleChecker')
const appointmentUtil = require('../utils/appointmentUtil')
const verify = require('../utils/verify')

const formatAppointment = input => {
  return {
    _id: input._id,
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

appointmentsRouter.get('/:startDate/:endDate', async (req, res, next) => {
  const start = new Date(req.params.startDate)
  const end = new Date(req.params.endDate)

  try {
    const appointments = await Appointment.find({
      start_date: {
        $gte: start,
        $lte: end,
      },
    })

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
    const appointmentID = req.params.id

    let user = await User.findById(body.user_id).populate('appointments')
    if (!user) {
      res.status(400).end()
      return
    }

    let appointment = await Appointment.findById(appointmentID)
    if (!appointment) {
      res.status(400).end()
      return
    }

    if (appointment.type_of_reservation === 1 || appointment.type_of_reservation === 3) {
      // user wishes to cancel their appointment

      let userAllowedToCancel = await ruleChecker.userAllowedtoCancelAppointment(
        user._id,
        appointment
      )
      if (!userAllowedToCancel) {
        res.status(400).end()
        return
      }

      appointment.user_id = null
      appointment.type_of_reservation = body.type_of_reservation
      appointment = await appointment.save()

      //remove appointment from users appointments
      user.appointments = user.appointments.filter(app => {
        return JSON.stringify(app._id) !== JSON.stringify(appointment._id)
      })
      user = await user.save()
    } else {
      // user wishes to make an appointment
      let ruleCheckResult = await ruleChecker.userAllowedToMakeAppointment(
        user.appointments,
        appointment
      )
      if (ruleCheckResult) {
        //user is allowed to make reservation, proceed with reservation

        appointment.user_id = body.user_id
        appointment.type_of_reservation = body.type_of_reservation
        appointment = await appointment.save()

        //adds appointment to users appointments
        user.appointments = user.appointments.concat(appointment._id)
        await user.save()
      } else {
        // user is not allowed to make this appointment
      }
    }
    res.json(appointment)
  } catch (exception) {
    next(exception)
  }
})

/**
 * Searches appointment from database by id and then calls removeAppointment.
 */
appointmentsRouter.put('/:id/remove', verify.verifyIfAdmin, async (req, res, next) => {
  try {
    const appointment = await Appointment.findById({ _id: req.params.id })
    const updatedAppointment = await appointmentUtil.removeAppointment(appointment)

    return res.json(updatedAppointment)
  } catch (exception) {
    next(exception)
  }
})

/**
 * Marks the appointment with given id as available
 */
appointmentsRouter.put('/:id/add', verify.verifyIfAdmin, async (req, res, next) => {
  try {
    let appointment = await Appointment.findById(req.params.id)
    appointment.type_of_reservation = 0

    const response = await appointment.save()
    return res.json(response)

  } catch (exception) {
    next(exception)
  }
})

/**
 * Removes appointments that matches the date given as parameter.
 */
appointmentsRouter.put('/:date/removeDate', verify.verifyIfAdmin, async (req, res, next) => {
  try {
    const date = new Date(req.params.date)

    const month = date.getMonth()
    const year = date.getYear()
    const day = date.getDate()
    const appointments = await Appointment.find()
    const appointmentsToRemove = appointments.filter(appoint => appoint.start_date.getDate() === day && appoint.start_date.getMonth() === month && appoint.start_date.getYear() === year)

    let updatedAppointments = []
    for (let appoint of appointmentsToRemove) {
      const updatedAppointment = await appointmentUtil.removeAppointment(appoint)
      updatedAppointments.push(updatedAppointment)
    }

    res.json(updatedAppointments.map(formatAppointment))
  } catch (exception) {
    next(exception)
  }
})

/**
 * Marks the given date as available
 */
appointmentsRouter.put('/:date/addDate', verify.verifyIfAdmin, async (req, res, next) => {
  try {
    let start = new Date(req.params.date)
    start.setHours(start.getHours() + 3)

    let end = new Date(start)
    end.setHours(end.getHours() + 23)

    const appointments = await Appointment.find({
      start_date: {
        $gte: start,
        $lte: end,
      },
    })

    let updatedAppointments = []
    for (let appointment of appointments) {
      appointment.type_of_reservation = 0
      const updatedAppointment = await Appointment.findByIdAndUpdate(appointment._id, appointment, { new: true })
      updatedAppointments.push(updatedAppointment)
    }

    res.json(updatedAppointments.map(formatAppointment))

  } catch (exception) {
    next(exception)
  }
})

module.exports = appointmentsRouter
