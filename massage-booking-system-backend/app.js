const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const router = express.Router()
const cookieSession = require('cookie-session')
const passport = require('passport')

const protectedRoute = require('./utils/protectedRoute')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
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

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connection to MongoDB:', error.message)
  })

const appointmentsRouter = require('./controllers/appointments')
const usersRouter = require('./controllers/users')
const statsRouter = require('./controllers/stats')
const authRouter = require('./controllers/auth_routes')

app.use('/auth', authRouter)
app.use('/api', router)
app.use('/api/appointments', appointmentsRouter)
app.use('/api/users', usersRouter)
app.use('/api/stats', statsRouter)

router.use(protectedRoute.routeProtector)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('build'))
} else {
  app.use(morgan('dev'))
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
