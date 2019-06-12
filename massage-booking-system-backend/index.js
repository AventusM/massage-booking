const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const server = http.createServer(app)
//const gen = require('./utils/appointmentGenerator')
//everyWeek = every week at given times this method is scheduled to check the database and populate it with appointments when necissary
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
 /* let date = new Date()
  date.setUTCHours(8,55,0,0)
  gen.generateAppointmentsForDay(date)
  console.log('toimi')
*/})
