const express = require('express')
const Appointment = require('../models/appointment')
const appointmentsRouter = express.Router()
const bodyParser = require('body-parser')
appointmentsRouter.use(bodyParser.json())
const User = require('../models/user')
const ruleChecker = require('../utils/bookingRuleChecker')
const appointmentUtil = require('../utils/appointmentUtil')

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

    //console.log(appointments)
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

    if (body.type_of_reservation === 3) {
      let appointment = await Appointment.findById(appointmentID)

      appointment.type_of_reservation = 0

      const response = await appointment.save()
      return res.json(response)
    }
    //console.log('appointmentRouter put called with req body ', body)

    let user = await User.findById(body.user_id).populate('appointments')
    // console.log('found user in router', user)
    if (!user) {
      res.status(400).end()
      return
    }

    let appointment = await Appointment.findById(appointmentID)
    //console.log('appointment ', appointment, typeof(appointment))
    if (!appointment) {
      res.status(400).end()
      return
    }

    if (body.type_of_reservation === 0) {
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

      /*console.log(
        'users appointments before cancelation',
        user.appointments,
        ' length ',
        user.appointments.length
      )*/
      //remove appointment from users appointments
      user.appointments = user.appointments.filter(app => {
        return JSON.stringify(app._id) !== JSON.stringify(appointment._id)
      })
      user = await user.save()
      /*console.log(
        'users appointments after cancelation',
        ' length ',
        user.appointments.length
      )*/
    } else {
      // user wishes to make an appointment
      let ruleCheckResult = await ruleChecker.userAllowedToMakeAppointment(
        user.appointments,
        appointment
      )
      //console.log('rule check result', ruleCheckResult )
      if (ruleCheckResult) {
        //user is allowed to make reservation, proceed with reservation

        appointment.user_id = body.user_id
        appointment.type_of_reservation = body.type_of_reservation
        appointment = await appointment.save()

        //adds appointment to users appointments
        user.appointments = user.appointments.concat(appointment._id)
        await user.save()
        //  console.log('user after new appointment', user)
      } else {
        // user is not allowed to make this appointment
        //  console.log('NOT ALLOWED')
      }
    }
    //console.log('user after appointment added', user)
    res.json(appointment)
  } catch (exception) {
    next(exception)
  }
})

/**
 * Searches appointment from database by id and then calls removeAppointment.
 */
appointmentsRouter.put('/:id/remove', async (req, res, next) => {
  //verify?
  try {
    /*
    console.log('rRRRRRRr', req.user._id)
    const found_user = await User.findById({ _id: req.user._id })
    if (!found_user.admin) {
      console.log('user not found')
      return res.status(400).end()
    }
    */
    const appointment = await Appointment.findById({ _id: req.params.id })
    await appointmentUtil.removeAppointment(appointment)
    const newAppointment = await Appointment.findById({ _id: req.params.id })

    return res.json(newAppointment)
  } catch (exception) {
    next(exception)
  }
})

/**
 * Removes appointments that matches the date given as parameter.
 */

appointmentsRouter.put('/:date/removeDate', async (req, res, next) => {
  //verify?
  try {
    /*
    const found_user = await User.findById({ _id: req.user._id })
    if (!found_user.admin) {
      console.log('user not found')
      console.log('USER EI TOIMINYT')
      return res.status(400).end()
    }*/

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

appointmentsRouter.put('/:date/addDate', async (req, res, next) => {
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
