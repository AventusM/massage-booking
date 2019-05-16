const User = require('../models/user')

const usersFromDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  usersFromDb
}