const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../../app')
const api = supertest(app)
const User = require('../../models/user')
const Appointment = require('../../models/appointment')
const appointment_helper = require('../../tests/appointmentGeneration/test_helper')
const timer = require('../../utils/timer')

const delete_user = async (id) => {
  await api
    .delete(`/api/users/${id}`)
}
const generate_apps_to_db_for_date = async (date, waitTime) => {
  await timer.ifNotInDBCreateDay(date)
  await appointment_helper.wait(waitTime)
}
const update_appointment = async (original_appointment_id, param_user_id, param_type_of_reservation) => {
  await api
    .put(`/api/appointments/${original_appointment_id}`)
    .send({ user_id: param_user_id, type_of_reservation: param_type_of_reservation })
}

describe('Appointments and one user', () => {
  beforeEach(async () => {
    jest.setTimeout(1000000)
    await appointment_helper.emptyTheDatabaseOfUsers()
    let date = new Date('July 14, 2019 12:00:00')
    const dateNowStub = jest.fn(() => date)
    global.Date.now = dateNowStub

    await appointment_helper.emptyTheDatabaseOfAppointments()
    await generate_apps_to_db_for_date('July 15, 2019 12:00:00', 13)
  })

  it('when user is deleted all appointments they had are freed', async () => {
    const user = new User({
      admin: true,
      googleId: '123456789',
      name: 'Test account',
      email: 'test@test.account'
    })
    await user.save()

    const appointments = await Appointment.find({})
    const appointment = appointments[0]

    await update_appointment(appointment._id, user._id, 1)

    await delete_user(user._id)
    const freeAppointment = await Appointment.findById(appointment._id)
    const deletedUser = await User.findById(user._id)

    expect(freeAppointment.type_of_reservation).toBe(0)
    expect(freeAppointment.user_id).toBe(null)
    expect(deletedUser).toBe(null)
  })
})
afterAll(async () => {
  await mongoose.disconnect()
})