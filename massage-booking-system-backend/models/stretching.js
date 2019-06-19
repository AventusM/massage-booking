const mongoose = require('mongoose')

const stretchingSchema = mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    time: {
        type: String,

    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

const Stretching = mongoose.model('Stretching', stretchingSchema)
module.exports = Stretching
