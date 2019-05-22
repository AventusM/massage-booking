const mongoose = require('mongoose')

const appointmentSchema = mongoose.Schema({
    masseusse_id: {
        type: String,
    },
    user_id: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: Number,
        required: true
        }
})

const Appointment = mongoose.model('Appointment', appointmentSchema)


module.exports = Appointment


