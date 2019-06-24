const mongoose = require('mongoose')

const stretchingSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  users: [
    {
      data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      description: {
        type: String,
        required: true
      }
    }
  ]
})

const Stretching = mongoose.model('Stretching', stretchingSchema)
module.exports = Stretching
