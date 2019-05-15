const jsonWebToken = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const body = req.body
  console.log('request body', req.body)

  /*
  Data from email and password fields
  */


  const foundUser = await User.findOne({ email: body.email })
  const pwMatch = foundUser === null
    ? false
    : await bcrypt.compare(body.password, foundUser.passwordHash)

  const invalidUserOrPw = !(foundUser && pwMatch)
  if (invalidUserOrPw) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userCheckForTokenObject = {
    email: foundUser.email,
    name: foundUser.name,
    id: foundUser._id
  }

  const token = jsonWebToken.sign(userCheckForTokenObject, process.env.SECRET)
  response
    .status(200)
    .send({ token, email: foundUser.email, name: foundUser.name })

})

module.exports = loginRouter