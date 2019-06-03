const mongoose = require('mongoose')

const masseusseSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
})

const Masseusse = mongoose.model('Masseusse', masseusseSchema)
module.exports = Masseusse
