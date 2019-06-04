const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const config = require('../utils/config')

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