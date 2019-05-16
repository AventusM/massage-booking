const jsonWebToken = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require('express')
const bodyParser = require('body-parser')
const loginRouter = express.Router()
loginRouter.use(bodyParser.json())
const User = require('../models/user')
const Masseusse = require('../models/masseusse')


loginRouter.post('/masseusse', async (req, res) => {

  const foundMasseusse = await Masseusse.findOne({ email: body.email })
  const pwMatch = foundMasseusse === null
    ? false
    : await bcrypt.compare(body.password, foundMasseusse.passwordHash)

  const invalidMasseusseOrPw = !(foundMasseusse && pwMatch)
  if (invalidMasseusseOrPw) {
    return res.status(401).json({
      error: 'invalid email or password'
    })
  }

  const MasseusseCheckForTokenObject = {
    email: foundMasseusse.email,
    name: foundMasseusse.name,
    id: foundMasseusse._id
  }

  const token = jsonWebToken.sign(foundMasseusse, process.env.SECRET)
  res
    .status(200)
    .send({ token, email: foundMasseusse.email, name: foundMasseusse.name })

})


loginRouter.post('/', async (req, res) => {

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
      error: 'invalid email or password'
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