const User = require('../models/user')

const initialHelperUser = {
  name: "Keijo Käyttäjä",
  number: "050-1231231",
  email: "keijo@kayttaja.fi",
  admin: false,
  password: "test"
}

const usersFromDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  usersFromDb, initialHelperUser
}