const jsonWebToken = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require('express')
const bodyParser = require('body-parser')
const loginRouter = express.Router()
loginRouter.use(bodyParser.json())
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const body = req.body
  console.log('request body', body)

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
  res
    .status(200)
    .send({ token, email: foundUser.email, name: foundUser.name })

})

module.exports = loginRouter