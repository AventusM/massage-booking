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

masseussesRouter.get('/', async (req, res, next) => {
  try {
    res.json(masseusses.map(formatMasseusse))
  } catch (exception) {
    next(exception)
  }
})

module.exports = masseussesRouter