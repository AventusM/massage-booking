const stretchingRouter = require('express').Router()
const bodyParser = require('body-parser')
stretchingRouter.use(bodyParser.json())
const Stretching = require('../models/stretching')

const formatStretchingSession = input => {
    return {
        _id: input._id,
        day: input.day,
        time: input.time,
        users: input.users
    }
}


stretchingRouter.get('/current', async (req, res, next) => {
    // 2. Järjestetään haettu modeli
    // 3. Palautetaan käyttäjälle järjestyksessä ylimmäinen näkyviin
    const stretchingSessions = await Stretching.find({}).populate('users')
    res.send(stretchingSessions.map(formatStretchingSession))
})

stretchingRouter.post('/current', async (req, res, next) => {
    try {
        const body = req.body    
        const stretchingSession = new Stretching({
            day:body.day
        })
        const savedStretchingSession = await stretchingSession.save()
        res.json(savedStretchingSession.toJSON())
        // 1. Lisätään uusi venyttelytapahtuma mongooseen riippuen timin parametreistä
    } catch (exception) {
        next(exception)
    }
})

stretchingRouter.put('/current', async (req, res, next) => {
    try {
        // 1. Selvitä nykyinen käyttäjä
        // 2. Lisää käyttäjä mukaan viimeisimpään stretchingtapahtumaan
    } catch (exception) {
        next(exception)
    }
})





module.exports = stretchingRouter