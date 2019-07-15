const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const router = express.Router()
const cookieSession = require('cookie-session')
const passport = require('passport')
const { MongoMemoryServer } = require('mongodb-memory-server')

const protectedRoute = require('./utils/protectedRoute')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

// This route is available without authentication
const tvRouter = require('./controllers/tv')
app.use('/api/tv', tvRouter)

// Makes passport configuration run by itself. No need for app.use(passportConfig) etc
require('./services/passport')

// 1day = 24 * 60 * 60 * 1000
// Use multiplier as you wish
// You can actually just faceroll the cookie key
// More elements in keys array -> a cookie key is randomly chosen out of those
// for additional level of security
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY],
  })
)
app.use(passport.initialize())
app.use(passport.session())

logger.info('connecting to', config.MONGODB_URI)
app.use(cors())

if (process.env.NODE_ENV === 'test') {
  const mongoServer = new MongoMemoryServer()

  mongoose.Promise = Promise
  mongoServer.getConnectionString().then(mongoUri => {
    const mongooseOpts = {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      useNewUrlParser: true
    }

    mongoose.connect(mongoUri, mongooseOpts)

    mongoose.connection.on('error', e => {
      if (e.message.code === 'ETIMEDOUT') {
        console.log(e)
        mongoose.connect(mongoUri, mongooseOpts)
      }
      console.log(e)
    })

    mongoose.connection.once('open', () => {
      console.log(`MongoDB successfully connected to ${mongoUri}`)
    })
  })
} else {
  mongoose
    .connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
      logger.info('connected to MongoDB')
    })
    .catch(error => {
      logger.error('error connection to MongoDB:', error.message)
    })
}

const appointmentsRouter = require('./controllers/appointments')
const usersRouter = require('./controllers/users')
const statsRouter = require('./controllers/stats')
const authRouter = require('./controllers/auth_routes')
const stretchingRouter = require('./controllers/stretching')
const announcementsRouter = require('./controllers/announcement')
const infoItemsRouter = require('./controllers/infoItems')

app.use('/auth', authRouter)
app.use('/api', router)
app.use('/api/appointments', appointmentsRouter)
app.use('/api/users', usersRouter)
app.use('/api/stats', statsRouter)
app.use('/api/stretching', stretchingRouter)
app.use('/api/announcements', announcementsRouter)
app.use('/api/info', infoItemsRouter)

// ROUTE PROTECTION -- DISABLE FOR OWN TESTING IN REST CLIENT ETC.
router.use(protectedRoute.routeProtector)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('build'))
} else {
  app.use(morgan('dev'))
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
