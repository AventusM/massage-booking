const stretchingRouter = require('express').Router()
const bodyParser = require('body-parser')
stretchingRouter.use(bodyParser.json())
const Stretching = require('../models/stretching')
const User = require('../models/user')

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
        const isAdmin = req.user.admin
        if (isAdmin) {
            // 1. Returns all stretching sessions to Admin user
            const allSessions =
                await Stretching
                    .find({})
                    .populate('users')
                    .sort({ date: 1 })

            res.send(allSessions.map(formatStretchingSession))
        } else if (!isAdmin) {
            // 2. WILL RETURN the next non-completed stretching session to normal user

            // TODO TODO TODO COMPLETE FUNCTIONALITY
            // CURRENT VERSION ONLY FOR DEMONSTRATION PURPOSES FOR DEMO ETC
            // TO SHOW DIFFERENCES BETWEEN ADMIN / NORMAL USER
            // TODO TODO TODO COMPLETE FUNCTIONALITY
            // CURRENT VERSION ONLY FOR DEMONSTRATION PURPOSES FOR DEMO ETC
            // TO SHOW DIFFERENCES BETWEEN ADMIN / NORMAL USER
            // TODO TODO TODO COMPLETE FUNCTIONALITY
            // CURRENT VERSION ONLY FOR DEMONSTRATION PURPOSES FOR DEMO ETC
            // TO SHOW DIFFERENCES BETWEEN ADMIN / NORMAL USER

            // Returns single stretching session by sorting with days
            const latesStretchingSession =
                await Stretching
                    .find({})
                    .populate('users')
                    .sort({ date: -1 })
                    .limit(1)

            res.send(latesStretchingSession.map(formatStretchingSession))
        }
    } catch (exception) {
        next(exception)
    }

})

// Endpoint for masseusse user which gets triggered once they decide to
// create a new stretching session for other users to join
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
            stretchingAppointment.users.filter(participant_id => participant_id.toString() === user._id.toString()).length === 0

        const exitCriteriaPassed =
            join_status === false &&
            stretchingAppointment.users.length > 0 &&
            stretchingAppointment.users.filter(participant_id => participant_id.toString() === user._id.toString()).length > 0

        if (joinCriteriaPassed) {
            stretchingAppointment.users = stretchingAppointment.users.concat(user._id)
            const saved = await stretchingAppointment.save()
            user.stretchingSessions = user.stretchingSessions.concat(saved._id)
            await user.save()

            // Give this as response so that state can be updated dynamically for user
            res.json(saved.toJSON())
        } else if (exitCriteriaPassed) {
            stretchingAppointment.users = stretchingAppointment.users.filter(participant_id => participant_id.toString() !== user._id.toString())
            const saved = await stretchingAppointment.save()
            user.stretchingSessions = user.stretchingSessions.filter(stretch_session_id => stretch_session_id.toString() !== stretchingAppointment._id.toString())
            await user.save()

            // Give this as response so that state can be updated dynamically for user
            res.json(saved.toJSON())
        }

    } catch (exception) {
        next(exception)
    }
})



// Removes individual stretching appointment completely. Used by masseusse type user
stretchingRouter.delete('/:id', async (req, res, next) => {
    try {

        // TODO
        // 1. Fetch stetching session by id
        // 2. Update users by removing id from their own stretching session list
        // IS STEP 2 done automatically by mongoose if JUST STEPS 1 AND 3 ARE MADE?
        // IS STEP 2 done automatically by mongoose if JUST STEPS 1 AND 3 ARE MADE?
        // 3. Delete stretching session
    } catch (exception) {
        next(exception)
    }
})


// Removes all stretching sessions at once. Created for testing purposes as one might spam session creation
stretchingRouter.delete('/', async (req, res, next) => {
    try {
        await Stretching.deleteMany({})
    } catch (exception) {
        next(exception)
    }
})




module.exports = stretchingRouter