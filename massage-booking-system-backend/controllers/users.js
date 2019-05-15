const User = require('../models/user')
const usersRouter = require('express').Router()

const formatUsers = (input) => {
    return {
        id: input.id,
        name: input.name,
        number: input.number,
        email: input.email,
        appoitments: input.appoitments 
    }
}
usersRouter.get('/', async (req, res) => {
    try {
      res.json(users.map(formatUsers))
    } catch (exception) {
        console.log(exception)
        res.status(400).json({ error: 'bad request' })
      }
  })

module.exports = usersRouter