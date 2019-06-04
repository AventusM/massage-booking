const http = require('http')
const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const router = express.Router()
const jsonWebToken = require('jsonwebtoken')

// const protectedRoute = require('./utils/protectedRoute')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(new GoogleStrategy({
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
  (accessToken, refreshToken, profile, done) => {
    console.log('accesstoken', accessToken)
    console.log('refreshtoken', refreshToken)
    console.log('profile', profile)
  }))

app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }))

app.get('/auth/google/callback', passport.authenticate('google'))

logger.info('connecting to', config.MONGODB_URI)
app.use(cors())

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

// app.use(passport.initialize());
// app.use(passport.session());


const masseussesRouter = require('./controllers/masseusses')
const appointmentsRouter = require('./controllers/appointments')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const statsRouter = require('./controllers/stats')

app.use('/api', router)
app.use('/api/masseusses', masseussesRouter)
app.use('/api/appointments', appointmentsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/stats', statsRouter)

// router.use(protectedRoute.routeProtector)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('build'))
} else {
  app.use(morgan('dev'))
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app