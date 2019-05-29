const User = require('../models/user')
const usersRouter = require('express').Router()
const bodyParser = require('body-parser')
usersRouter.use(bodyParser.json())
const bcrypt = require('bcrypt')


const formatUser = (input) => {
    return {
        _id: input._id,
        name: input.name,
        number: input.number,
        email: input.email,
        admin: input.admin,
        appointments: input.appointments
    }
}

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
        const user = await User.find({ _id: req.params.id })
        res.json(user)
    } catch (exception) {
        next(exception)
    }
})

usersRouter.put('/:id/toggleadmin', async (req, res, next) => {
    try {

        // TODO -- VERIFY THAT ONLY ADMIN CAN DO THIS CHANGE
        // TODO -- VERIFY THAT ONLY ADMIN CAN DO THIS CHANGE
        // TODO -- VERIFY THAT ONLY ADMIN CAN DO THIS CHANGE
        // TODO -- VERIFY THAT ONLY ADMIN CAN DO THIS CHANGE
        // TODO -- VERIFY THAT ONLY ADMIN CAN DO THIS CHANGE
        // TODO -- VERIFY THAT ONLY ADMIN CAN DO THIS CHANGE

        const foundUser = await User.findByIdAndUpdate(req.params.id)
        foundUser.admin = !foundUser.admin
        await foundUser.save()
    } catch (exception) {
        next(exception)
    }
})


// Basic user data changes here. Visible for normal user
usersRouter.put('/:id', async (req, res, next) => {
    console.log('user put called')
    try {
        const body = req.body

        // TODO -- FIND OUT WHAT GETS UPDATED HERE
        // TODO -- FIND OUT WHAT GETS UPDATED HERE
        // TODO -- FIND OUT WHAT GETS UPDATED HERE
        const updateUserData = {}

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateUserData, { new: true })
        res.json(updatedUser)
    } catch (exception) {
        next(exception)
    }

})


usersRouter.delete('/:id', async (req, res, next) => {
    try {
        const user = await User.findById({ _id: req.params.id })
        await user.remove()
        res.status(204).end()
    } catch (exception) {
        next(exception)
    }

})


module.exports = usersRouter