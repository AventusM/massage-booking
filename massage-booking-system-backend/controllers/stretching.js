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
        const body = req.body
        console.log('PUT CALLED', body)
        // 1. Selvitä nykyinen käyttäjä
        const getCurrentUser = req.user
        console.log('current user', getCurrentUser)

        // 2. Lisää käyttäjä mukaan viimeisimpään stretchingtapahtumaan
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