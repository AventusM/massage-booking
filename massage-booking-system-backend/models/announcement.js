const mongoose = require('mongoose')

const announcementSchema = mongoose.Schema({
  message: String
})

const Announcement = mongoose.model('Announcement', announcementSchema)

module.exports = Announcement