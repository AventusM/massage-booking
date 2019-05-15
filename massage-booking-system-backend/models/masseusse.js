const mongoose = require('mongoose')

const masseusseSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    required: true
  }
})

const Masseusse = mongoose.model('Masseusse', masseusseSchema)
module.exports = Masseusse


// let masseusses = [
//   {
//     "id": 1,
//     "name": "Hanna Hieroja"
//   },
//   {
//     "id": 2,
//     "name": "Manne Massager"
//   }
// ]

// module.exports = masseusses