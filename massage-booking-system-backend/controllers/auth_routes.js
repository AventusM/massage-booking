const passport = require('passport')
const authRouter = require('express').Router()

authRouter.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }))

authRouter.get('/google/callback', passport.authenticate('google'))

module.exports = authRouter