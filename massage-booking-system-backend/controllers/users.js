const User = require('../models/user')
const Appointment = require('../models/appointment')
const usersRouter = require('express').Router()
const bodyParser = require('body-parser')
usersRouter.use(bodyParser.json())
const appointmentUtil = require('../utils/appointmentUtil')

const formatUser = input => {
  return {
    _id: input._id,
    // googleId: input.googleId,
    name: input.name,
    number: input.number,
    email: input.email,
    admin: input.admin,
    banned: input.banned,
    appointments: input.appointments,
    stretchingSessions: input.stretchingSessions,
    avatarUrl: input.avatarUrl,
  }
}

// Returns current user data depending on whether one has logged in or not
usersRouter.get('/current_user', async (req, res) => {
  if (req.user) {
    res.send(req.user)
  } else {
    res
      .send({ error: 'not authenticated' })
      .status(400)
      .end()
  }
})

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('appointments')
    res.json(users.map(formatUser))
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.params.id }).populate('appointments')
    res.json(user)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.put('/:id/user', async (req, res, next) => {
  try {
    const body = req.body

    const given_id = req.params.id
    console.log('given_id: ', given_id)

    const found_user = await User.findById({ _id: given_id })
    if (!found_user) {
      console.log('user not found')
      return res.status(400).end()
    }

    const updateUserData = {
      number: body.number || '',
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateUserData,
      { new: true }
    )
    res.json(updatedUser)
  } catch (exception) {
    next(exception)
  }
})

// User data which gets updated by administrator only
usersRouter.put('/:id', async (req, res, next) => {
  try {
    const body = req.body

    const given_id = body.auth_id
    const found_user = await User.findById({ _id: given_id })
    const updateable_user = await User.findById({ _id: req.params.id })

    const updated_admin_data = body.admin === undefined
      ? updateable_user.admin
      : body.admin

    const updated_banned_data = body.banned === undefined
      ? updateable_user.banned
      : body.banned

    // Verify that change is made by admin
    if (!found_user.admin) {
      return res.status(400).end()
    }

    const updateUserData = {
      admin: updated_admin_data,
      banned: updated_banned_data,
    }

    const updatedUser = await User.findByIdAndUpdate(
      updateable_user._id,
      updateUserData,
      { new: true }
    )
    res.json(updatedUser)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.delete('/:id', async (req, res, next) => {

  try {
    /*
    //verify?
    const given_id = req.params.id
    const found_user = await User.findById({ _id: given_id })
    if (!found_user.admin) {
      console.log('user not found')
      return res.status(400).end()
    }*/
    const user = await User.findById({ _id: req.params.id })

    await emptyAppointmentsFromUser(user)
    await user.remove()
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

const emptyAppointmentsFromUser = async (user) => {
  const appointments = await Appointment.find({ user_id: user._id })
  for (let appoint of appointments) {
    await appointmentUtil.removeUserFromAppointment(appoint)
  }

}

module.exports = usersRouter
