const User = require('../models/user')
const usersRouter = require('express').Router()
const bodyParser = require('body-parser')
usersRouter.use(bodyParser.json())
const bcrypt = require('bcrypt')


const formatUser = (input) => {
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
        res.json(users.map(formatUser))
    } catch (exception) {
        next(exception)
    }
})

usersRouter.get('/:id', async (req, res, next) => {
    try {
        const users = await User.find({ _id: req.params.id })
        res.json(user)
    } catch (exception) {
        next(exception)
    }
})


usersRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body

        if (body.password === undefined || body.password.length < 3) {
            return res.status(400).json({ error: 'Password is too short or missing' })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            number: body.number,
            email: body.email,
            admin: false,
            passwordHash,
        })

        const savedUser = await user.save()

        res.json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

usersRouter.delete('/:id', async (req, res, next) => {
    try {
        const user = await User.findById({ _id: req.params.id })
        await user
            .remove()
        res.status(204).end()
    } catch (exception) {
        next(exception)
    }

})


module.exports = usersRouter