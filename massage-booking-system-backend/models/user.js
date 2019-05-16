const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    appointments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointment'
        }
    ]
})

const User = mongoose.model('User', userSchema)


module.exports = User


