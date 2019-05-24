const http = require('http')
const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const ProtectedRoutes = express.Router()
const jsonWebToken = require('jsonwebtoken')


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
const appointmentsRouter = require('./controllers/appointments')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(morgan('dev'))
app.use('/api', ProtectedRoutes)
app.use('/api/masseusses', masseussesRouter)
app.use('/api/appointments', appointmentsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


// 1. CAN REGISTER NEW USER WITHOUT TOKEN
// 2.CAN LOGIN WITHOUT TOKEN
const no_token_api_white_list = [
  { url: '/users', method: 'POST' },
  { url: '/login', method: 'POST' }
]

ProtectedRoutes.use((req, res, next) => {
  const found_white_list_match = no_token_api_white_list.find(entry => entry.url === req.url)
  if (found_white_list_match) {
    next()
  } else {

    let token = null
    let authorization = req.headers.authorization

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      console.log('ollaan täällä!!!')
      token = authorization.substring(7)
    }

    console.log('token', token)
    const decodedToken = jsonWebToken.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    next()
  }
})

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('build'))
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = app