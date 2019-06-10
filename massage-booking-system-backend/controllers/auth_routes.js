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
    // res.json(res.req.user)
    res.redirect('/')
  }
)

authRouter.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
  // res.send(req.user)
})

module.exports = authRouter
