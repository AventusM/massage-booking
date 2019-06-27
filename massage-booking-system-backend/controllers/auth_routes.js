const passport = require('passport')
const authRouter = require('express').Router()

authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
)

authRouter.get(
  '/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/')
  }
)

authRouter.get('/logout', (req, res) => {
  req.session = null
  res.redirect('/')
})

module.exports = authRouter
