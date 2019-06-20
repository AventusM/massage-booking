const stretchingRouter = require('express').Router()
const bodyParser = require('body-parser')
stretchingRouter.use(bodyParser.json())
const Stretching = require('../models/stretching')
const User = require('../models/user')

const formatStretchingSession = input => {
    return {
        _id: input._id,
        date: input.date,
        time: input.time,
        users: input.users
    }
}


// GETS latest / next / upcoming stretching session
stretchingRouter.get('/', async (req, res, next) => {
    try {

        // Returns single stretching session by sorting with days
        const latesStretchingSession =
            await Stretching
                .find({})
                .populate('users')
                .sort({ date: -1 })
                .limit(1)

        res.send(latesStretchingSession.map(formatStretchingSession))

    } catch (exception) {
        next(exception)
    }

})

stretchingRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body

        const stretchingSession = new Stretching({
            date: body.date,
            users: []
        })

        const savedStretchingSession = await stretchingSession.save()
        res.json(savedStretchingSession.toJSON())
    } catch (exception) {
        next(exception)
    }
})

// Todo Check that double booking is not possible
stretchingRouter.put('/:id', async (req, res, next) => {
    try {
        const body = req.body
        const join_status = body.join
        const stretching_id = req.params.id

        // 1. Extract current user data
        const getCurrentUser = req.user
        const user = await User.findById(getCurrentUser._id)

        const stretchingAppointment = await Stretching.findById(stretching_id)

        // User wants to join
        if (join_status === true) {

            // Space exists?
            if (stretchingAppointment.users.length < 10) {

                // Should still check here if attempting to double book
                // ACTUALLY CRITICAL
                // ACTUALLY CRITICAL
                // ACTUALLY CRITICAL
                // ACTUALLY CRITICAL
                stretchingAppointment.users = stretchingAppointment.users.concat(user._id)
                const saved = await stretchingAppointment.save()
                user.stretchingSessions = user.stretchingSessions.concat(saved._id)
                await user.save()

                res.json(saved.toJSON())
            }
        }

        // User wants to cancel previously joined session
        else if (join_status === false) {

        }

        // 3. Lisää stretchingtapahtuma mukaan käyttäjän tietoihin
    } catch (exception) {
        next(exception)
    }
})


// Removes all. Created for testing purposes as one might want to spam the create
// button at will
stretchingRouter.delete('/', async (req, res, next) => {
    try {
        await Stretching.deleteMany({})
    } catch (exception) {
        next(exception)
    }
})




module.exports = stretchingRouter