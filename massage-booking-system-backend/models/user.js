const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
    },
  ],
  stretchingSessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stretching',
    }
  ]
})

const User = mongoose.model('User', userSchema)

module.exports = User
