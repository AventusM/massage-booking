const User = require('../models/user')

const initialHelperUsers = [
  {
    name: "Keijo Käyttäjä",
    number: "050-1231231",
    email: "keijo@kayttaja.fi",
    admin: false,
    passwordHash: "hdkjashdkjsadh"
  }
]

const usersFromDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  usersFromDb, initialHelperUsers
}