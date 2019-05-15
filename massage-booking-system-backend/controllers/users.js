const User = require('../models/user')
const usersRouter = require('express').Router()
const bodyParser = require('body-parser')
usersRouter.use(bodyParser.json())


const formatUsers = (input) => {
    return {
        id: input.id,
        name: input.name,
        number: input.number,
        email: input.email,
        appoitments: input.appoitments
    }
}
usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await User.find({})
        res.json(users.map(formatUsers))
    } catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter