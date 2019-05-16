const User = require('../models/user')

const initialHelperUsers = [
  {
    name: "Keijo Käyttäjä",
    number: "050-1231231",
    email: "keijo@kayttaja.fi",
    admin: false,
    passwordHash: "hdkjashdkjsadh"
  },
  {
    name: "Kalle Keittäjä",
    number: "050-1231231",
    email: "kalle@keittäjä.fi",
    admin: false,
    passwordHash: "jsadjhsa"
  }
]

const fakeId = async () => {
  const fakeUser = new User(initialHelperUsers[1])
  await fakeUser.save()
  await fakeUser.remove()
  return fakeUser._id.toString()
}

const usersFromDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  usersFromDb, initialHelperUsers, fakeId
}