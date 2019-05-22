const mongoose = require('mongoose')


// MODIFY end_time LATER OMAIGAWD
// MODIFY end_time LATER OMAIGAWD
// MODIFY end_time LATER OMAIGAWD
// MODIFY end_time LATER OMAIGAWD
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
    },
    start_time: {
        type: Date,
        default: () => Date.now()
    },
    end_time: {
        type: Date,
        default: () => Date.now()
    },
    type_of_reservation: {
        type: Number,
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema)


module.exports = Appointment


