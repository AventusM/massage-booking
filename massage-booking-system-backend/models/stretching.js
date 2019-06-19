const mongoose = require('mongoose')

const stretchingSchema = mongoose.Schema({
    date:{
        type: Date, required:true
    },
    time:{
        type: String, required:true
    },
    users:[
        {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User'
  }
]
    




})

const Stretching = mongoose.model('Stretching', stretchingSchema)

module.exports = Stretching
