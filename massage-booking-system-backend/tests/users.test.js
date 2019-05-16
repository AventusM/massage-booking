const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('with an existing USER', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    const userObjects = helper.initialHelperUsers.map(userData => new User(userData))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
  })

  it('returns initially a SINGLE USER', async () => {
    const response = await api.get('/api/users')
  })

})


describe('addition of a new user', () => {

  beforeEach(async () => {
    await User.deleteMany({})


  })

  test('succeeds with valid data', async () => {
    const user = {
      name: "Ville Veiko",
      number: "052-1231231",
      email: "ville@kayttaja.fi",
      admin: false,
      password: "hdkjashdkjsadh"
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(200)
    const usersInTheEnd = await helper.usersFromDb()

  })

  test('fails with invalid data', async () => {
    const newUser = {
      email: "email@email.com",
      admin: false,
      password: "moikka"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

  })

  test('if multiple valid users are added, all are returned', async () => {
    let newUser = {
      name: "Ville Veiko",
      number: "052-1231231",
      email: "ville@kayttaja.fi",
      admin: false,
      password: "hdkjashdkjsadh"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)

    newUser = {
      name: "Ville Matti",
      number: "052-1231231",
      email: "ville@kayttaja.fi",
      admin: false,
      password: "hdkjashdkjsadh"
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(200)

    const response = await api.get('/api/users')

    expect(response.body.length).toBe(2)
  })

})



afterAll(() => {
  mongoose.connection.close()
})

