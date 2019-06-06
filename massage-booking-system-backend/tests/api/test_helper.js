const User = require('../../models/user')

const fakeGoogleAccountData = {
  googleId: '123456789',
  name: 'Test account',
  email: 'test@test.account'
}

const fakeGoogleUser = new User(fakeGoogleAccountData)
module.exports = {
  fakeGoogleUser
}
