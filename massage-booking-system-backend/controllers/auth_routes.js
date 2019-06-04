const passport = require('passport')
const authRouter = require('express').Router()

authRouter.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

authRouter.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/index')
})

authRouter.get('/logout', (req, res) => {
  req.logout()
  res.send(req.user)
})

module.exports = authRouter