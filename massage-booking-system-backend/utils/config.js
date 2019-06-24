if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let CLIENT_ID = process.env.CLIENT_ID
let CLIENT_SECRET = process.env.CLIENT_SECRET
let COOKIE_KEY = process.env.COOKIE_KEY
let EMAIL_SUFFIX = process.env.EMAIL_SUFFIX
let INITIAL_ADMIN = process.env.INITIAL_ADMIN
let EMAIL_WHITELIST = process.env.EMAIL_WHITELIST.split(',')


if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT,
  CLIENT_ID,
  CLIENT_SECRET,
  COOKIE_KEY,
  EMAIL_SUFFIX,
  INITIAL_ADMIN,
  EMAIL_WHITELIST
}
