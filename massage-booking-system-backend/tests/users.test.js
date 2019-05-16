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
    console.log('res body', response.body)
  })

})

afterAll(() => {
  mongoose.connection.close()
})