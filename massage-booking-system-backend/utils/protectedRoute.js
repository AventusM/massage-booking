const routeProtector = (req, res, next) => {
  if (req.isAuthenticated() || process.env.NODE_ENV === 'test') {
    return next()
  } else {
    return res.status(401).end()
  }
}

module.exports = { routeProtector }
