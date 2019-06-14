const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const server = http.createServer(app)
const scheduler = require('./utils/scheduler')
/**
 * scheduler schedules appointment generation for the next 6 months when necissary
 */
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
  scheduler.everyDay
})
