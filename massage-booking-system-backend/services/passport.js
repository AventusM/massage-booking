const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const config = require('../utils/config')
const User = require('../models/user')

passport.serializeUser((user, done) => {
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
          if (profile.emails[0].value.split('@')[1] === config.EMAIL_SUFFIX || config.EMAIL_WHITELIST.includes(profile.emails[0].value)) {
            let admin = false
            if (profile.emails[0].value === config.INITIAL_ADMIN) {
              admin = true
            }
            new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              admin: admin,
              avatarUrl: profile.photos[0].value
            })
              .save()
              .then(createdUser => done(null, createdUser))
          } else {
            done(null, false, { message: 'email suffix not allowed' })
          }
        }
      })
    }
  )
)
