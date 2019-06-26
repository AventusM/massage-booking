const express = require('express')
const Appointment = require('../models/appointment')
const tvRouter = express.Router()
const bodyParser = require('body-parser')
tvRouter.use(bodyParser.json())
const User = require('../models/user')
const moment = require('moment')
const Announcement = require('../models/announcement')

const formatTV = input => {
  return {
    _id: input._id,
    user_id: input.user_id,
    start_date: input.start_date,
    end_date: input.end_date,
    type_of_reservation: input.type_of_reservation,
    user: { name: input.name }
  }
}

tvRouter.get('/', async (req, res, next) => {
  try {
    const start = moment().subtract(1, 'days')
    const end = moment().add(7, 'days')

    const appointments = await Appointment.find({
      start_date: {
        $gte: start,
        $lte: end,
      },
    })

    const users = await User.find({})
    const announcements = await Announcement.find().limit(1).sort({ $natural: -1 })

    const tv = appointments.map(e => {
      if (e.user_id !== null) {
        const matchingUser = users.find(x => String(x._id) === String(e.user_id))
        return { ...e._doc, name: matchingUser.name }
      } else {
        return { ...e._doc, name: '' }
      }
    })
    let format = tv.map(formatTV)
    const announcement = (announcements[0] === undefined) ? { message: '' } : { message: announcements[0].message }
    format.push(announcement)
    res.json(format)


  } catch (exception) {
    next(exception)
  }
})

module.exports = tvRouter
