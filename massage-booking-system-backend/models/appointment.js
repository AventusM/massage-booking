const mongoose = require('mongoose')

const appointmentSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    masseusse_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema)


module.exports = Appointment


