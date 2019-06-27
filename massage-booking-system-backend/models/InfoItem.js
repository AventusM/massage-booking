const mongoose = require('mongoose')

const infoItemSchema = mongoose.Schema({
  header: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  }
})

const InfoItem = mongoose.model('Info', infoItemSchema)

module.exports = InfoItem