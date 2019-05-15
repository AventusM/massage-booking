const mongoose = require('mongoose')

const Masseusse = mongoose.model('Masseusse', {
  id: Number,
  name: String
})

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