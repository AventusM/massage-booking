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
      const user = res.map(formatUsers)
      res.json(users)
    } catch (exception) {
      next(exception)
    }
  })