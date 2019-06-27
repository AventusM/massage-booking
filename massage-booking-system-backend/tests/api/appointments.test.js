const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../../app')
const api = supertest(app)

const timer = require('../../utils/timer')
const appointment_helper = require('../../tests/appointmentGeneration/test_helper')

const User = require('../../models/user')
const Appointment = require('../../models/appointment')


const randomNumber = () => Math.floor(Math.random() * 99999999)
const random_user = () => new User({
  googleId: `123456789${randomNumber()}`,
  name: `Test account${randomNumber()}`,
  email: `test@test.account${randomNumber()}`,
  admin: true
})

const generate_apps_to_db_for_date = async (date, waitFor) => {
  await timer.ifNotInDBCreateDay(date)
  await appointment_helper.wait(waitFor)
}

const DEFAULT_APPOINTMENTS_PER_DAY = 13
const USERS_API_PATH = '/api/users'
const APPOINTMENTS_API_PATH = '/api/appointments'
const APPOINTMENT_RESERVATION_KEY = 1
const APPOINTMENT_CANCELLATION_KEY = 0
const ACCEPTED_APPOINTMENT = 1
const FREE_APPOINTMENT = 0
const FIRST_DAY_SECOND_INDEX = 1
const SECOND_DAY_LAST_INDEX = 25

const get_users = async () => {
  const user_response =
    await api
      .get(USERS_API_PATH)

  return user_response.body
}

const get_appointments = async () => {
  const appointment_response =
    await api
      .get(APPOINTMENTS_API_PATH)

  return appointment_response.body
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

const remove_appointment = async (original_appointment_id) => {
  await api
    .put(`${APPOINTMENTS_API_PATH}/${original_appointment_id}/remove`)
    .send({ original_appointment_id })
}
const remove_day_of_appointments = async (date) => {
  await api
    .put(`${APPOINTMENTS_API_PATH}/${date}/removeDate`)
    .send({ date })
}

describe('GET appointments', () => {
  beforeEach(async () => {
    jest.setTimeout(1000000)
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

  let user_list
  let appointment_list
  let original_user
  let original_appointment

  beforeEach(async () => {
    jest.setTimeout(1000000)

    let date = new Date('July 14, 2019 12:00:00')
    const dateNowStub = jest.fn(() => date)
    global.Date.now = dateNowStub
    await appointment_helper.emptyTheDatabaseOfAppointments()
    await appointment_helper.emptyTheDatabaseOfUsers()
    await random_user().save()
    await generate_apps_to_db_for_date('July 15, 2019 12:00:00', 13)
    // Generate appointments 1 month from original
    // This is currently for a single test case, but appointment_list requires this
    await generate_apps_to_db_for_date('August 15, 2019 12:00:00', 26)

    // User has 0 appointments by default and all appointments are free
    user_list = await get_users()
    original_user = user_list[0]
    appointment_list = await get_appointments()
    original_appointment = appointment_list[0]
  })

  it('when user wants to create an appointment when not having any, the appointment SHOULD change its type', async () => {
    await update_appointment(original_appointment._id, original_user._id, APPOINTMENT_RESERVATION_KEY)
    const updated_original_appointment = await get_appointment(original_appointment._id)

    expect(original_appointment.type_of_reservation).toBe(FREE_APPOINTMENT)
    expect(updated_original_appointment.type_of_reservation).toBe(ACCEPTED_APPOINTMENT)
  })

  it('appointment type should not change if user attempts to create consecutive appointments in too small intervals', async () => {
    const second_app_same_day = appointment_list[FIRST_DAY_SECOND_INDEX]
    await update_appointment(original_appointment._id, original_user._id, APPOINTMENT_RESERVATION_KEY)
    await update_appointment(second_app_same_day._id, original_user._id, APPOINTMENT_RESERVATION_KEY)

    const updated_original_appointment = await get_appointment(original_appointment._id)
    const updated_same_day_appointment = await get_appointment(second_app_same_day._id)

    expect(updated_original_appointment.type_of_reservation).toBe(ACCEPTED_APPOINTMENT)
    expect(updated_same_day_appointment.type_of_reservation).toBe(FREE_APPOINTMENT)
  })

  it('when user wants to create an appointment when having one, the appointment SHOULD change its type if enough time has passed after previous user appointment', async () => {
    const one_month_after_original_appointment = appointment_list[SECOND_DAY_LAST_INDEX]

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

  it('when appointment is removed, remove user from the appointment and set the appointments reservation as 3', async () => {
    await update_appointment(original_appointment._id, original_user._id, APPOINTMENT_RESERVATION_KEY)
    const updated_original_appointment = await get_appointment(original_appointment._id)
    await remove_appointment(updated_original_appointment._id)
    const removed_original_appointment = await get_appointment(original_appointment._id)
    expect(removed_original_appointment.type_of_reservation).toBe(3)
    expect(removed_original_appointment.user_id).toBe(null)


  })

  it('when a day is removed, remove users from the appointments and set the appointments reservations as 3', async () => {
    const appoint1 = await Appointment.findOne({ start_date: '2019-07-15T12:15:00.000Z' })
    const appoint2 = await Appointment.findOne({ start_date: '2019-07-15T15:45:00.000Z' })

    const user2 = new User({
      googleId: '1234567891',
      name: 'Test account1',
      email: 'test@test.account1',
      admin: true
    })
    await user2.save()

    await update_appointment(appoint1._id, original_user._id, APPOINTMENT_RESERVATION_KEY)
    await update_appointment(appoint2._id, user2._id, APPOINTMENT_RESERVATION_KEY)

    await remove_day_of_appointments(appoint1.start_date)//DATE 15.7.2019



    const removed_appoint1 = await Appointment.findOne({ start_date: '2019-07-15T12:15:00.000Z' })
    const removed_appoint2 = await Appointment.findOne({ start_date: '2019-07-15T15:45:00.000Z' })
    const removed_appoint3 = await Appointment.findOne({ start_date: '2019-07-15T16:20:00.000Z' })

    expect(removed_appoint1.type_of_reservation).toBe(3)
    expect(removed_appoint1.user_id).toBe(null)

    expect(removed_appoint2.type_of_reservation).toBe(3)
    expect(removed_appoint2.user_id).toBe(null)

    expect(removed_appoint3.type_of_reservation).toBe(3)
    expect(removed_appoint3.user_id).toBe(null)


  })

})
afterAll(async () => {
  await mongoose.disconnect()
})