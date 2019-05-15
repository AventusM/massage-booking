const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')

const logger = require('./utils/logger')
const middleware = require('./utils/middleware')


const masseussesRouter = require('./controllers/masseusses')
const usersRouter = require('./controllers/users')

app.use('/api/masseusses', masseussesRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.use(cors())
app.use(express.static('build'))

const server = http.createServer(app)
const PORT = 3001 // TODO -- CHANGE TO config.port
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


module.exports = {
  app, server
}