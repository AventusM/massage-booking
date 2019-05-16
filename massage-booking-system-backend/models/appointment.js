const mongoose = require('mongoose')

const appointmentSchema = mongoose.Schema({
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


