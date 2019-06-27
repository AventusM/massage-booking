const express = require('express')
const InfoItem = require('../models/InfoItem')
const infoItemRouter = express.Router()
const bodyParser = require('body-parser')
infoItemRouter.use(bodyParser.json())


infoItemRouter.get('/', async (req, res, next) => {
  try {
    const infoItems = await InfoItem.find({})
    res.json(infoItems)
  } catch (exception) {
    next(exception)
  }
})

infoItemRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body
    const item = new InfoItem({
      header: body.header,
      content: body.content
    })
    const savedItem = await item.save()
    res.json(savedItem)
  } catch (exception) {
    next(exception)
  }
})

infoItemRouter.delete('/:id',  async (req, res, next) => {
  try {
    const item = await InfoItem.findById({ _id: req.params.id })
    await item.remove()
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
})



module.exports = infoItemRouter