const stretchingRouter = require('express').Router()
const bodyParser = require('body-parser')
stretchingRouter.use(bodyParser.json())
const Stretching = require('../models/stretching')

const formatStretchingSession = input => {
    return {
        _id: input._id,
        date: input.date,
        time: input.time,
        users: input.users
    }
}


stretchingRouter.get('/current', async (req, res, next) => {
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

stretchingRouter.post('/current', async (req, res, next) => {
    try {
        const body = req.body

        const stretchingSession = new Stretching({
            date: body.date
        })

        const savedStretchingSession = await stretchingSession.save()
        res.json(savedStretchingSession.toJSON())
    } catch (exception) {
        next(exception)
    }
})

stretchingRouter.put('/current', async (req, res, next) => {
    try {
        // 1. Selvitä nykyinen käyttäjä
        const getCurrentUser = req.user
        console.log('current user', getCurrentUser)

        // 2. Lisää käyttäjä mukaan viimeisimpään stretchingtapahtumaan
    } catch (exception) {
        next(exception)
    }
})


// Removes all
stretchingRouter.delete('/', async (req, res, next) => {
    try {
        await Stretching.deleteMany({})
    } catch (exception) {
        next(exception)
    }
})




module.exports = stretchingRouter