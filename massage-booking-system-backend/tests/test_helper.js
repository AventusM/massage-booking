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


const initialHelperUsersForPost = [
  {
    name: "Keijo Käyttäjä",
    number: "050-1231231",
    email: "keijo@kayttaja.fi",
    admin: false,
    password: "hdkjashdkjsadh"
  },
  {
    name: "Ville Veiko",
    number: "052-1231231",
    email: "ville@kayttaja.fi",
    admin: false,
    password: "hdkjashdkjsadh"
  },
  {
    name: "Maija Mehiläinen",
    number: "054-1231231",
    email: "maija@kayttaja.fi",
    admin: false,
    password: "hdkjashdkjsadh"
  }
]

const usersFromDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  usersFromDb, initialHelperUsers, initialHelperUsersForPost
}