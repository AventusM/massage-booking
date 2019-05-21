const mongoose = require('mongoose')


// MODIFY end_time LATER OMAIGAWD
// MODIFY end_time LATER OMAIGAWD
// MODIFY end_time LATER OMAIGAWD
// MODIFY end_time LATER OMAIGAWD
const appointmentSchema = mongoose.Schema({
    masseusse_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    start_time: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    end_time: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    type_of_reservation: {
        type: Number,
        required: true
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema)


module.exports = Appointment


