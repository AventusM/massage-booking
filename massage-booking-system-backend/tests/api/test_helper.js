const User = require('../../models/user')
const Appointment = require('../../models/appointment')

const fakeGoogleAccountData = {
  googleId: '123456789',
  name: 'Test account',
  email: 'test@test.account',
}

const fakeGoogleUser = new User(fakeGoogleAccountData)

// Awaiting passing PR
const valid_test_appointment = {
  user_id: fakeGoogleUser._id,
  start_date: null,
  end_date: null,
}

const invalid_test_appointment = {}

module.exports = {
  fakeGoogleUser,
  valid_test_appointment,
  invalid_test_appointment,
}
