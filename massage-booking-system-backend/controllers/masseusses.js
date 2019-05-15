const express = require('express')
const masseusses = require('../models/masseusse')
const masseussesRouter = express.Router()
const bodyParser = require('body-parser')
masseussesRouter.use(bodyParser.json())


const formatMasseusse = (input) => {
  return {
    id: input.id,
    name: input.name
  }
}

masseussesRouter.get('/', async (req, res) => {
  try {
    res.json(masseusses.map(formatMasseusse))
  } catch (exception) {
    console.log(exception)
    res.status(400).json({ error: 'bad request' })
  }
})

module.exports = masseussesRouter