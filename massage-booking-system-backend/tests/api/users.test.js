const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../../app')
const api = supertest(app)
const User = require('../../models/user')

describe('with existing USERS', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const userObjects = helper.initialHelperUsers.map(
      userData => new User(userData)
    )
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
  })

  it('succeeds fetching individual user', async () => {
    const response = await api.get('/api/users')
    const idFromALL = response.body[0]._id

    const individualResponse = await api.get(`/api/users/${idFromALL}`)
    const fetchedId = individualResponse.body[0]._id

    expect(idFromALL).toBe(fetchedId)
  })

  it('displays correct user amount', async () => {
    const response = await api.get('/api/users')
    expect(response.body.length).toBe(helper.initialHelperUsers.length)
  })

  it('displays correct data when comparing FETCHED DATA to INITIAL DATA', async () => {
    const response = await api.get('/api/users')
    const body = response.body

    const names = body.map(item => item.name)
    const emails = body.map(item => item.email)
    const numbers = body.map(item => item.number)

    expect(names).toContain(helper.initialHelperUsers[0].name)
    expect(names).toContain(helper.initialHelperUsers[1].name)

    expect(emails).toContain(helper.initialHelperUsers[0].email)
    expect(emails).toContain(helper.initialHelperUsers[1].email)

    expect(numbers).toContain(helper.initialHelperUsers[0].number)
    expect(numbers).toContain(helper.initialHelperUsers[1].number)
  })

  it('fails to fetch a user with INVALID id', async () => {
    let badIdvalue = '5a3d5da59070081a82a3445'
    const response = await api.get(`/api/users/${badIdvalue}`).expect(400)

    const message = response.body.error
    expect(message).toEqual('malformatted id')
  })
})

describe('addition of a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  // TODO -- create ADMIN USER?
  // TODO -- create ADMIN USER?
  // TODO -- create ADMIN USER?
  // TODO -- create ADMIN USER?
  // TODO -- create ADMIN USER?
  // TODO -- create ADMIN USER?

  it('succeeds with valid data', async () => {
    const user = {
      name: 'Ville Veiko',
      number: '052-1231231',
      email: 'ville@kayttaja.fi',
      admin: false,
      password: 'hdkjashdkjsadh',
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(200)
    const usersInTheEnd = await helper.usersFromDb()
  })

  it('fails with invalid data', async () => {
    const newUser = {
      email: 'email@email.com',
      admin: false,
      password: 'moikka',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  it('if multiple valid users are added, all are returned', async () => {
    let newUser = {
      name: 'Ville Veiko',
      number: '052-1231231',
      email: 'ville@kayttaja.fi',
      admin: false,
      password: 'hdkjashdkjsadh',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)

    newUser = {
      name: 'Ville Matti',
      number: '052-1231231',
      email: 'ville@kayttaja.fi',
      admin: false,
      password: 'hdkjashdkjsadh',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)

    const response = await api.get('/api/users')
    expect(response.body.length).toBe(2)
  })
})

describe('editing user data', () => {
  const newUser = {
    name: 'HAUSFRAU msaa',
    number: '696969-696969',
    email: 'ebin@ebön.ebån',
    admin: false,
    password: 'draavilohi',
  }

  beforeEach(async () => {
    await User.deleteMany({})
    await api.post('/api/users').send(newUser)
  })

  it('succeeds when valid input is given to change name', async () => {
    const currentUsers = await helper.usersFromDb()
    const firstUser = currentUsers[0]

    // Verify that same user. Cannot use straight up toEqual
    // because of POST endpoint creating passwordHash which
    // cannot be compared straight up with password parameter from original object
    expect(firstUser.name).toEqual(newUser.name)
    expect(firstUser.email).toEqual(newUser.email)

    // Updating data of fetched user
    // const editableUser = { ...firstUser, name: "H2k msaa" }
    const editableUser = Object.assign(firstUser, { name: 'H2k msaa' })
    const userId = editableUser._id

    // PUT endpoint to update user
    const response = await api.put(`/api/users/${userId}`).send(editableUser)

    expect(response.body.name).toBe(editableUser.name)
  })

  it('doesnt succeed when trying to make SELF admin', async () => {
    const currentUsers = await helper.usersFromDb()
    const firstUser = currentUsers[0]

    expect(firstUser.admin).toBe(false)
    // const wannabeAdmin = { ...firstUser, admin: true }
    const wannabeAdmin = Object.assign(firstUser, { admin: true })
    const userId = wannabeAdmin._id

    const response = await api.put(`/api/users/${userId}`).send(wannabeAdmin)

    expect(response.body.admin).not.toBe(true)
  })

  it('succeeds when create ADMIN creates ANOTHER create ADMIN', async () => {
    console.log(
      'TODO -- Create PUT endpoint so create ADMIN USER can create other admins'
    )
    // expect(true).toBe(false)
  })
})

describe('removing user', () => {
  const newUser = {
    name: 'Kakkapasi',
    number: '696969-696969',
    email: 'ebin@ebön.ebån',
    admin: false,
    password: 'sokeatMalphitenUltitLantrek2012',
  }

  beforeEach(async () => {
    await User.deleteMany({})
    await api.post('/api/users').send(newUser)
  })

  it('succeeds with valid user _id', async () => {
    const currentUsersBeforeDelete = await helper.usersFromDb()
    const firstUser = currentUsersBeforeDelete[0]
    expect(currentUsersBeforeDelete.length).toBe(1)

    await api.delete(`/api/users/${firstUser._id}`)

    const currentUsersAfterDelete = await helper.usersFromDb()
    expect(currentUsersAfterDelete.length).toBe(0)
  })

  it('fails with invalid user _id', async () => {
    const currentUsersBeforeDelete = await helper.usersFromDb()
    let badIdvalue = '5a3d5da59070081a82a3445'

    await api.delete(`/api/users/${badIdvalue}`)

    const currentUsersAfterDelete = await helper.usersFromDb()
    expect(currentUsersBeforeDelete.length).toBe(currentUsersAfterDelete.length)
  })
})

afterAll(() => {
  mongoose.disconnect()
})
