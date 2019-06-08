const mongoose = require('mongoose')

// passwordhash removed for foreseeable future
const userSchema = mongoose.Schema({
  googleId: {
    type: String,
    required: true
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
    default: false
  },
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
    },
  ],
})

const User = mongoose.model('User', userSchema)

module.exports = User
