const express = require('express')
const Masseusse = require('../models/masseusse')
const masseussesRouter = express.Router()
const bodyParser = require('body-parser')
masseussesRouter.use(bodyParser.json())


const formatMasseusse = (input) => {
  return {
    _id: input.id,
    name: input.name
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

module.exports = masseussesRouter