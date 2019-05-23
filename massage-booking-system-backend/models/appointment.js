const mongoose = require('mongoose')

const appointmentSchema = mongoose.Schema({
    masseusse_id: {
        type: String,
    },
    user_id: {
        type: String,
    },
    start_time: {
        type: Date,
        default: () => Date.now()
    },
    type_of_reservation: {
        type: Number,
        default: 1
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema)


module.exports = Appointment


