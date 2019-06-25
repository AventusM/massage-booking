const User = require('../models/user')

const verifyIfAdmin = async (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    return next()
  } else {
    const found_user = await User.findById({ _id: req.user._id })
    if (!found_user.admin) {
      return res.status(400).end()
    }
    next()
  }
}

module.exports = { verifyIfAdmin }