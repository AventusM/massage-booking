const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    googleId: String,
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
        type: Boolean
    },
    passwordHash: {
        type: String
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


