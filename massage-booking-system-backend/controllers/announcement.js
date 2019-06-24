const express = require('express')
const Announcement = require('../models/announcement')
const announcementsRouter = express.Router()
const bodyParser = require('body-parser')
announcementsRouter.use(bodyParser.json())

const formatAnnouncement = (input) => {
  return {
    _id: input._id,
    message: input.message
  }
}

announcementsRouter.get('/', async (req, res, next) => {
  try {
    const announcements = await Announcement.find().limit(1).sort({ $natural: -1 })
    res.json(formatAnnouncement(announcements[0]))
  } catch (exception) {
    next(exception)
  }
})

announcementsRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body
    const announcement = new Announcement({
      message: body.message
    })
    const savedAnnouncement = await announcement.save()
    res.json(formatAnnouncement(savedAnnouncement))
  } catch (exception) {
    next(exception)
  }
})


module.exports = announcementsRouter