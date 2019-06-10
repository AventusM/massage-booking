const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const config = require('../utils/config')
const User = require('../models/user')

passport.serializeUser((user, done) => {
  console.log('user.id', user.id)
  console.log('user._id', user._id)
  // Could use profile.id by using it from user model. This method allows multiple ways for various social logins
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(foundUser => {
    done(null, foundUser)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // CHECK IF UNITY EMAIL ADDRESS INCLUDED
      // IF NO UNITY ADDRESS --> done(null, false)
      // or something like that which should fail

      User.findOne({ googleId: profile.id }).then(foundUser => {
        if (foundUser) {
          // User has already been registered, continue with existing user
          done(null, foundUser)
        } else {
          // New user registration, add to database
          new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          })
            .save()
            .then(createdUser => done(null, createdUser))
        }
      })
    }
  )
)
