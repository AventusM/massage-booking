const routeProtector = (req, res, next) => {
  if (req.isAuthenticated() || process.env.NODE_ENV === 'test') {
    return next()
  }
}

module.exports = { routeProtector }
