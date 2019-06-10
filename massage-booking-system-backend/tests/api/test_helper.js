const User = require('../../models/user')
const randomNumber = () => Math.floor(Math.random() * 99999999)

const fakeGoogleAccountData = {
  googleId: `123456789${randomNumber()}`,
  name: `Test account${randomNumber()}`,
  email: `test@test.account${randomNumber()}`
}

const fakeGoogleAccountData2 = {
  googleId: `123456789${randomNumber()}`,
  name: `Test account${randomNumber()}`,
  email: `test@test.account${randomNumber()}`
}
const fakeGoogleUser = new User(fakeGoogleAccountData)
const fakeGoogleUser2 = new User(fakeGoogleAccountData2)

// Putting things to the end of this century...
// const original_test_appointment_tuesday = {
//   masseusse_id: 'this_is_not_used',
//   user_id: fakeGoogleUser._id,
//   start_date: '2090-07-04T11:15:00.000Z',
//   end_date: '2090-07-04T11:45:00.000Z',
// }

// const test_appointment_1_week_from_original_test_appointment_tuesday = {
//   masseusse_id: 'this_is_not_used',
//   user_id: fakeGoogleUser._id,
//   start_date: '2090-07-11T11:15:00.000Z',
//   end_date: '2090-07-11T11:45:00.000Z',
// }

// const test_appointment_3_weeks_minus_one_day_from_original_test_appointment_monday = {
//   masseusse_id: 'this_is_not_used',
//   user_id: fakeGoogleUser._id,
//   start_date: '2090-07-24T11:15:00.000Z',
//   end_date: '2090-07-24T11:45:00.000Z',
// }

// const original_test_appointment_fakeGoogleUser = new Appointment(original_test_appointment_tuesday)
// const test_appointment_1_week_from_original_fakeGoogleUser = new Appointment(test_appointment_1_week_from_original_test_appointment_tuesday)
// const test_appointment_3_weeks_minus_one_day_from_original_fakeGoogleUser = new Appointment(test_appointment_3_weeks_minus_one_day_from_original_test_appointment_monday)


module.exports = {
  fakeGoogleUser,
  fakeGoogleUser2
  // original_test_appointment_fakeGoogleUser,
  // test_appointment_1_week_from_original_fakeGoogleUser,
  // test_appointment_3_weeks_minus_one_day_from_original_fakeGoogleUser
}
