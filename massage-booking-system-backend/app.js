const http = require('http')
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

const masseussesRouter = require('./controllers/masseusses')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use('/api/masseusses', masseussesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.use(cors())
app.use(express.static('build'))


module.exports = app