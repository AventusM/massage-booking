const http = require('http')
const express = require('express')
const cors = require('cors')
const app = express()

const config = require('./utils/config')
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

module.exports = app