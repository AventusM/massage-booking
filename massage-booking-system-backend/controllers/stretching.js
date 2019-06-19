const stretchingRouter = require('express').Router()
const bodyParser = require('body-parser')
stretchingRouter.use(bodyParser.json())
const Stretching = require('../models/stretching')

const default_object = {
    participants: [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
    ],
    time: {}
}

stretchingRouter.get('/current', async (req, res, next) => {
    //res.send(default_object)
    // 1. Haetaan stretching model tietokannasta
    // 2. Järjestetään haettu modeli
    // 3. Palautetaan käyttäjälle järjestyksessä ylimmäinen näkyviin
    const stretchingSessions = Stretching.find({})
    res.json(stretchingSessions)
})

stretchingRouter.post('/current', async (req, res, next) => {
    try {
        const body = req.body
        console.log('body', body)

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