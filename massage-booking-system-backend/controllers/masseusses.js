const express = require('express')
const Masseusse = require('../models/masseusse')
const masseussesRouter = express.Router()
const bodyParser = require('body-parser')
masseussesRouter.use(bodyParser.json())
const bcrypt = require('bcrypt')

const formatMasseusse = (input) => {
  return {
    _id: input._id,
    name: input.name,
    email: input.email,
    number: input.number
  }
}

masseussesRouter.get('/', async (req, res, next) => {
  try {
    const masseusses = await Masseusse.find({})
    res.json(masseusses.map(formatMasseusse))
  } catch (exception) {
    next(exception)
  }
})

masseussesRouter.get('/:id', async (req, res, next) => {
  try {
    // console.log('req params id', req.params.id)
    const masseusse = await Masseusse.findById({ _id: req.params.id })
    // console.log('masseusse', masseusse)
    res.json(masseusse)
  } catch (exception) {
    next(exception)
  }
})

masseussesRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body

    if (body.password === undefined || body.password.length < 3) {
      return res.status(400).json({ error: 'Password is too short or missing' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const masseusse = new Masseusse({
      name: body.name,
      email: body.email,
      number: body.number,
      passwordHash,
    })

    const savedMasseusse = await masseusse.save()

    res.json(savedMasseusse)
  } catch (exception) {
    next(exception)
  }
})

module.exports = masseussesRouter