const stretchingRouter = require('express').Router()
const bodyParser = require('body-parser')
stretchingRouter.use(bodyParser.json())
const Stretching = require('../models/stretching')
const User = require('../models/user')
const AppointmentManager = require('../utils/appointmentUtil')

const formatStretchingSession = input => {
  return {
    _id: input._id,
    date: input.date,
    users: input.users
  }
}

// GETS latest / next / upcoming stretching session
stretchingRouter.get('/', async (req, res, next) => {
  try {
    let today = new Date()
    const allSessions =
      await Stretching
        .find({ date: { $gte: today } })
        .populate('users.data')
        .sort({ date: 1 })

    res.send(allSessions.map(formatStretchingSession))
  } catch (exception) {
    next(exception)
  }
})

// Endpoint for masseusse user which gets triggered once they decide to
// create a new stretching session for other users to join
stretchingRouter.post('/', async (req, res, next) => {
  try {
    let date = new Date(req.body.date)
    let minutes = date.getMinutes()
    let time = date.getTimezoneOffset() * -1
    date.setMinutes(minutes + time)

    // check if there is a stretch already
    if (await AppointmentManager.isDateValid(date)) {
      await AppointmentManager.removeTwoAppointments(date)

      const stretchingSession = new Stretching({
        date: date,
        users: []
      })

      const savedStretchingSession = await stretchingSession.save()
      res.json(savedStretchingSession.toJSON())
    }
  } catch (exception) {
    next(exception)
  }
})

// Endpoint for users wanting to join / cancel previously joined existing stretching session
stretchingRouter.put('/:id', async (req, res, next) => {
  try {
    const body = req.body
    const join_status = body.join

    const stretching_id = req.params.id

    // Extract current user data.
    // Need to have user model as we need to update it
    const getCurrentUser = req.user
    const user = await User.findById(getCurrentUser._id)

    const stretchingAppointment = await Stretching.findById(stretching_id)

    const joinCriteriaPassed =
      join_status === true &&
      stretchingAppointment.users.length < 10 &&
      stretchingAppointment.users.filter(participant => participant.data._id.toString() === user._id.toString()).length === 0

    const exitCriteriaPassed =
      join_status === false &&
      stretchingAppointment.users.length > 0 &&
      stretchingAppointment.users.filter(participant => participant.data._id.toString() === user._id.toString()).length > 0

    if (joinCriteriaPassed) {
      // Description is given in body only when trying to join the appointment
      // Fallback used if description value isnt given
      const description = body.description.value || 'No description given'

      stretchingAppointment.users = stretchingAppointment.users.concat({ data: user._id, description })
      const saved = await stretchingAppointment.save()
      await saved.populate('users.data').execPopulate()
      user.stretchingSessions = user.stretchingSessions.concat(saved._id)
      await user.save()
      // Give this as response so that state can be updated dynamically for user
      res.json(saved.toJSON())
    } else if (exitCriteriaPassed) {
      stretchingAppointment.users = stretchingAppointment.users.filter(participant => participant.data._id.toString() !== user._id.toString())
      const saved = await stretchingAppointment.save()
      await saved.populate('users.data').execPopulate()
      user.stretchingSessions = user.stretchingSessions.filter(stretch_session_id => stretch_session_id.toString() !== stretchingAppointment._id.toString())
      await user.save()

      // Give this as response so that state can be updated dynamically for user
      res.json(saved.toJSON())
    }

  } catch (exception) {
    next(exception)
  }
})

// Removes individual stretching appointment completely. Used by admin
stretchingRouter.delete('/:id', async (req, res, next) => {
  try {
    const stretchId = req.params.id
    let stretch = await Stretching.findById(stretchId)
    for (let user of stretch.users) {
      await AppointmentManager.removeStretchFromUser(user.data, stretchId)
    }
    await AppointmentManager.recoverTwoAppointments(stretch.date)
    await Stretching.remove({ _id: stretchId })
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = stretchingRouter