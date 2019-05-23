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
    start_time: {
        type: Date,
        default: () => Date.now()
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema)


module.exports = Appointment


