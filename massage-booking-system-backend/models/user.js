const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    number: {
        type: String
    },
    email: {
        type: String,
        require: true
    },
    admin: {
        type: Boolean,
        require: true
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


