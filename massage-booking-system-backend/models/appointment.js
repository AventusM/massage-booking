const mongoose = require('mongoose')

const appointmentSchema = mongoose.Schema({
  user_id: {
    type: String,
    default: null
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  type_of_reservation: {
    type: Number,
    default: 0,
  },
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment
