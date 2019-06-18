const supertest = require('supertest')
const mongoose = require('mongoose')
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

const generate_apps_to_db_for_date = async (date, waitTime) => {
  await timer.ifNotInDBCreateDay(date)
  await appointment_helper.wait(waitTime)
}

const DEFAULT_APPOINTMENTS_PER_DAY = 13
const USERS_API_PATH = '/api/users'
const APPOINTMENTS_API_PATH = '/api/appointments'
const APPOINTMENT_RESERVATION_KEY = 1
const APPOINTMENT_CANCELLATION_KEY = 0
const ACCEPTED_APPOINTMENT = 1
const FREE_APPOINTMENT = 0
const FIRST_DAY_FIRST_INDEX = 0
const FIRST_DAY_SECOND_INDEX = 1
const SECOND_DAY_LAST_INDEX = 25

const get_random_user = async (index) => {
  const user_response =
    await api
      .get(USERS_API_PATH)

  return user_response.body[index]
}

const get_random_appointment = async (index) => {
  const appointment_response =
    await api
      .get(APPOINTMENTS_API_PATH)

  return appointment_response.body[index]
}

const update_appointment = async (original_appointment_id, param_user_id, param_type_of_reservation) => {
  await api
    .put(`${APPOINTMENTS_API_PATH}/${original_appointment_id}`)
    .send({ user_id: param_user_id, type_of_reservation: param_type_of_reservation })
}

const get_appointment = async (id) => {
  const appointment_response =
    await api
      .get(`${APPOINTMENTS_API_PATH}/${id}`)

  return appointment_response.body
}

describe('GET appointments', () => {
  beforeEach(async () => {
    let date = new Date('July 14, 2019 12:00:00')
    const dateNowStub = jest.fn(() => date)
    global.Date.now = dateNowStub
    await appointment_helper.emptyTheDatabaseOfAppointments()
    await generate_apps_to_db_for_date('July 15, 2019 12:00:00', 13)
  })

  it('should show 13 appointment slots for a single day', async () => {
    const response = await api.get(APPOINTMENTS_API_PATH)
    expect(response.body.length).toBe(DEFAULT_APPOINTMENTS_PER_DAY)
  })
})

describe('PUT appointments', () => {

  let original_user
  let original_appointment

  beforeEach(async () => {
    let date = new Date('July 14, 2019 12:00:00')
    const dateNowStub = jest.fn(() => date)
    global.Date.now = dateNowStub
    await appointment_helper.emptyTheDatabaseOfAppointments()
    await User.deleteMany({})
    await random_user().save()
    await generate_apps_to_db_for_date('July 15, 2019 12:00:00',13)

    // User has 0 appointments by default and all appointments are free
    original_user = await get_random_user(FIRST_DAY_FIRST_INDEX)
    original_appointment = await get_random_appointment(FIRST_DAY_FIRST_INDEX)
  })

  it('when user wants to create an appointment when not having any, the appointment SHOULD change its type', async () => {
    await update_appointment(original_appointment._id, original_user._id, APPOINTMENT_RESERVATION_KEY)
    const updated_original_appointment = await get_appointment(original_appointment._id)

    expect(original_appointment.type_of_reservation).toBe(FREE_APPOINTMENT)
    expect(updated_original_appointment.type_of_reservation).toBe(ACCEPTED_APPOINTMENT)
  })

  it('appointment type should not change if user attempts to create consecutive appointments in too small intervals', async () => {
    const second_app_same_day = await get_random_appointment(FIRST_DAY_SECOND_INDEX)

    await update_appointment(original_appointment._id, original_user._id, APPOINTMENT_RESERVATION_KEY)
    await update_appointment(second_app_same_day._id, original_user._id, APPOINTMENT_RESERVATION_KEY)

    const updated_original_appointment = await get_appointment(original_appointment._id)
    const updated_same_day_appointment = await get_appointment(second_app_same_day._id)

    expect(updated_original_appointment.type_of_reservation).toBe(ACCEPTED_APPOINTMENT)
    expect(updated_same_day_appointment.type_of_reservation).toBe(FREE_APPOINTMENT)
  })

  it('when user wants to create an appointment when having one, the appointment SHOULD change its type if enough time has passed after previous user appointment', async () => {
    // // Generate appointments 1 month from original
    await generate_apps_to_db_for_date('August 15, 2019 12:00:00', 26)
    const one_month_after_original_appointment = await get_random_appointment(SECOND_DAY_LAST_INDEX)
    //console.log('TÄMÄ', one_month_after_original_appointment)
    await update_appointment(original_appointment._id, original_user._id, APPOINTMENT_RESERVATION_KEY)
    await update_appointment(one_month_after_original_appointment._id, original_user._id, APPOINTMENT_RESERVATION_KEY)

    const updated_original_appointment = await get_appointment(original_appointment._id)
    const updated_one_month_after_original_appointment = await get_appointment(one_month_after_original_appointment._id)

    expect(updated_original_appointment.type_of_reservation).toBe(ACCEPTED_APPOINTMENT)
    expect(updated_one_month_after_original_appointment.type_of_reservation).toBe(ACCEPTED_APPOINTMENT)
  })

  it('when user wants to cancel own appointment, the appointment SHOULD change its type', async () => {
    // Perform app reservation
    await update_appointment(original_appointment._id, original_user._id, APPOINTMENT_RESERVATION_KEY)
    const updated_original_appointment = await get_appointment(original_appointment._id)
    expect(updated_original_appointment.type_of_reservation).toBe(ACCEPTED_APPOINTMENT)

    // Perform app cancellation
    await update_appointment(updated_original_appointment._id, original_user._id, APPOINTMENT_CANCELLATION_KEY)
    const cancelled_original_appointment = await get_appointment(updated_original_appointment._id)
    expect(cancelled_original_appointment.type_of_reservation).toBe(FREE_APPOINTMENT)
  })

  /*it.skip('when user wants to cancel someone elses appointments, appointment should not be canceled', async () => {
    expect(true).toBe(false)
  })*/
})
afterAll(async() => {
  await mongoose.disconnect()
})