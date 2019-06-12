const User = require('../models/user')
const usersRouter = require('express').Router()
const bodyParser = require('body-parser')
usersRouter.use(bodyParser.json())

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
    avatarUrl: input.avatarUrl,
  }
}

// Returns current user data depending on whether one has logged in or not
usersRouter.get('/current_user', async (req, res, next) => {
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
    const user = await User.findById({ _id: req.params.id })
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

    // Verify that change is made by admin
    const given_id = body.auth_id
    const found_user = await User.findById({ _id: given_id })
    if (!found_user.admin) {
      // console.log('change request made by non-admin')
      return res.status(400).end()
    }

    // console.log('Update called')
    // console.log('Body given', body)
    const updateUserData = {
      admin: body.admin || false,
      banned: body.banned || false,
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

usersRouter.delete('/:id', async (req, res, next) => {
  console.log('DELETE USER')
  try {
    const user = await User.findById({ _id: req.params.id })
    await user.remove()
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
