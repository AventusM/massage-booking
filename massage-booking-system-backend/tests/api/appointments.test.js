const supertest = require('supertest')
const mongoose = require('mongoose')
const user_helper = require('./test_helper')
const app = require('../../app')
const api = supertest(app)

const timer = require('../../utils/timer')
const generator = require('../../utils/appointmentGenerator')
const appointment_helper = require('../../tests/appointmentGeneration/test_helper')

const User = require('../../models/user')
const Appointment = require('../../models/appointment')


const randomNumber = () => Math.floor(Math.random() * 99999999)
const random_user = () => new User({
  googleId: `123456789${randomNumber()}`,
  name: `Test account${randomNumber()}`,
  email: `test@test.account${randomNumber()}`
})

const generate_apps_to_db_for_date = async (date) => {
  let day = await timer.formatTime(new Date(date))
  await timer.ifNotInDBCreateDay(day)
  await appointment_helper.wait(13)
  await generator.generateAppointmentsForDay(day)
  await appointment_helper.wait(13)
}

const DEFAULT_APPOINTMENTS_PER_DAY = 13
const USERS_API_PATH = '/api/users'
const APPOINTMENTS_API_PATH = '/api/appointments'
const APPOINTMENT_RESERVATION_KEY = 1
const APPOINTMENT_CANCELLATION_KEY = 0

describe('GET appointments', () => {
  beforeEach(async () => {
    await appointment_helper.emptyTheDatabaseOfAppointments()
    await generate_apps_to_db_for_date('July 15, 2019 12:00:00')
  })

  it('should show 13 appointment slots for a single day', async () => {
    const response = await api.get(APPOINTMENTS_API_PATH)
    expect(response.body.length).toBe(DEFAULT_APPOINTMENTS_PER_DAY)
  })
})

// Problem with tests
// Must have random_user() function straight up in this file instead of exporting.
// Otherwise it will fetch it correctly once for 1 test and for the rest returns undefined
describe('PUT appointments', () => {

  beforeEach(async () => {
    await appointment_helper.emptyTheDatabaseOfAppointments()
    await User.deleteMany({})
    await random_user().save()
    await generate_apps_to_db_for_date('July 15, 2019 12:00:00')
  })

  it('when user wants to create an appointment when not having any, the appointment SHOULD change its type', async () => {
    const users_response = await api.get(USERS_API_PATH)
    const original_user = users_response.body[0]

    const appointment_response = await api.get(APPOINTMENTS_API_PATH)
    const original_appointment = appointment_response.body[0]

    await api
      .put(`${APPOINTMENTS_API_PATH}/${original_appointment._id}`)
      .send({ user_id: original_user._id, type_of_reservation: 1 })

    const updated_original_appointment_response = await api.get(`${APPOINTMENTS_API_PATH}/${original_appointment._id}`)
    const updated_original_appointment = updated_original_appointment_response.body

    expect(original_appointment.type_of_reservation).toBe(APPOINTMENT_CANCELLATION_KEY)
    expect(updated_original_appointment.type_of_reservation).toBe(APPOINTMENT_RESERVATION_KEY)

  })

  it('appointment type should not change if user attempts to create consecutive appointments in too small intervals', async () => {
    const users_response = await api.get(USERS_API_PATH)
    const original_user = users_response.body[0]

    const appointment_response = await api.get(APPOINTMENTS_API_PATH)
    const original_appointment = appointment_response.body[0]
    const second_app_same_day = appointment_response.body[1]

    await api
      .put(`${APPOINTMENTS_API_PATH}/${original_appointment._id}`)
      .send({ user_id: original_user._id, type_of_reservation: 1 })

    await api
      .put(`${APPOINTMENTS_API_PATH}/${second_app_same_day._id}`)
      .send({ user_id: original_user._id, type_of_reservation: 1 })

    const updated_original_response = await api.get(`${APPOINTMENTS_API_PATH}/${original_appointment._id}`)
    const updated_original = updated_original_response.body

    const updated_one_month_response = await api.get(`${APPOINTMENTS_API_PATH}/${second_app_same_day._id}`)
    const updated_one_month = updated_one_month_response.body

    expect(updated_original.type_of_reservation).toBe(1)
    expect(updated_one_month.type_of_reservation).toBe(0)
  })

  it('when user wants to create an appointment when having one, the appointment SHOULD change its type if enough time has passed after previous user appointment', async () => {
    // Generate appointments 1 month from original
    await generate_apps_to_db_for_date('August 15, 2019 12:00:00')

    const users_response = await api.get(USERS_API_PATH)
    const original_user = users_response.body[0]

    const appointment_response = await api.get(APPOINTMENTS_API_PATH)
    const original_appointment = appointment_response.body[0]
    // MASSIVE TRUST IS BEING GIVEN THAT THESE TWO WILL GIVE DIFFERENT DAYS
    // MASSIVE TRUST IS BEING GIVEN THAT THESE TWO WILL GIVE DIFFERENT DAYS
    // MASSIVE TRUST IS BEING GIVEN THAT THESE TWO WILL GIVE DIFFERENT DAYS
    // TODO -- TODO -- TODO --
    // TODO -- TODO -- TODO --
    // TODO -- TODO -- TODO --
    // search directly from db by date -> get _id and update that way
    const one_month_from_original = appointment_response.body[25]

    await api
      .put(`${APPOINTMENTS_API_PATH}/${original_appointment._id}`)
      .send({ user_id: original_user._id, type_of_reservation: 1 })

    await api
      .put(`${APPOINTMENTS_API_PATH}/${one_month_from_original._id}`)
      .send({ user_id: original_user._id, type_of_reservation: 1 })

    const updated_original_response = await api.get(`${APPOINTMENTS_API_PATH}/${original_appointment._id}`)
    const updated_original = updated_original_response.body

    const updated_one_month_response = await api.get(`${APPOINTMENTS_API_PATH}/${one_month_from_original._id}`)
    const updated_one_month = updated_one_month_response.body

    expect(updated_original.type_of_reservation).toBe(1)
    expect(updated_one_month.type_of_reservation).toBe(1)

  })

  it('when user wants to cancel own appointment, the appointment SHOULD change its type', async () => {
    const users_response = await api.get(USERS_API_PATH)
    const original_user = users_response.body[0]

    const appointment_response = await api.get(APPOINTMENTS_API_PATH)
    const original_appointment = appointment_response.body[0]

    await api
      .put(`${APPOINTMENTS_API_PATH}/${original_appointment._id}`)
      .send({ user_id: original_user._id, type_of_reservation: 1 })

    const updated_original_response = await api.get(`${APPOINTMENTS_API_PATH}/${original_appointment._id}`)
    const updated_original = updated_original_response.body
    expect(updated_original.type_of_reservation).toBe(1)

    await api
      .put(`${APPOINTMENTS_API_PATH}/${updated_original._id}`)
      .send({ user_id: original_user._id, type_of_reservation: 0 })

    const cancelled_after_update_original_response = await api.get(`${APPOINTMENTS_API_PATH}/${updated_original._id}`)
    const cancelled_after_update_original = cancelled_after_update_original_response.body
    expect(cancelled_after_update_original.type_of_reservation).toBe(0)

  })

  // it('when user wants to cancel someone elses appointments, the user should get permabanned', async () => {
  //   expect(true).toBe(false)
  // })
})

afterAll(() => setTimeout(() => process.exit(), 1000))

