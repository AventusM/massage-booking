const mongoose = require('mongoose')

const User = mongoose.model('User', {
  id: Number,
  name: String,
  number: String,
  email: String,
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment'
    }
  ]
})

module.exports = User


