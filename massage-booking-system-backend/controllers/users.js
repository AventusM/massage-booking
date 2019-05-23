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



usersRouter.post('/', async (req, res, next) => {
    console.log('creating new user')
    try {
        const body = req.body

        if (body.password === undefined || body.password.length < 3) {
            return res.status(400).json({ error: 'Password is too short or missing' })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            name: body.name,
            number: body.number,
            email: body.email,
            admin: false,
            passwordHash,
        })

        const savedUser = await user.save()
        console.log('savedUser ', savedUser)
        res.json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

// TODO -- CREATE PUT etc. endpoint so ADMIN CAN i.e create OTHER ADMINS
// TODO -- CREATE PUT etc. endpoint so ADMIN CAN i.e create OTHER ADMINS
// TODO -- CREATE PUT etc. endpoint so ADMIN CAN i.e create OTHER ADMINS
// TODO -- CREATE PUT etc. endpoint so ADMIN CAN i.e create OTHER ADMINS
// TODO -- CREATE PUT etc. endpoint so ADMIN CAN i.e create OTHER ADMINS
// TODO -- CREATE PUT etc. endpoint so ADMIN CAN i.e create OTHER ADMINS

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

        const user = {
            name: body.name,
            number: body.number,
            email: body.email,
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, user, { new: true })
        res.json(updatedUser)
    } catch (exception) {
        next(exception)
    }

})

usersRouter.put('/:id/passwordChange', async (req, res, next) => {
    console.log('user password change attempted')
    try {
        console.log('request', req)
        const body = req.body
        console.log('changepassword body', body)
        if (body.password === undefined || body.password.length < 3) {
            return res.status(400).json({ error: 'Password is too short or missing' })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = {
            passwordHash
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, user, { new: true })
        console.log('updatedUser', updatedUser)
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